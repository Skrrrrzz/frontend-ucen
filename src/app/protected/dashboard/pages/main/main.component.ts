import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../../auth/services/auth.service';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styles: [
    `
      *{
        margin:15px;
      }
    `
  
    ]
})
export class MainComponent{

  get usuario(){
    return this.AuthService.usuario;
  }
  constructor(private router:Router,
              private AuthService: AuthService) { }

  logout(){

    this.router.navigateByUrl('/auth');
    this.AuthService.logout();
  }



}
