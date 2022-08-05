import { Component, OnInit } from '@angular/core';
import { PaginaService } from '../../services/pagina.service';
import { Usuarios } from './Usuarios';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: [
    `
    h5{
      margin: 5px !important;
    }
    `
  ]
})
export class PerfilComponent implements OnInit{
  
  public rol: string = String(localStorage.getItem('rol'));
  public id:string = String(localStorage.getItem('id'));
  public name: string = '';
  public pass: boolean = false;
  public password:string = '';
  datos: Usuarios[] = [];
  constructor(private paginaService: PaginaService) { } 
  ngOnInit(): void {
    this.perfil();
  }
  perfil(){
  this.paginaService.buscarUsuario(this.id)
  .subscribe(usuario =>{
    console.log(usuario)
    this.datos = usuario;
   // this.name = this.datos[0].name;
    console.log(this.datos[0].name)
  })
  }
  cambiarContrasena(){
    const id = this.id;
    const password = this.password;
    this.paginaService.cambiarContraseña(id,password)
    .subscribe(ok =>{
      console.log(ok);
      if(ok.ok === true){
        Swal.fire('Listo','Contraseña cambiada correctamente','success')
      }
      else{
        Swal.fire('Error','Ocurrio un error','error')
      }
    })
  }
  habilitarpass(){
    this.pass = !this.pass
  }
}
