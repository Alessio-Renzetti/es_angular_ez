import { Component, OnInit } from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { JsonServiceService, Libro } from '../../service/json-service.service';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent implements OnInit {
libro = new MatTableDataSource<Libro>([]);
displayedColumns: string[] = ["Titolo", "Autore", "Genere", "Anno"]
input: any;
constructor(private jsonServ: JsonServiceService){

}
  ngOnInit(): void {
    this.jsonServ.getLibri().subscribe((data: Libro[]) =>{
      this.libro.data = data
      console.log(data)
    })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.libro.filter = filterValue.trim().toLowerCase();
  }
}
