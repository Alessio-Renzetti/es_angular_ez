import { Component } from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { JsonServiceService } from '../../service/json-service.service';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    MatTableDataSource, 
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,

  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {
constructor(private jsonServ: JsonServiceService){

}

}
