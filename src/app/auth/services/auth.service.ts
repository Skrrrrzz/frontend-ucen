import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { authResponse, Usuario } from '../interfaces/interfaces';
import {catchError,map,tap} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl:  string = environment.baseUrl;
  private _usuario!:  Usuario;
  private _roles: string[] = ['Administrador', 'Docente', 'Estudiante'];
  private _semestre: number[] = [1,2];

  get usuario(){
    return { ...this._usuario };
  }

  constructor(private http: HttpClient) { }

    registro(user: string, password: string, email: string, name: string, rol: string, semestre: number){
      const url = `${this.baseUrl}/auth/new`;
      const body = {user, password,email,name,rol,semestre}

      return this.http.post<authResponse>(url, body)
      .pipe(
        tap(resp =>{
          if(resp.ok){
            localStorage.setItem('token', resp.token!);
          }
        }),
        map(resp => resp.ok),
        catchError(err => of(err.error.msg))
      );
    }

    get roles(): string[]{
      return [...this._roles];
    }
    get semestre(): number[]{
      return [...this._semestre];
    }


    login (user: string , password: string){

      const url = `${this.baseUrl}/auth`;
      const body = {user, password}

      return this.http.post<authResponse>(url, body)
      .pipe(
        tap(resp =>{
          if(resp.ok){
            localStorage.setItem('token', resp.token!);
          }
        }),
        map(resp => resp.ok),
        catchError(err => of(err.error.msg))
      );
    }

   validarToken():Observable<boolean>{
      const url = `${ this.baseUrl}/auth/renew`;
      const headers = new HttpHeaders()
          .set('x-token', localStorage.getItem('token')! || '');


   return this.http.get<authResponse>(url, {headers})
      .pipe(
        map( resp => {
          
          localStorage.setItem('token', resp.token!);
            this._usuario ={
              uid: resp.uid!,
              user: resp.user!,
              email: resp.email!
            }
          return resp.ok;
        }),
        catchError(err => of(false))
      );
    }

    logout(){
      localStorage.clear();
    }


}
