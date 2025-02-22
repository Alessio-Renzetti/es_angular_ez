import { Component, OnInit } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { JsonServiceService, Libro } from '../../service/json-service.service';
import { UpdateBookComponent } from '../update-book/update-book.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [MatTableModule, MatInputModule, MatFormFieldModule, MatIcon],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
})
export class HomePageComponent implements OnInit {
  libro = new MatTableDataSource<Libro>([]);
  displayedColumns: string[] = ['Titolo', 'Autore', 'Genere', 'Anno','Actions'];
  input: any;
  constructor(private jsonServ: JsonServiceService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.jsonServ.getLibri().subscribe((data: Libro[]) => {
      this.libro.data = data;
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.libro.filter = filterValue.trim().toLowerCase();
  }
  openEditModal(spec: Libro): void {
    const dialogRef = this.dialog.open(UpdateBookComponent, {
      width: '350px',
      height: '450px',
      data: spec, // Passi l'elemento libro alla modale
    });

    dialogRef.afterClosed().subscribe((updatedBook: Libro) => {
      if (updatedBook) {
        this.aggiornaLibro(updatedBook);
      }
    });
  }
  
  aggiornaLibro(libroAgg: Libro): void {
    this.jsonServ.putLibro(libroAgg).subscribe((res) => {
      const index = this.libro.data.findIndex(
        (spec) => spec.id === libroAgg.id
      );
      if (index !== -1) {
        // Sostituisci il libro aggiornato nell'array dei libri
        this.libro.data[index] = libroAgg;
        // Rende nuovamente visibile la tabella aggiornata
        this.libro = new MatTableDataSource<Libro>(this.libro.data);
      }
    });
  }
  deleteBook(bookId: string): void {
    // Chiamata al servizio per eliminare il libro dal backend
    this.jsonServ.deleteLibro(bookId).subscribe(() => {
      // Rimuovi il libro dalla lista dopo che l'eliminazione è andata a buon fine
      const index = this.libro.data.findIndex(book => book.id === bookId);
      if (index !== -1) {
        this.libro.data.splice(index, 1); // Rimuovi l'elemento dalla lista
        this.libro._updateChangeSubscription(); // Rinfresca la tabella
      }
    });
  }
}
