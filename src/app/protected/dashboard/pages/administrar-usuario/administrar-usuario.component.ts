import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../auth/services/auth.service';
import Swal from 'sweetalert2';
import { PaginaService } from '../../services/pagina.service';
import { Usuario } from '../../../../auth/interfaces/interfaces';
import { Usuarios } from '../perfil/Usuarios';
import { Proyectos } from './Proyectos';
import { ProyectosDato } from "./ProyectosDato";
import { Documentos } from '../busqueda/Documentos';
import { Categorias } from '../busqueda/porcategoria/Categoria';

@Component({
  selector: 'app-administrar-usuario',
  templateUrl: './administrar-usuario.component.html',
  styles: [
  ]
})
export class AdministrarUsuarioComponent implements OnInit {
  public inputActiveClass = 'active';
  public idd= '';
  public categorias: any[]=[]
  public edus = '';
  public opcion = 1;
  public users = '';
  public names = '';
  public emails = '';
  public semestres: number = 0;
  public rols = '';
  public ids = '';
  public passwords = '';
  public titulos= '';
  public alumnos ='';
  public alumnos2 = '';
  public profeguias= '';
  public profeinformantes= '';
  public profeinformantes2='';
  public profeinformantes3='';
  public proids = '';
  public cooridnadors='';  
  public profesorPt1s ='';
  public titulos2 = '';
  public autors = '';
  public linkBs = '';
  public linkRs = '';
  public enable: boolean = true;
  public aceptado: boolean = false
  public pass : boolean = false;
  public alum2: boolean = false;
  public profi2: boolean = false;
  public profi3: boolean = false;
  public datosproyecto:any[] = [];
  usuario : string = '';
  proyecto : string = '';
  usuarioselec : Usuarios[] = [];
  datos: Usuarios[] = [];
  datose: Usuarios[] = [];
  alumproy: Usuarios[] = [];
  profproy: Usuarios[] = [];
  coordinador: Usuarios[] = [];
  datospro: Proyectos[] = [];
  datosproe: Proyectos[]=[];
  datosD: any[] =[];
  datosC: any[] = [];


  miFormulario: FormGroup = this.fb.group({
    user: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(8)]],
    password: ['',[Validators.required, Validators.minLength(6)]],
    email: ['', [Validators.required, Validators.email]],
    name: ['', [Validators.required]],
    rol: ['', [Validators.required] ],
    semestre:[''],
    enable:[true]
  })
  miFormulario2: FormGroup = this.fb.group({
    user: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(8)]],
    password: [this.passwords,[ Validators.minLength(6)]],
    email: ['', [Validators.required, Validators.email]],
    name: ['', [Validators.required]],
    rol: ['', [Validators.required] ],
    semestre:[''],
    enable:[true]
  })
  miFormulario3: FormGroup = this.fb.group({
    titulo: ['', [Validators.required]],
    alumno: ['',[ Validators.required]],
    alumno2: [''],
    profeguia: [''],
    profeinformante: [''],
    profeinformante2:[''],
    profeinformante3:[''],
    coordinador:[''],
    profesorPt1:[''],
    aceptado:[false,[Validators.required]],
    enable:[true]
  })
  miFormulario4: FormGroup = this.fb.group({
    titulo: ['', [Validators.required]],
    alumno: ['',[ Validators.required]],
    alumno2: [''],
    profeguia: [''],
    profeinformante: [''],
    profeinformante2:[''],
    profeinformante3:[''],
    coordinador:[''],
    profesorPt1:[''],
    aceptado:[false],
    enable:[true]
  })
  miFormulario5: FormGroup = this.fb.group({
    titulo:['',[Validators.required]],
    autor:['',[Validators.required]],
    categoria:['',],
    linkB:['',],
    linkR:[''],
  })
  miFormulario6: FormGroup = this.fb.group({
    titulo:['',[Validators.required]],
    autor:['',[Validators.required]],
    categoria:[''],
    linkB:['',],
    linkR:[''],
  })
  miFormulario7: FormGroup = this.fb.group({
    categoria:['',[Validators.required]]
  })
  
  constructor(private fb: FormBuilder,
    private router: Router,
    private AuthService:AuthService,
    private paginaService: PaginaService) { }
// llenar selector rol
    roles: string[] = [];
    semestre: number[] = [];
  ngOnInit(): void {
    this.roles = this.AuthService.roles;
    this.semestre = this.AuthService.semestre;
  }
  cambiarOpcion(numOpcion: number){
    switch (numOpcion){
      case 1:
        this.opcion= 1;
        break;
      case 2:
        this.opcion= 2;
        this.traerUsuario();
        break;
      case 3:
        this.opcion= 3;
        this.traerUsuarioE();
        break;
          
      case 4:
        this.opcion= 4;
        this.traerAlumno();
        break;
      case 5:
        this.opcion= 5;
        this.traerproyectos();
        this.traerAlumno();
        break;
      case 6:
        this.opcion= 6;
        this,this.traerproyectosE();
        break;
      case 7:
        this.opcion=7;
        this.datosC = [];
        this.cargarC()
        break;
        case 8:
        this.opcion=8;
        this.datosD = [];
        this.traerDocumentos()
        this.datosC = [];
        this.cargarC()
        break;
        case 9:
        this.opcion=9;
        this.datosD = [];
        this.traerDocumentos();
        break;
        case 10:
          this.opcion = 10;
        break;
        case 11:
          this.opcion = 11;
          this.datosC = []
          this.cargarC();
        break;
    }
  }
  registro(){
    let {user, password,email,name,rol,semestre,enable} = this.miFormulario.value;
    if(semestre === ''){
      semestre = null;
    }
    this.AuthService.registro( user, password,email,name,rol,semestre,enable)
    .subscribe( ok => {
      console.log(ok);
      if(ok.ok === true){
        Swal.fire('Listo','Usuario creado correctamente','success')
        this.miFormulario.setValue({user:'',password:'',email:'',name:'',rol:'',semestre:'',enable:true}) 
        this.cambiarOpcion(2)
        this.cambiarOpcion(1)
      }else{
        Swal.fire('Error',ok,'error');
      }
    });
  }
  registroD(){
    let {titulo, autor,categoria,linkB,linkR} = this.miFormulario5.value;
    this.paginaService.crearDocumento( titulo, autor,categoria,linkB,linkR)
    .subscribe( ok => {
      console.log(ok);
      if(ok.ok === true){
        Swal.fire('Listo','Documento creado correctamente','success')
        this.miFormulario5.setValue({titulo:'',autor:'',categoria:'',linkB:'',linkR:''}) 
        this.cambiarOpcion(6)
        this.cambiarOpcion(7)
      }else{
        Swal.fire('Error',ok,'error');
      }
    });
  }
  actualizarD(id:string){
    let {titulo, autor,categoria,linkB,linkR} = this.miFormulario6.value;
    if(categoria === ''){
      categoria = this.categorias[0]
    }
    this.paginaService.actualizarDocumento( id,titulo, autor,categoria,linkB,linkR)
    .subscribe( ok => {
      console.log(ok);
      if(ok.ok === true){
        Swal.fire('Listo','Documento actualizado correctamente','success')
        this.miFormulario6.setValue({titulo:'',autor:'',categoria:'',linkB:'',linkR:''}) 
        this.cambiarOpcion(7);
        this.cambiarOpcion(8);
      }else{
        Swal.fire('Error',ok,'error');
      }
    });
  }
  eliminarD(id:string){
    this.paginaService.eliminarDocumento(id)
    .subscribe( ok => {
      console.log(ok);
      if(ok.ok === true){
        Swal.fire('Listo','Documento eliminado correctamente','success')
        this.miFormulario6.setValue({titulo:'',autor:'',categoria:'',linkB:'',linkR:''})
        this.datosD = [];
        this.traerDocumentos();
      }else{
        Swal.fire('Error',ok,'error');
      }
    });
  }
  traerUsuario(){
    this.paginaService.buscartodoUsuario()
    .subscribe(datos =>{
      this.datos = datos;
      console.log(datos);
    })
  }
  traerDocumentos(){
    this.paginaService.buscartodoDocumentos()
    .subscribe(datos =>{
      for(var i=0; i < datos.length; i=i+1){
        
          this.datosD.push(datos[i]);

      }
    })
    console.log(this.datosD)
  }
  traerUsuarioE(){
    let n = 0;
    this.paginaService.buscartodoUsuario()
    .subscribe(datos =>{
      for(var i=0; i < datos.length; i=i+1){
        if(datos[i].enable === true){
          this.datose[n] = datos[i];
          n = n+1;
        }
      }
      console.log(this.datose);
    })
  }
  traerproyectos(){
    this.paginaService.buscartodoProyecto()
    .subscribe(datos=>{
      this.datospro = datos;
      console.log(this.datospro)
      console.log(datos)
    })
  }
  traerproyectosE(){
    let m = 0;
    this.datosproyecto = [];
    this.paginaService.buscartodoProyectopop()
    .subscribe(datos=>{
      console.log(datos)
      for(var i=0; i < datos.length; i=i+1){
        if(datos[i].enable === true){
          this.datosproyecto.push(datos[i]);
          m = m+1;
        }
      }
      console.log(this.datosproyecto)
    })
  }
  cargarC(){
    this.paginaService.traerCategorias()
    .subscribe(datos=>{
      for(var i = 0; i<datos.length; i=i+1){
        this.datosC.push(datos[i])
      }
         

      })
  }
  traerAlumno(){
    let n = 0;
    let p = 0;
    let c = 0;
    this.paginaService.buscartodoUsuario()
    .subscribe(datos =>{
      for(var i = 0; i<datos.length;i=i+1){
        if(datos[i].rol === 'estudiante'){
          this.alumproy[n] = datos[i];
          n = n+1;
        }else if(datos[i].rol === 'docente'){
          this.profproy[p] = datos[i];
          p=p + 1
        }else if(datos[i].rol === 'coordinador'){
          this.coordinador[c] = datos[i];
          c=c+1
        }
      }
      console.log(this.alumproy)
      console.log(this.profproy)
    })
  }
  cargar(usuario: string){
    for(var i = 0; i < this.datos.length; i = i+1 ){
      if( usuario === this.datos[i].user){
        this.names = this.datos[i].name;
        this.semestres = this.datos[i].semestre;
        this.emails = this.datos[i].email;
        this.users = this.datos[i].user;
        this.rols = this.datos[i].rol;
        this.ids = this.datos[i]._id;
        this.passwords = this.datos[i].password;
        return console.log(this.ids)
      }
    }
  }
  cargarpro(proyecto:string){
    for(var i=0; i<this.datospro.length; i= i+1){
      if(proyecto === this.datospro[i]._id){
        this.titulos = this.datospro[i].titulo;
        this.alumnos = this.datospro[i].alumno;
        this.alumnos2= this.datospro[i].alumno2;
        this.profeguias= this.datospro[i].profeguia;
        this.profeinformantes= this.datospro[i].profeinformante;
        this.profeinformantes2=this.datospro[i].profeinformante2;
        this.profeinformantes3= this.datospro[i].profeinformante3;
        this.cooridnadors = this.datospro[i].coordinador;
        this.proids = this.datospro[i]._id;
        this.profesorPt1s = this.datospro[i].profesorPt1;
        this.aceptado = this.datospro[i].aceptado;
        console.log(this.proids)
        console.log(this.alumnos)
        console.log(this.alumnos2)
      }
    }
  }
  cargarD(id:string){
    for(var i = 0; i<this.datosD.length; i=i+1){
      if(id === this.datosD[i]._id){
        this.titulos2 = this.datosD[i].titulo;
        this.linkBs = this.datosD[i].linkB;
        this.linkRs = this.datosD[i].linkR;
        this.autors = this.datosD[i].autor;
        this.idd = this.datosD[i]._id;
        this.categorias = this.datosD[i].categoria;
      }
    }
    console.log(this.categorias)
  }
  consolelog(e: any){
    console.log(e)
  }

  actualizar(ids: string){
    let {user, password,email,name,rol,semestre,enable} = this.miFormulario2.value;
    if(rol === ''){
      rol = this.rols;
    }
    if(semestre === 0){
      semestre = this.semestres
    }
    if(password === ''){
      password = this.passwords
    }
    this.paginaService.actualizar(ids, user, password,email,name,rol,semestre,enable)
    .subscribe( ok => {
      console.log(ok);
      if(ok.ok === true){
        Swal.fire('Listo','Usuario actualizado correctamente','success')
        this.miFormulario2.setValue({user:'',password:'',email:'',name:'',rol:'',semestre:'',enable:true}) 
        this.datos = [];
        this.traerUsuario();
        this.cambiarOpcion(1);
        this.cambiarOpcion(2);


      }else{
        Swal.fire('Error','Usuario no se pudo actualizar','error');
      }
    });
  }
  eliminar(ids: string){
    const enable = false;
    this.paginaService.eliminar(ids,enable)
    .subscribe(ok =>{
      console.log(ok);
      if(ok.ok === true){
        Swal.fire('Listo','Usuario deshabilitado correctamente','success')
        this.datose = [];
        this.traerUsuarioE();
      }
      else{
        Swal.fire('Error','Ocurrio un error','error')
      }
    })
  }
  eliminarC(ids:string){
    this.paginaService.eliminarCategoria(ids)
    .subscribe(ok =>{
      console.log(ok);
      if(ok.ok === true){
        Swal.fire('Listo','Categoria eliminada correctamente','success')
        this.datosC = [];
        this.cargarC();
      }
      else{
        Swal.fire('Error','Ocurrio un error','error')
      }
    })
  }
  habilitar(ids: string){
    const enable = true;

    this.paginaService.eliminar(ids,enable)
    .subscribe(ok =>{
      console.log(ok);
      if(ok.ok === true){
        Swal.fire('Listo','Usuario habilitado correctamente','success')
      }
      else{
        Swal.fire('Error','Ocurrio un error','error')
      }
    })
  }

  habilitarpass(){
    this.pass = !this.pass
  }
  habilitaralumno(){
    this.alum2 = !this.alum2;
  }
  habilitarprofei2(){
    this.profi2 = !this.profi2;
  }
  habilitarprofi3(){
    this.profi3 = !this.profi3;
  }
  registropro(){
    let {titulo,alumno,alumno2,profeguia,profeinformante,profeinformante2,profeinformante3,coordinador,profesorPt1,aceptado,enable} = this.miFormulario3.value;
    if(alumno ===''){
      alumno = null;
    }
    if(alumno2 ===''){
      alumno2 = null;
    }
    if(profeguia ===''){
      profeguia = null
    }
    if(profeinformante ===''){
      profeinformante = null;
    }
    if(profeinformante2 === ''){
      profeinformante2 = null
    }
    if(profeinformante3 === ''){
      profeinformante3 = null
    }
    if(coordinador ===''){
      coordinador = null
    }
    this.paginaService.registropro( titulo,alumno,alumno2,profeguia,profeinformante,profeinformante2,profeinformante3,coordinador,profesorPt1,aceptado,enable)
    .subscribe( ok => {
      console.log(ok);
      if(ok.ok === true){
        Swal.fire('Listo','Proyecto creado correctamente','success')
        this.miFormulario3.setValue({titulo:'',alumno:'',alumno2:'',profeguia:'',profeinformante:'',profeinformante2:'',profeinformante3:'',coordinador:'',profesorPt1, aceptado: false,enable:true}) 
        this.cambiarOpcion(3)
        this.cambiarOpcion(4)
      }else{
        Swal.fire('Error',ok,'error');
      }
    });
  }
  registroC(){
    const {categoria}=this.miFormulario7.value;
    this.paginaService.crearCategoria(categoria)
    .subscribe( ok => {
      console.log(ok);
      if(ok.ok === true){
        Swal.fire('Listo','Categoria creada correctamente','success')
        this.miFormulario7.setValue({categoria:''}) 
      }else{
        Swal.fire('Error',ok,'error');
      }
    });
  }
  actualizarpro2(ids:string){
    let{titulo, alumno,alumno2,profeguia,profeinformante,profeinformante2,profeinformante3,coordinador,profesorPt1,aceptado,enable}= this.miFormulario4.value;
    console.log(this.alumnos,this.alumnos2,this.profeguias)
    console.log(alumno,alumno2,profeguia)
    if(alumno===''){
      if(this.alumnos !== null)
      {alumno = this.alumnos[0];}
      else{
        alumno = null
      }
    }
    if(alumno2 === ''){
      if(this.alumnos2 !== null)
      {alumno2 = this.alumnos2[0];}
      else{
        alumno2 = null
      }
    }
    if(profeguia===''){
      if(this.profeguias !== null)
      {profeguia = this.profeguias[0];}
      else{
        profeguia = null
      }
    }
    if(profeinformante===''){
      if(this.profeinformantes !== null)
      {profeinformante = this.profeinformantes[0];}
      else{
        profeinformante = null
      }
    }
    if(profeinformante2===''){
      if(this.profeinformantes2 !== null)
      {profeinformante2 = this.profeinformantes2[0];}
      else{
        profeinformante2 = null
      }
    }
    if(profeinformante3===''){
      if(this.profeinformantes3 !== null)
      {profeinformante3 = this.profeinformantes3[0];}
      else{
        profeinformante3 = null
      }
    }
    if(coordinador===''){
      if(this.cooridnadors !== null)
      {coordinador = this.cooridnadors[0];}
      else{
        coordinador = null
      }
    }
    if(profesorPt1===''){
      if(this.profesorPt1s !== null)
      {profesorPt1 = this.profesorPt1s[0];}
      else{
        profesorPt1 = null
      }
    }
   
    this.paginaService.actualizarpro(ids,titulo,alumno,alumno2,profeguia,profeinformante,profeinformante2,profeinformante3,coordinador,profesorPt1,aceptado,enable)
    .subscribe( ok => {
      console.log(ok);
      if(ok.ok === true){
        Swal.fire('Listo','Proyecto actualizado correctamente','success')
        this.miFormulario4.setValue({titulo:'',alumno:'',alumno2:'',profeguia:'',profeinformante:'',profeinformante2:'',profeinformante3:'',coordinador:'',profesorPt1:'',aceptado:false,enable:true}) 
        this.cambiarOpcion(4);
        this.cambiarOpcion(5);
      }else{
        Swal.fire('Error','Proyecto no se pudo actualizar','error');
      }
    });
  }
  eliminarpro(ids: string){
    const enable = false;
    this.paginaService.eliminarpro(ids,enable)
    .subscribe(ok =>{
      console.log(ok);
      if(ok.ok === true){
        Swal.fire('Listo','Proyecto deshabilitado correctamente','success')
        this.datosproe = [];
        this.traerproyectosE();
      }
      else{
        Swal.fire('Error','Ocurrio un error','error')
      }
    })
  }
  habilitarpro(ids: string){
    const enable = true;

    this.paginaService.eliminarpro(ids,enable)
    .subscribe(ok =>{
      console.log(ok);
      if(ok.ok === true){
        Swal.fire('Listo','Proyecto habilitado correctamente','success')
        this.traerproyectosE();
      }
      else{
        Swal.fire('Error','Ocurrio un error','error')
      }
    })
  }

}


