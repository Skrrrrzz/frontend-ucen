import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//import { FlexLayoutModule } from '@angular/flex-layout';


import { ProtectedRoutingModule } from './protected-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MainComponent } from './dashboard/pages/main/main.component';
import { InicioComponent } from './dashboard/pages/inicio/inicio.component';
import { CalendarioComponent } from './dashboard/pages/calendario/calendario.component';
import { AdministrarUsuarioComponent } from './dashboard/pages/administrar-usuario/administrar-usuario.component';
import { EntregasComponent } from './dashboard/pages/entregas/entregas.component';
import { PerfilComponent } from './dashboard/pages/perfil/perfil.component';
import { CitasComponent } from './dashboard/pages/citas/citas.component';
import { NotificacionesComponent } from './dashboard/pages/notificaciones/notificaciones.component';
import { PropuestasComponent } from './dashboard/pages/propuestas/propuestas.component';
import { BodyComponent } from './dashboard/pages/body/body.component';
//import { FlexLayoutModule } from '@angular/flex-layout';
//import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BuscadorComponent } from './dashboard/pages/busqueda/buscador/buscador.component';
import { PorcategoriaComponent } from './dashboard/pages/busqueda/porcategoria/porcategoria.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    DashboardComponent,
    MainComponent,
    InicioComponent,
    CalendarioComponent,
    AdministrarUsuarioComponent,
    EntregasComponent,
    PerfilComponent,
    CitasComponent,
    NotificacionesComponent,
    PropuestasComponent,
    BodyComponent,
    BuscadorComponent,
    PorcategoriaComponent
  ],
  imports: [
    CommonModule,
    //FlexLayoutModule,
    //NgbModule,
    ProtectedRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ProtectedModule { }
