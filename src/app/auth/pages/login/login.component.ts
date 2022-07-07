import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { Component} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router'
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent {

  miFormulario: FormGroup = this.fb.group({
    user: ['', [Validators.required, Validators.maxLength(8), Validators.minLength(7)]],
    password: ['',[Validators.required, Validators.minLength(6)]],
  });
 
  constructor(private fb: FormBuilder,
              private router: Router,
              private AuthService: AuthService) { }


  login(){

    /*this.AuthService.validarToken()
        .subscribe(resp => console.log(resp));*/
    console.log(this.miFormulario.value);
    const {user, password} = this.miFormulario.value;
    this.AuthService.login( user, password)
    .subscribe( ok => {
      console.log(ok);
      if(ok === true){
        this.router.navigateByUrl('/dashboard');
      }else{
        Swal.fire('Error',ok,'error');
      }
    });
    //this.router.navigateByUrl('/dashboard')
  }

}
