import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Documentos } from '../pages/busqueda/Documentos';

@Injectable({
  providedIn: 'root'
})
export class PaginaService {
  private buscadorUrl: string = 'http://localhost:4000/api/auth/bdocumento';
  private categoriasUrl: string = 'http://localhost:4000/api/auth/bcategoria'
  constructor(private http: HttpClient) { }

  buscarDocumento(termino: string) : Observable<Documentos[]>{
    const url = `${this.buscadorUrl}/${termino}`;
    return this.http.get<Documentos[]>(url);
  }
  buscarCategoria(categoria: string): Observable<Documentos[]>{
    const url = `${this.categoriasUrl}/${categoria}`;
    return this.http.get<Documentos[]>(url);
  }

}
