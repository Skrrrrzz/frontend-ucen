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
export class PorcategoriaComponent {
  
  categorias: string[] = ['ia','desarrollo web','desarrollo mobile','base de datos'];
  categoriaActiva: string = '';
  documentos: Documentos[] = [];
  constructor(private paginaService: PaginaService) { }

  activaCategoria(categoria:string){
    this.categoriaActiva = categoria;
    this.paginaService.buscarCategoria(categoria)
    .subscribe(documentos => this.documentos = documentos);
  }
}
