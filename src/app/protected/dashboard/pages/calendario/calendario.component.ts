import { Component, OnInit } from '@angular/core';
import { PaginaService } from '../../services/pagina.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styles: [
  ]
})
export class CalendarioComponent implements OnInit {
  public idu = String(localStorage.getItem('rol'))
  public sem = String(localStorage.getItem('semestre'))
  public opcion = 1;
  public idf = '';
  public titulos = '';
  public fechas = '';
  public semestres = '';
  fechas1: any[] = [];
  fechas2: any[] = [];
  miFormulario: FormGroup = this.fb.group({
    titulo:['',[Validators.required]],
    fecha: ['',[Validators.required]],
    semestre:['',[Validators.required]]
  })
  miFormulario2: FormGroup =  this.fb.group({
    titulo:['',[Validators.required]],
    fecha: ['',[Validators.required]],
    semestre:['',[Validators.required]]
  })
  constructor(private fb: FormBuilder,
              private paginaService:PaginaService) { }

  ngOnInit(): void {
    this.traerFechas()
  }
  registro(){
    const {titulo,fecha,semestre} = this.miFormulario.value;
    this.paginaService.crearFechas(titulo,fecha,semestre)
    .subscribe( ok => {
      console.log(ok);
      if(ok.ok === true){
        Swal.fire('Listo','Fecha creada correctamente','success')
        this.miFormulario.setValue({titulo:'',fecha:'',semestre:''}) 
      }else{
        Swal.fire('Error',ok,'error');
      }
    });
  }
  traerFechas(){
    this.paginaService.traerFechas()
    .subscribe(datos =>{
      for(var i = 0; i<datos.length; i= i+1){
        if(datos[i].semestre === '1'){
          this.fechas1.push(datos[i])
        }
        if(datos[i].semestre === '2'){
          this.fechas2.push(datos[i])
        }
      }
      console.log(datos)
      console.log(this.fechas1)
      console.log(this.fechas2)
    })
  }
  eliminarFecha(id:string){
    this.paginaService.eliminarFecha(id)
    .subscribe( ok => {
      console.log(ok);
      if(ok.ok === true){
        Swal.fire('Listo','Fecha eliminada correctamente','success')
        this.fechas1 = [];
        this.fechas2 = [];
        this.traerFechas();
      }else{
        Swal.fire('Error',ok,'error');
      }
    });
    this.fechas1 = [];
    this.fechas2 = [];
    this.traerFechas()
  }
  tomarId(id:string){
    this.idf = id
    console.log(this.idf)
    this.cambiarOpcion(2);
    this.cargarFecha(this.idf)
  }
  cargarFecha(id:string){
    for(var i = 0;i<this.fechas1.length; i = i+1){
      if(this.fechas1[i]._id === id){
        this.titulos = this.fechas1[i].titulo;
        this.fechas = this.fechas1[i].fecha;
        this.semestres = this.fechas1[i].semestre;
      }
    }
    for(var o = 0; o<this.fechas2.length; o = o+1){
      if(this.fechas2[o]._id === id){
        this.titulos = this.fechas2[o].titulo;
        this.fechas = this.fechas2[o].fecha;
        this.semestres = this.fechas2[o].semestre;
      }
    }
     
      console.log(this.titulos,this.fechas,this.semestres)
    

  }
  actualizar(id:string){
    let {titulo,fecha,semestre} = this.miFormulario2.value;
    if(titulo === ''){
      titulo = this.titulos
    }
    if(fecha === ''){
      fecha = this.fechas
    }
    if(semestre === ''){
      semestre = this.semestres
    }
    this.paginaService.actualizarFechas(id,titulo,fecha,semestre)
    .subscribe( ok => {
      console.log(ok);
      if(ok.ok === true){
        Swal.fire('Listo','Fecha actualizada correctamente','success')
        this.miFormulario.setValue({titulo:'',fecha:'',semestre:''}) 
      }else{
        Swal.fire('Error',ok,'error');
      }
    });
  }
  cambiarOpcion(numOpcion: number){
    switch (numOpcion){
      case 1:
        this.opcion= 1;
        this.fechas1 = [];
        this.fechas2 = [];
        this.traerFechas();
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
