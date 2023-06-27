import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login-screen',
  templateUrl: './login-screen.component.html',
  styleUrls: ['./login-screen.component.css']
})
export class LoginScreenComponent {

  miFormulario:FormGroup = this.fb.group({
    email: ["test1@mail.com",[Validators.required, Validators.email]],
    password: ["123456",[Validators.required, Validators.minLength(6)]],

  })
  constructor(private fb:FormBuilder, private router:Router, private authService:AuthService){}

  login(){
    
    console.log(this.miFormulario.value);

    this.authService.login(this.miFormulario.value).subscribe((res)=>{ // se suscribe al servicio
      if (res === true) {
        localStorage.setItem("user",JSON.stringify(this.authService.user)) // guarda el token del usuario en el localStorage
        this.router.navigateByUrl("/home").then(()=>{
          window.location.reload()
        }) // lo redirije al home del usuario
        
      }else{
        Swal.fire({
          title:"Error ...",
          text:res,
          icon:"error"
        })
        
      }      
    })
    
  }
}
