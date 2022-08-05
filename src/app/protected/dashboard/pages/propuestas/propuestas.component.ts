import { Component, OnInit } from '@angular/core';
import { PaginaService } from '../../services/pagina.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FlexLayoutModule, validateBasis } from '@angular/flex-layout';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-propuestas',
  templateUrl: './propuestas.component.html',
  styles: [
  ]
})
export class PropuestasComponent implements OnInit {
  public rol = String(localStorage.getItem('rol'))
  public ide = '';
  public subid = '';
  public idu = '';
  public mostrarpro = true;
  public titulos = '';
  public profesorguias = '';
  public descipcions = '';
  public enables = true;
  public opcion =1 ;
  prop: any[] = [];
  propd: any[] = [];
  miFormulario: FormGroup = this.fb.group({
    titulo:['',[Validators.required]],
    descripcion:['',[Validators.required]],
  })
  miFormulario2: FormGroup = this.fb.group({
    titulo:['',[Validators.required]],
    descripcion:['',[Validators.required]]
  })
  constructor(private fb: FormBuilder,
    private paginaService:PaginaService) { }

  ngOnInit(): void {
      this.idu = String(localStorage.getItem('id'))
      this.rol = String(localStorage.getItem('rol'))
      this.traerPropuestas();
      this.traerPropuestasD();



  }
  traerPropuestas(){
    this.paginaService.traerPropuestas()
    .subscribe(datos =>{
      for(var i = 0; i < datos.length; i = i+1){
      if(datos[i].enable === true){
          this.prop.push(datos[i])
        

      }
      }
     console.log(this.prop)
    })
  }
  traerPropuestasD(){
    let m = 0
    this.paginaService.traerPropuestas()
    .subscribe(datos =>{
    for(var i = 0; i<datos.length; i= i +1){
      if(datos[i].autor[0]._id === this.idu){
        this.propd.push(datos[i]) 
       
      } 
    }
    console.log(this.propd)
    })
    
    console.log(this.propd)
  }
  vermas(id:string){
    this.mostrarpro = false;
    this.opcion = 2;
    for(var i = 0; i<this.propd.length; i=i+1){
      if(this.propd[i]._id === id){
        this.descipcions = this.propd[i].descripcion;
        this.enables = this.propd[i].enable;
        this.profesorguias = this.propd[i].autor[0].name;
        this.titulos = this.propd[i].titulo;
      }
    }
  }
  vermasE(id:string){
    this.mostrarpro = false;
    this.opcion = 2;
    for(var i = 0; i<this.prop.length; i=i+1){
      if(this.prop[i]._id === id){
        this.descipcions = this.prop[i].descripcion;
        this.enables = this.prop[i].enable;
        this.profesorguias = this.prop[i].autor[0].name;
        this.titulos = this.prop[i].titulo;
      }
    }
  }
  editar(id:string){
    this.opcion = 4;
    this.ide = id;
    for(var i = 0; i<this.propd.length; i=i+1){
      if(this.propd[i]._id === id){
        this.descipcions = this.propd[i].descripcion;
        this.enables = this.propd[i].enable;
        this.profesorguias = this.propd[i].autor[0].name;
        this.titulos = this.propd[i].titulo;
      }
    }
  }
  actualizar(id:string){
    let{titulo,descripcion} = this.miFormulario2.value;
    return this.paginaService.editarPropuesta(id,titulo,descripcion)
    .subscribe( ok => {
      console.log(ok);
      if(ok.ok === true){
        Swal.fire('Listo','Propuesta actualizada correctamente','success')
        this.miFormulario.setValue({titulo:'',fecha:''}) 
      }else{
        Swal.fire('Error',ok,'error');
      }
    });
  }
  crear(){
    const {titulo,descripcion} = this.miFormulario.value;
    const enable = true;
    const autor = this.idu;
    return this.paginaService.crearPropuestas(titulo,descripcion,enable,autor)
    .subscribe( ok => {
      console.log(ok);
      if(ok.ok === true){
        Swal.fire('Listo','Propuesta creada correctamente','success')
        this.miFormulario.setValue({titulo:'',fecha:''}) 
      }else{
        Swal.fire('Error',ok,'error');
      }
    });
  }
  volver(){
    this.mostrarpro = true;
    this.cambiarOpcion(1);
    this.propd = [];
    this.traerPropuestasD();
    this.descipcions = '';
    this.titulos='';
    this.profesorguias = '';
  }
  habilitar(id:string){
    const enable = true
    return this.paginaService.deshabPropuesta(id,enable)
    .subscribe( ok => {
      console.log(ok);
      if(ok.ok === true){
        Swal.fire('Listo','Propuesta habilitada correctamente','success')
        this.propd = [];
        this.traerPropuestasD(); 
      }else{
        Swal.fire('Error',ok,'error');
      }
    });
    
  }
  eliminar(id:string){
    return this.paginaService.eliminarPropuesta(id)
    .subscribe( ok => {
      console.log(ok);
      if(ok.ok === true){
        Swal.fire('Listo','Propuesta eliminada correctamente','success')
        this.propd = [];
        this.traerPropuestasD(); 
      }else{
        Swal.fire('Error',ok,'error');
      }
  })}
  deshabilitar(id:string){
    const enable = false
    return this.paginaService.deshabPropuesta(id,enable)
    .subscribe( ok => {
      console.log(ok);
      if(ok.ok === true){
        Swal.fire('Listo','Propuesta deshabilitada correctamente','success')
        this.propd = [];
        this.traerPropuestasD(); 
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
      case 4:
        this.opcion = 4;
        break;
    }
  }
}
