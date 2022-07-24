import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { PaginaService } from '../../../services/pagina.service';
import { Documentos } from '../Documentos';


@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
    styles: [
      ` li{
        cursor: pointer}`
    ]
})
export class BuscadorComponent {

  hayError: boolean = false;
  termino: string = '';
  documentos: Documentos[] = [];
  constructor(private paginaService: PaginaService ) { }

  buscar() {
    this.hayError=false;
    console.log(this.termino);
  this.paginaService.buscarDocumento(this.termino)
  .subscribe(documento =>{
    console.log(documento)
    if(documento.length === 0)
    {
      this.hayError = true;
    }
    this.documentos = documento;
  })
  }

}
