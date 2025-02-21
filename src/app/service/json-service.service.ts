import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JsonServiceService {

  constructor(private http: HttpClient) { }

  getLibri(): Observable<Libro[]>{
    return this.http.get<Libro[]>("http://localhost:3000/libri")
  }
  postLibro(body :{}){
    return this.http.post("http://localhost:3000/libri",body)
  }
}
export interface Libro{
  titolo: string,
  autore: string,
  genere: string,
  data_pub: string,
  id: string
}