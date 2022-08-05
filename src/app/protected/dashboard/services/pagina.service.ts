import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable,of } from 'rxjs';
import { Documentos } from '../pages/busqueda/Documentos';
import { Usuarios } from '../pages/perfil/Usuarios';
import {catchError,map,tap} from 'rxjs/operators';
import { authResponse } from '../../../auth/interfaces/interfaces';
import { Proyectos } from '../pages/administrar-usuario/Proyectos';
import { Entregas } from '../pages/administrar-usuario/Entrega';
import { Retro } from '../pages/administrar-usuario/Retro';
import { Citas } from '../pages/citas/Citas';
import { Fechas } from '../pages/calendario/Calendario';
import { Propuestas } from '../pages/propuestas/Propuestas';
import { Categorias } from '../pages/busqueda/porcategoria/Categoria';

@Injectable({
  providedIn: 'root'
})
export class PaginaService {
  private buscadorUrl: string = 'http://localhost:4000/api/auth/bdocumento';
  private categoriasUrl: string = 'http://localhost:4000/api/auth/bcategoria';
  private usuarioUrl: string = 'http://localhost:4000/api/auth/busuario'
  private todousuarioUrl: string = 'http://localhost:4000/api/auth/ballusuario'
  private actualizarusuarioUrl: string = 'http://localhost:4000/api/auth/ausuario'
  private eliminarusuarioUrl: string = 'http://localhost:4000/api/auth/eusuario'
  private crearproUrl: string = 'http://localhost:4000/api/auth/nproyecto'
  private todosproyectoUrl: string = 'http://localhost:4000/api/auth/ballproyectos'
  private actualizarproyectoUrl:string = 'http://localhost:4000/api/auth/aproyecto'
  private todosproyectopopUrl: string = 'http://localhost:4000/api/auth/ballproyectospop'
  private buscarentregaUrl:string = 'http://localhost:4000/api/auth/bentrega'
  private buscarentregaxpUrl:string = 'http://localhost:4000/api/auth/bentregaxp'
  private buscarretroUrl:string = 'http://localhost:4000/api/auth/bretro'
  private buscarretroxpUrl:string = 'http://localhost:4000/api/auth/bretroxp'
  private buscarproyectoxuUrl:string = 'http://localhost:4000/api/auth/bproyxu'
  private agregarcitaUrl:string = 'http://localhost:4000/api/auth/ncitas'
  private traercitaUrl: string = 'http://localhost:4000/api/auth/bcita'
  private agregaFecha: string = 'http://localhost:4000/api/auth/ncalendario'
  private traerFecha: string = 'http://localhost:4000/api/auth/bfecha'
  private eliminarFechaUrl:string = 'http://localhost:4000/api/auth/efecha'
  private actualizarFechaUrl:string = 'http://localhost:4000/api/auth/afecha'
  private agregarPropuestaUrl: string = 'http://localhost:4000/api/auth/npropuesta'
  private traerPropuestaUrl: string = 'http://localhost:4000/api/auth/bpropuesta'
  private actualizarPropuestaUrl:string = 'http://localhost:4000/api/auth/apropuesta'
  private eliminarPropuestaUrl: string = 'http://localhost:4000/api/auth/epropuesta'
  private actualizarCitaUrl: string = 'http://localhost:4000/api/auth/acita'
  private eliminarCitaUrl: string = 'http://localhost:4000/api/auth/ecita'
  private agregarDocumentoUrl: string = 'http://localhost:4000/api/auth/ndocumento'
  private actualizarDocumentoUrl:string = 'http://localhost:4000/api/auth/adocumento'
  private eliminarDocumentoUrl: string = 'http://localhost:4000/api/auth/edocumentos'
  private traertodoDocumentosUrl:string = 'http://localhost:4000/api/auth/balldocumento'
  private agregarEntregaUrl:string = 'http://localhost:4000/api/auth/nentrega'
  private agregarRetroUrl:string = 'http://localhost:4000/api/auth/nretroalimentacion'
  private actualizarRetroUrl:string = 'http://localhost:4000/api/auth/aretro'
  private actualizarEntregaUrl:string = 'http://localhost:4000/api/auth/aentrega'
  private agregarCategoriaUrl:string = 'http://localhost:4000/api/auth/ncategoria'
  private traerCategoriasUrl:string = 'http://localhost:4000/api/auth/ballcategorias'
  private eliminarCategoriaUrl:string = 'http://localhost:4000/api/auth/ecategoria'
  constructor(private http: HttpClient) { }

  buscarDocumento(termino: string) : Observable<Documentos[]>{
    const url = `${this.buscadorUrl}/${termino}`;
    return this.http.get<Documentos[]>(url);
  }
  buscarCategoria(id: string): Observable<Documentos[]>{
    const url = `${this.categoriasUrl}/${id}`;
    return this.http.get<Documentos[]>(url);
  }
  buscarUsuario(id: string): Observable<Usuarios[]>{
    const url = `${this.usuarioUrl}/${id}`;
    return this.http.get<Usuarios[]>(url);
  }
  buscartodoUsuario(): Observable<Usuarios[]>{
    const url = `${this.todousuarioUrl}`;
    return this.http.get<Usuarios[]>(url);
  }
  buscartodoProyecto(): Observable<Proyectos[]>{
    const url = `${this.todosproyectoUrl}`;
    return this.http.get<Proyectos[]>(url);
  }
  buscartodoProyectopop():Observable<Proyectos[]>{
    const url = `${this.todosproyectopopUrl}`;
    return this.http.get<Proyectos[]>(url);
  }
  buscartodoDocumentos(): Observable<Documentos[]>{
    const url = `${this.traertodoDocumentosUrl}`;
    return this.http.get<Documentos[]>(url);
  }
  buscarentregaA(id: string): Observable<Entregas[]>{
    const url = `${this.buscarentregaUrl}/${id}`
    return this.http.get<Entregas[]>(url)
  }
  buscarretroA(id:string): Observable<Retro[]>{
    const url = `${this.buscarretroUrl}/${id}`
    return this.http.get<Retro[]>(url)
  }
  buscarproyectoxu(id:string): Observable<Proyectos[]>{
    const url = `${this.buscarproyectoxuUrl}/${id}`
    return this.http.get<Proyectos[]>(url)
  }
  buscarentregaxp(id:string): Observable<Entregas[]>{
    const url = `${this.buscarentregaxpUrl}/${id}`
    return this.http.get<Entregas[]>(url)
  }
  buscarretroxp(id:string): Observable<Retro[]>{
    const url = `${this.buscarretroxpUrl}/${id}`
    return this.http.get<Retro[]>(url)
  }
  traerCitas(): Observable<Citas[]>{
    const url= `${this.traercitaUrl}`
    return this.http.get<Citas[]>(url)
  }
  traerFechas(): Observable<Fechas[]>{
    const url = `${this.traerFecha}`
    return this.http.get<Fechas[]>(url)
  }
  traerCategorias(): Observable<Categorias[]>{
    const url = `${this.traerCategoriasUrl}`
    return this.http.get<Categorias[]>(url)
  }
  crearDocumento(titulo:string,autor:string,categoria:string,linkB:string,linkR:string){
    const url = `${this.agregarDocumentoUrl}`
    const body = {titulo,autor,categoria,linkB,linkR}
    return this.http.post<authResponse>(url,body)
    .pipe(
      tap(resp =>{
        if(resp.ok){
        }
      }),
      map(resp => resp),
      catchError(err => of(err.error.msg))
    );
  }
  crearCategoria(categoria:string){
    const url = `${this.agregarCategoriaUrl}`
    const body = {categoria}
    return this.http.post<authResponse>(url,body)
    .pipe(
      tap(resp =>{
        if(resp.ok){
        }
      }),
      map(resp => resp),
      catchError(err => of(err.error.msg))
    );
  }
  eliminarCategoria(id:string){
    const url = `${this.eliminarCategoriaUrl}/${id}`
    return this.http.delete<authResponse>(url)
    .pipe(
      tap(resp =>{
        if(resp.ok){
        }
      }),
      map(resp => resp),
      catchError(err => of(err.error.msg))
    );

  }
  crearEntrega(titulo:string,autor:string,fecha:string,documento:any,tipo:string,proyecto:string){
    const url = `${this.agregarEntregaUrl}`
    const body = {titulo,autor,tipo,fecha,proyecto,documento}
    return this.http.post<authResponse>(url,body)
    .pipe(
      tap(resp =>{
        if(resp.ok){
        }
      }),
      map(resp => resp),
      catchError(err => of(err.error.msg))
    );
  }
  actualizarEntrega(id:string,titulo:string,autor:string,fecha:string,documento:any,tipo:string,proyecto:string){
    const url = `${this.actualizarEntregaUrl}/${id}`
    const body = {titulo,autor,tipo,fecha,proyecto,documento}
    return this.http.put<authResponse>(url,body)
    .pipe(
      tap(resp =>{
        if(resp.ok){
        }
      }),
      map(resp => resp),
      catchError(err => of(err.error.msg))
    );
  }
  crearRetro(titulo:string,autor:string,fecha:string,documento:any,tipo:string,evalu:boolean,proyecto:string){
    const url = `${this.agregarRetroUrl}`
    const body = {titulo,autor,fecha,documento,tipo,evalu,proyecto}
    return this.http.post<authResponse>(url,body)
    .pipe(
      tap(resp =>{
        if(resp.ok){
        }
      }),
      map(resp => resp),
      catchError(err => of(err.error.msg))
    );
  }
  actualizarRetro(id:string,titulo:string,autor:string,fecha:string,documento:any,tipo:string,evalu:boolean,proyecto:string){
    const url = `${this.actualizarRetroUrl}/${id}`
    const body = {id,titulo,autor,fecha,documento,tipo,evalu,proyecto}
    return this.http.put<authResponse>(url,body)
    .pipe(
      tap(resp =>{
        if(resp.ok){
        }
      }),
      map(resp => resp),
      catchError(err => of(err.error.msg))
    );
  }
  actualizarDocumento(id:string,titulo:string,autor:string,categoria:string,linkB:string,linkR:string){
    const url = `${this.actualizarDocumentoUrl}/${id}`
    const body = {titulo,autor,categoria,linkB,linkR}
    return this.http.put<authResponse>(url,body)
    .pipe(
      tap(resp =>{
        if(resp.ok){
        }
      }),
      map(resp => resp),
      catchError(err => of(err.error.msg))
    );
  }
  eliminarDocumento(id:string){
    const url = `${this.eliminarDocumentoUrl}/${id}`
    return this.http.delete<authResponse>(url)
    .pipe(
      tap(resp =>{
        if(resp.ok){
        }
      }),
      map(resp => resp),
      catchError(err => of(err.error.msg))
    );
  }
  eliminarFecha(id:string){
    const url = `${this.eliminarFechaUrl}/${id}`
    return this.http.delete<authResponse>(url)
    .pipe(
      tap(resp =>{
        if(resp.ok){
        }
      }),
      map(resp => resp),
      catchError(err => of(err.error.msg))
    );
  }
  eliminarPropuesta(id:string){
    const url = `${this.eliminarPropuestaUrl}/${id}`
    return this.http.delete<authResponse>(url)
    .pipe(
      tap(resp =>{
        if(resp.ok){
        }
      }),
      map(resp => resp),
      catchError(err => of(err.error.msg))
    );
  }
  crearPropuestas(titulo:string,descripcion:string,enable:boolean,autor:string){
    const url = `${this.agregarPropuestaUrl}`
    const body = {titulo,descripcion,enable,autor}
    return this.http.post<authResponse>(url,body)
    .pipe(
      tap(resp =>{
        if(resp.ok){
        }
      }),
      map(resp => resp),
      catchError(err => of(err.error.msg))
    );
  }
  editarPropuesta(id:string,titulo:string,descripcion:string){
    const url = `${this.actualizarPropuestaUrl}/${id}`
    const body = {titulo,descripcion}
    return this.http.put<authResponse>(url,body)
    .pipe(
      tap(resp =>{
        if(resp.ok){
        }
      }),
      map(resp => resp),
      catchError(err => of(err.error.msg))
    );
  }
  deshabPropuesta(id:string,enable:boolean){
    const url = `${this.actualizarPropuestaUrl}/${id}`
    const body ={enable}
    return this.http.put<authResponse>(url,body)
    .pipe(
      tap(resp =>{
        if(resp.ok){
        }
      }),
      map(resp => resp),
      catchError(err => of(err.error.msg))
    );
  }
  traerPropuestas(){
    const url = `${this.traerPropuestaUrl}`
    return this.http.get<Propuestas[]>(url)
  }
  actualizarFechas(id:string,titulo:string,fecha:string,semestre:string){
    const url = `${this.actualizarFechaUrl}/${id}`
    const body = {titulo,fecha,semestre}
    return this.http.put<authResponse>(url,body)
    .pipe(
      tap(resp =>{
        if(resp.ok){
        }
      }),
      map(resp => resp),
      catchError(err => of(err.error.msg))
    );
  }
  crearFechas(titulo:string, fecha:string, semestre:string){
    const url= `${this.agregaFecha}`
    const body = {titulo, fecha, semestre}
    return this.http.post<authResponse>(url,body)
    .pipe(
      tap(resp =>{
        if(resp.ok){
        }
      }),
      map(resp => resp),
      catchError(err => of(err.error.msg))
    );
  }
  crearCitas(titulo:string,link:string){
    const url = `${this.agregarcitaUrl}`
    const body ={titulo,link}
    return this.http.post<authResponse>(url,body)
    .pipe(
      tap(resp =>{
        if(resp.ok){
        }
      }),
      map(resp => resp),
      catchError(err => of(err.error.msg))
    );
  
  }
  actualizarCita(id:string,titulo:string,link:string){
    const url = `${this.actualizarCitaUrl}/${id}`
    const body ={titulo,link}
    return this.http.put<authResponse>(url,body)
    .pipe(
      tap(resp =>{
        if(resp.ok){
        }
      }),
      map(resp => resp),
      catchError(err => of(err.error.msg))
    );
  }
  eliminarCita(id:string){
    const url = `${this.eliminarCitaUrl}/${id}`
    return this.http.delete<authResponse>(url)
    .pipe(
      tap(resp =>{
        if(resp.ok){
        }
      }),
      map(resp => resp),
      catchError(err => of(err.error.msg))
    );
  }
  actualizar(id:string ,user: string, password: string, email: string, name: string, rol: string, semestre: number, enable: boolean){
    const url = `${this.actualizarusuarioUrl}/${id}`;
    const body = {user, password,email,name,rol,semestre,enable}

    return this.http.put<authResponse>(url, body)
    .pipe(
      tap(resp =>{
        if(resp.ok){
          
        }
      }),
      map(resp => resp),
      catchError(err => of(err.error.msg))
    );
  }
  actualizarpro(id:string,titulo:string,alumno:string,alumno2:string,profeguia:string,profeinformante:string,profeinformante2:string,profeinformante3:string,coordinador:string,profesorPt1:string, aceptado: boolean,enable:boolean){
    const url = `${this.actualizarproyectoUrl}/${id}`
    const body = {titulo,alumno,alumno2,profeguia,profeinformante,profeinformante2,profeinformante3,coordinador,profesorPt1,aceptado,enable}
    return this.http.put<authResponse>(url,body)
    .pipe(
      tap(resp=>{
        if(resp.ok){

        }
      }),
      map(resp => resp),
      catchError(err => of(err.error.msg))
    );
  }
  eliminar(id: string, enable: boolean){
    const url = `${this.eliminarusuarioUrl}/${id}`;
    const body = {enable}
    return this.http.put<authResponse>(url, body)
    .pipe(
      tap(resp =>{
        if(resp.ok){
          
        }
      }),
      map(resp => resp),
      catchError(err => of(err.error.msg))
    );
  }
  cambiarContraseña(id: string, password: string){
    const url = `${this.actualizarusuarioUrl}/${id}`;
    const body = {password}
    return this.http.put<authResponse>(url, body)
    .pipe(
      tap(resp =>{
        if(resp.ok){
        }
      }),
      map(resp => resp),
      catchError(err => of(err.error.msg))
    );
  }
  registropro(titulo: string, alumno: string, alumno2: string, profeguia: string, profeinformante: string, profeinformante2: string, profeinformante3:string, coordinador:string, profesorPt1:string, aceptado: boolean,enable:boolean){
    const url = `${this.crearproUrl}`;
    const body = {titulo, alumno,alumno2,profeguia,profeinformante,profeinformante2,profeinformante3,coordinador,profesorPt1,aceptado,enable}

    return this.http.post<authResponse>(url, body)
    .pipe(
      tap(resp =>{
        if(resp.ok){
        }
      }),
      map(resp => resp),
      catchError(err => of(err.error.msg))
    );
  }
  eliminarpro(ids:string,enable:boolean){
    const url = `${this.actualizarproyectoUrl}/${ids}`;
    const body = {enable}
    return this.http.put<authResponse>(url, body)
    .pipe(
      tap(resp =>{
        if(resp.ok){
        }
      }),
      map(resp => resp),
      catchError(err => of(err.error.msg))
    );
  }
  aceptarpro(ids:string,aceptado:boolean){
    const url = `${this.actualizarproyectoUrl}/${ids}`;
    const body = {aceptado}
    return this.http.put<authResponse>(url,body)
    .pipe(
      tap(resp =>{
        if(resp.ok){
        }
      }),
      map(resp => resp),
      catchError(err => of(err.error.msg))
    );
  }


}
