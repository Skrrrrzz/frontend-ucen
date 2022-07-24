import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit{

  miFormulario: FormGroup = this.fb.group({
    user: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(8)]],
    password: ['',[Validators.required, Validators.minLength(6)]],
    email: ['', [Validators.required, Validators.email]],
    name: ['', [Validators.required]],
    rol: ['', [Validators.required] ],
    semestre:['',[Validators.required]]

  })
  constructor(private fb: FormBuilder,
              private router: Router,
              private AuthService:AuthService) {}

  //llenar selector rol

  roles: string[] = [];
  semestre: number[] = [];
ngOnInit(): void {
  this.roles = this.AuthService.roles;
  this.semestre = this.AuthService.semestre;
}

  registro(){
    const {user, password,email,name,rol,semestre} = this.miFormulario.value;
    this.AuthService.registro( user, password,email,name,rol,semestre)
    .subscribe( ok => {
      console.log(ok);
      if(ok === true){
        this.router.navigateByUrl('/dashboard');
      }else{
        Swal.fire('Error',ok,'error');
      }
    });
  }
}
