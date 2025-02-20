import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JsonServiceService {

  constructor(private http: HttpClient) { }

  getLibri(): libri<Observable>{
    return this.http.get<libri>("http://localhost:3000/libri")
  }
}
export interface libri{
  titolo: string,
  autore: string,
  genere: string,
  data_uscita: string,
  id: string
}