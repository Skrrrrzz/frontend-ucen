import { dashCaseToCamelCase } from '@angular/compiler/src/util';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MainComponent } from './dashboard/pages/main/main.component';
import { InicioComponent } from './dashboard/pages/inicio/inicio.component';
import { AdministrarUsuarioComponent } from './dashboard/pages/administrar-usuario/administrar-usuario.component';
import { CalendarioComponent } from './dashboard/pages/calendario/calendario.component';
import { CitasComponent } from './dashboard/pages/citas/citas.component';
import { EntregasComponent } from './dashboard/pages/entregas/entregas.component';
import { NotificacionesComponent } from './dashboard/pages/notificaciones/notificaciones.component';
import { PerfilComponent } from './dashboard/pages/perfil/perfil.component';
import { PropuestasComponent } from './dashboard/pages/propuestas/propuestas.component';
import { PorcategoriaComponent } from './dashboard/pages/busqueda/porcategoria/porcategoria.component';
import { BuscadorComponent } from './dashboard/pages/busqueda/buscador/buscador.component';


const routes: Routes = [
  {
    path:'',
    component: DashboardComponent,
    children: [
      {path:'inicio',component:InicioComponent},
      {path:'administrarusuario',component:AdministrarUsuarioComponent},
      {path:'calendario',component:CalendarioComponent},
      {path:'citas',component:CitasComponent},
      {path:'documento/busqueda',component:BuscadorComponent},
      {path:'documento/porcategoria', component:PorcategoriaComponent},
      {path:'entregas',component:EntregasComponent},
      {path:'notificaciones',component:NotificacionesComponent},
      {path:'perfil',component:PerfilComponent},
      {path:'propuestas',component:PropuestasComponent},
      {path: '**',redirectTo:'inicio'},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProtectedRoutingModule { }
