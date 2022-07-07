import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//import { FlexLayoutModule } from '@angular/flex-layout';


import { ProtectedRoutingModule } from './protected-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
//import { MaterialModule } from '../material/material/material.module';
import { MainComponent } from './dashboard/pages/main/main.component';
//import { FlexLayoutModule } from '@angular/flex-layout';


@NgModule({
  declarations: [
    DashboardComponent,
    MainComponent
  ],
  imports: [
    CommonModule,
  //  FlexLayoutModule,
    //MaterialModule,
    ProtectedRoutingModule
  ]
})
export class ProtectedModule { }
