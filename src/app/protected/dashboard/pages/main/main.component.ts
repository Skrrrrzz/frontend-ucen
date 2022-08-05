import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../../auth/services/auth.service';
import { navbarDataE } from './nav-data-estudiante';
import { navbarDataD } from './nav-data-docente';
import { navbarDataC } from './nav-data-coordinador';
import { navbarDataA } from './nav-data-administrador';

interface SideNavToggle{
  screenWidth: number;
  collapsed: boolean;
}
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html'
})
export class MainComponent implements OnInit{


  opened: boolean = false;
  public rol = '';
  get usuario(){
    return this.AuthService.usuario;
  }
  constructor(private router:Router,
              private AuthService: AuthService) { }


ngOnInit(): void{
  this.screenWidth = window.innerWidth;
  this.rol = String(localStorage.getItem('rol'));
}

  logout(){

    this.router.navigateByUrl('/auth');
    this.AuthService.logout();
  }

  toogleSidebar(){
    this.opened = !this.opened;
  }
  @Output() onToggleSideNav: EventEmitter<SideNavToggle> = new EventEmitter();
  collapsed = false;
  screenWidth = 0;
  navDataE = navbarDataE;
  navDataD = navbarDataD;
  navDataC = navbarDataC;
  navDataA = navbarDataA;

 
  
  toogleCollapse():void {
    this.collapsed=!this.collapsed;
    this.onToggleSideNav.emit({collapsed:this.collapsed, screenWidth: this.screenWidth});
  }
  closeSidenav(): void{
    this.collapsed = false;
    this.onToggleSideNav.emit({collapsed:this.collapsed, screenWidth: this.screenWidth});
  }
}
