import { Component, OnInit } from '@angular/core';
import { Documentos } from '../Documentos';
import { PaginaService } from '../../../services/pagina.service';

@Component({
  selector: 'app-porcategoria',
  templateUrl: './porcategoria.component.html',
  styles:[
    `
    li{
      cursor:pointer
    }
    button{
      margin-right: 5px !important;
    }
    `
  ]
})
export class PorcategoriaComponent implements OnInit {
  
  categorias: any[] = []
  categoriaActiva: string = '';
  documentos: any[] = [];
  constructor(private paginaService: PaginaService) { }

  ngOnInit(): void {
    this.cargarC()
  }
  activaCategoria(id:string,categoria:string){
    this.categoriaActiva = categoria ;
    this.paginaService.buscarCategoria(id)
    .subscribe(documentos => {
        this.documentos = documentos;
      
      console.log(this.documentos)
    })

      
    
  }
  cargarC(){
    this.paginaService.traerCategorias()
    .subscribe(datos=>{
      for(var i = 0; i<datos.length; i=i+1){
        this.categorias.push(datos[i])
      }
        console.log(this.categorias) 
      
      })
  }
}
