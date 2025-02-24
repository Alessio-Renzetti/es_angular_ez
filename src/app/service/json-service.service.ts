import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class JsonServiceService {
  libroApI = 'http://localhost:3000/libri';
  generiApI = 'http://localhost:3000/generi';

  constructor(private http: HttpClient) {}

  getGeneri(): Observable<string[]> {
    return this.http.get<string[]>(`${this.generiApI}`);
  }
  getLibri(): Observable<Libro[]> {
    return this.http.get<Libro[]>(`${this.libroApI}`);
  }

  postLibro(body: Libro): Observable<Libro> {
    return this.http.post<Libro>(`${this.libroApI}`, body);
  }
  putLibro(body: Libro): Observable<Libro> {
    return this.http.put<Libro>(`${this.libroApI}/${body.id}`, body);
  }
  deleteLibro(idLibro: string): Observable<Libro> {
    return this.http.delete<Libro>(`${this.libroApI}/${idLibro}`);
  }
}

export interface Libro {
  titolo: string;
  autore: string;
  genere: string;
  data_pub: string;
  id: string;
}
