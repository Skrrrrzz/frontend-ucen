import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../../auth/services/auth.service';
import { navbarData } from './nav-data';

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
  get usuario(){
    return this.AuthService.usuario;
  }
  constructor(private router:Router,
              private AuthService: AuthService) { }


ngOnInit(): void{
  this.screenWidth = window.innerWidth;
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
  navData = navbarData;

 
  
  toogleCollapse():void {
    this.collapsed=!this.collapsed;
    this.onToggleSideNav.emit({collapsed:this.collapsed, screenWidth: this.screenWidth});
  }
  closeSidenav(): void{
    this.collapsed = false;
    this.onToggleSideNav.emit({collapsed:this.collapsed, screenWidth: this.screenWidth});
  }
}
