import { Component, OnInit } from '@angular/core';
import { PaginaService } from '../../services/pagina.service';
import { Citas } from './Citas';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { TemplateDefinitionBuilder } from '@angular/compiler/src/render3/view/template';

@Component({
  selector: 'app-citas',
  templateUrl: './citas.component.html',
  styles: [
  ]
})
export class CitasComponent implements OnInit {
public idu = String(localStorage.getItem('rol'))
links = '';
titulos = '';
idc = '';
public opcion = 1;
citas : any[] = [];

miFormulario: FormGroup = this.fb.group({
  titulo:['',[Validators.required]],
  link:['',[Validators.required]]
})
miFormulario2: FormGroup = this.fb.group({
  titulo:['',[Validators.required]],
  link:['',[Validators.required]]
})
  constructor(private fb: FormBuilder,
    private paginaService: PaginaService) { }

  ngOnInit(): void {
    this.traerCitas()
  }
  traerCitas(){
    this.paginaService.traerCitas()
    .subscribe(datos =>{
      for(var i = 0; i < datos.length; i = i+1)
        this.citas.push(datos[i])
        console.log(this.citas)
    })
  }
  cargarCita(id:string){
    for(var i = 0; i<this.citas.length; i=i+1){
      if(this.citas[i]._id === id){
        this.titulos = this.citas[i].titulo;
        this.links = this.citas[i].link;
        this.idc = this.citas[i]._id
      }
    }
  }
  editar(id:string){
    this.cambiarOpcion(3)
    this.cargarCita(id)
  }
  volver(){
    this.cambiarOpcion(1)
    this.titulos = ''
        this.links =''
        this.idc = ''
    this.citas = []
    this.traerCitas();
  }
  registro(){
    const {titulo,link} = this.miFormulario.value;
    this.paginaService.crearCitas(titulo,link)
    .subscribe( ok => {
      console.log(ok);
      if(ok.ok === true){
        Swal.fire('Listo','Cita creada correctamente','success')
        this.miFormulario.setValue({titulo:'',link:''}) 
      }else{
        Swal.fire('Error',ok,'error');
      }
    });
  }
  actualizar(id:string){
    let {titulo,link} = this.miFormulario2.value;
    if(titulo === ''){
      titulo = this.titulos;
    }
    if(link === ''){
      link = this.links;
    }
    this.paginaService.actualizarCita(id,titulo,link)
    .subscribe( ok => {
      console.log(ok);
      if(ok.ok === true){
        Swal.fire('Listo','Cita actualizada correctamente','success')
        this.links = '';
        this.titulos = '';
        this.cargarCita(this.idc)
      }else{
        Swal.fire('Error',ok,'error');
      }
    });
  }
  eliminar(id:string){
    this.paginaService.eliminarCita(id)
    .subscribe( ok => {
      console.log(ok);
      if(ok.ok === true){
        Swal.fire('Listo','Cita eliminada correctamente','success')
        this.citas = []
        this.traerCitas();
      }else{
        Swal.fire('Error',ok,'error');
      }
    });
  }

  cambiarOpcion(numOpcion: number){
    switch (numOpcion){
      case 1:
        this.opcion= 1;
        break;
      case 2:
        this.opcion= 2;
        break;
      case 3:
        this.opcion= 3;
        break;
          
    }
  }

}

