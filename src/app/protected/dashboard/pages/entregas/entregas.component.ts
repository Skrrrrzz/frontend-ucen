import { Component, OnInit } from '@angular/core';
import { subscribeOn } from 'rxjs';
import { PaginaService } from '../../services/pagina.service';
import { Entregas } from '../administrar-usuario/Entrega';
import { Retro } from '../administrar-usuario/Retro';
import Swal from 'sweetalert2';
import {formatDate} from '@angular/common';

@Component({
  selector: 'app-entregas',
  templateUrl: './entregas.component.html',
  styles: [
  ]
})
export class EntregasComponent implements OnInit {
  public inputActiveClass = 'active';
  public archivo = '';
  public entrega = 1;
  public retroali = true;
  public mostrarpro = true;
  public pt1 = false;
  public profeg = false;
  public rol = '';
  public idu = '';
  public idp = '';
  public entregas: any[]=[];
  public retro:any[]=[];
  public proy: any[]=[];
  public poryact: any[] = [];
  public opcion = 2;
  public nombreArchivoRetro = '';
  public nombreArchivoEval = '';
  public nombreArchivo = '';
  public datoArchivo = '';
  public documentoRetro : File [] = [];
  public documentoEval : File [] = [];
  public documento : File [] = [];
  public tipoEntrega = '0';
  public fecha =  <string>formatDate(new Date(), 'dd/MM/yyyy', 'en');
  public contador = 0;

  constructor(private paginaService:PaginaService) { }

  ngOnInit(): void {
    this.rol = String(localStorage.getItem('rol'));
    this.idu = String(localStorage.getItem('id'));
    if(this.rol === 'estudiante'){
      this.traerEntregasA(this.idu);
      this.traerRetroA(this.idu);
      this.traerproyectosxu(this.idu);
      console.log(this.proy)
    }
    if(this.rol === 'docente'){
      this.traerproyectosxu(this.idu);
    }
    if(this.rol === 'coordinador'){
      this.traerproyectosxu(this.idu)
    }

  }

  cambiarEntregaRetroalimentacion(tipo:number){
    if(tipo === 1){
      this.entrega= 1;
      this.opcion=2;
    }else if(tipo === 2){
      this.entrega = 2;
      this.opcion=2;
    }else if (tipo === 3){
      this.entrega = 3;
      this.opcion=2;
    }
  }
  onFileSelected(event:any){
    const file:File = event.target.files[0];
    this.documento = event.target.files[0];
    //const f:File = this.file;
    //console.log(f)
    //this.getBase64(this.documento);
    this.nombreArchivo = file.name;
  }
  onFileSelectedRetro(event:any){
    const file:File = event.target.files[0];
    this.documentoRetro = event.target.files[0];
    this.nombreArchivoRetro = file.name;
    console.log("nombre archivo Retro: " + this.nombreArchivoRetro);
  }
  onFileSelectedEval(event:any){
    const file:File = event.target.files[0];
    this.documentoEval = event.target.files[0];
    this.nombreArchivoEval = file.name;
   console.log("nombre archivo eval: " + this.nombreArchivoEval);
    //console.log(this.datoArchivo);
  }
  getBase64(file:any, tipo : string) {
    var dato = new FileReader();
    dato.readAsDataURL(file);
    dato.onload =  (e)=> {
      var dia = <string>formatDate(new Date(), 'dd/MM/yyyy', 'en');
      this.crearEntrega(this.nombreArchivo,this.idu,this.fecha ,dato.result,tipo,this.proy[0]._id);
    };
    dato.onerror = function (error) {
      console.log('Error: ', error);
    };
  }
  getRetroBase64(file:any, evalu:boolean) {
    var r = new FileReader();
    r.readAsDataURL(file);
    r.onload =  (e)=> {
      
      if(evalu){
        this.crearRetro(this.nombreArchivoEval,this.idu,this.fecha ,r.result,this.tipoEntrega,evalu,this.poryact[0]._id);
        
      }else{
        this.crearRetro(this.nombreArchivoRetro,this.idu,this.fecha ,r.result,this.tipoEntrega,evalu,this.poryact[0]._id);
        
      }
      
    };
    r.onerror = function (error) {
      console.log('Error: ', error);
    };
    
  }
  subirArchivos(isFIP:boolean){
   
   if(isFIP){
      this.getBase64(this.documento, "fip");
    }else{
      this.getBase64(this.documento, this.tipoEntrega);
    }
    
  }

  subirRetro(){
     this.getRetroBase64(this.documentoRetro,false);
     this.getRetroBase64(this.documentoEval, true);

   }
  descargaArchivo(base64:string , nombre:string){
    let dia = formatDate(new Date(), 'dd/MM/yyyy', 'en');
    console.log(dia)
    const linkSource = base64;
    const downloadLink = document.createElement("a");
    const fileName = nombre;
    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.click();
    
  }

crearEntrega(titulo:string,autor:string,fecha:string,documento:any,tipo:string,proyecto:string){

  this.paginaService.crearEntrega(titulo,autor,fecha,documento,tipo,proyecto)
  .subscribe( ok => {
    console.log(ok);
    if(ok.ok === true){
      Swal.fire('Listo','Entrega subida correctamente','success')
      this.nombreArchivo='';
      this.documento = [];
      this.tipoEntrega= '0';
      this.proy = [];
      this.traerproyectosxu(this.idu);
      this.entregas = [];
      this.traerEntregasA(this.idu);

    }else{
      Swal.fire('Error',ok,'error');
      this.nombreArchivo='';
      this.documento = [];
      this.tipoEntrega= '0';
    }
  });
}
actualizarEntrega(id:string,titulo:string,autor:string,fecha:string,documento:any,tipo:string,proyecto:string){
  this.paginaService.actualizarEntrega(id,titulo,autor,fecha,documento,tipo,proyecto)
  .subscribe( ok => {
    console.log(ok);
    if(ok.ok === true){
      Swal.fire('Listo','Entrega subida correctamente','success')
    }else{
      Swal.fire('Error',ok,'error');
    }
  });
}
crearRetro(titulo:string,autor:string,fecha:string,documento:any,tipo:string,evalu:boolean,proyecto:string){
  this.paginaService.crearRetro(titulo,autor,fecha,documento,tipo,evalu,proyecto)
  .subscribe( ok => {
    console.log(ok);
    if(ok.ok === true){
      Swal.fire('Listo','Retroalimentación subida correctamente','success')
      this.contador= this.contador +1
      if(this.contador === 2){
        this.vermas(this.poryact[0]._id)
      }
    }else{
      Swal.fire('Error',ok,'error');
      //this.nombreArchivo='';
      //this.documento = [];
      //this.tipoEntrega= '0';
    }
  });
}
actualizarRetro(id:string,titulo:string,autor:string,fecha:string,documento:any,tipo:string,evalu:boolean,proyecto:string){
  this.paginaService.actualizarRetro(id,titulo,autor,fecha,documento,tipo,evalu,proyecto)
  .subscribe( ok => {
    console.log(ok);
    if(ok.ok === true){
      Swal.fire('Listo','Retroalimentación subida correctamente','success')
    }else{
      Swal.fire('Error',ok,'error');
    }
  });
}
 buscarentregaxp(id:string){
  this.paginaService.buscarentregaxp(id)
  .subscribe(datos =>{
    for(var i = 0;i<datos.length; i=i+1){
      this.entregas.push(datos[i])
    }
  })
 }
 buscarretroxp(id:string){
  this.paginaService.buscarretroxp(id)
  .subscribe(datos =>{
    for(var i = 0; i<datos.length; i=i+1){
      this.retro.push(datos[i])
    }
  })
 }
 vermas(id:string){
  this.contador = 0;
  this.retro = [];
  this.mostrarpro = false;
  this.buscarentregaxp(id);
  this.buscarretroxp(id);
  for(var i =0;i<this.proy.length; i= i+1){
    if(this.proy[i]._id === id){
      this.poryact.push(this.proy[i])
    }
  }

  console.log(String(this.poryact[0].profeinformante[0]._id), 'proyecto')
  console.log(this.idu,'localstorage')
  this.profeguia(this.idu);
  this.profept1(this.idu);
 }
 volver(){
  this.mostrarpro = true;
  this.retro = [];
  this.entregas= [];
  this.opcion = 2;
  this.entrega = 1;
  this.poryact = [];
  this.profeg=false;
  this.pt1 = false;
 }
 traerEntregasA(id:string){
  this.paginaService.buscarentregaA(id)
  .subscribe(datos =>{
    for(var i = 0;i<datos.length;i=i+1){

    
    this.entregas.push(datos[i]);
    }
  })
 }
 traerRetroA(id:string){
  this.paginaService.buscarretroA(id)
  .subscribe(datos =>{
    for(var i = 0;i<datos.length; i= i+1 ){
      this.retro.push(datos[i]);
    }

    console.log(datos,'aqui datos')
    console.log(this.retro,'aqui retro')
  })
 }
 traerproyectosxu(id:string){
  this.paginaService.buscarproyectoxu(id)
  .subscribe(datos =>{
    for(var i = 0;i<datos.length;i=i+1){
      if(datos[i].enable === true){
        this.proy.push(datos[i]);
      }

    }
  })
 }
 profeguia(id:string){
  if(id === String(this.poryact[0].profeinformante[0]._id)){
      this.profeg = true
  }else if(id === String(this.poryact[0].profeinformante2[0]._id)){
    this.profeg = true

  }else if(id === String(this.poryact[0].profeinformante3[0]._id)){
    this.profeg = true

  }    else if (id === String(this.poryact[0].profeguia)){
      this.profeg = false;
  }
 }
 profept1(id:string){
  if( id === String(this.poryact[0].profesorPt1)){
    this.pt1 = true;
  }
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
    case 5:
      this.opcion = 5;
      break;
  }
}
}
