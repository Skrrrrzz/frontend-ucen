import { dashCaseToCamelCase } from '@angular/compiler/src/util';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MainComponent } from './dashboard/pages/main/main.component';

const routes: Routes = [
  {
    path:'',
    component: DashboardComponent,
    children: [
      {path: 'main',component:MainComponent},
      {path: '**',redirectTo:'main'},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProtectedRoutingModule { }
