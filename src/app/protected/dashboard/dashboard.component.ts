import { Component, Input } from '@angular/core';
import { style } from '@angular/animations';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service';


interface SideNavToggle{
  screenWidth: number;
  collapsed: boolean;
}
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  
})

export class DashboardComponent {

  isSideNavCollapsed = false;
  screenWidth = 0;
  onToggleSideNav(data: SideNavToggle): void{
    this.screenWidth = data.screenWidth;
    this.isSideNavCollapsed = data.collapsed;
  }

}