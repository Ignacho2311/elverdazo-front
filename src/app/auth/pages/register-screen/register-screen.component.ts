import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register-screen',
  templateUrl: './register-screen.component.html',
  styleUrls: ['./register-screen.component.css']
})
export class RegisterScreenComponent {

  miFormulario:FormGroup = this.fb.group({
    email: ["test10@mail.com",[Validators.required, Validators.email]],
    username: ["Test 10",[Validators.required, Validators.minLength(3)]],
    password: ["123456",[Validators.required, Validators.minLength(6)]],
    password2: ["123456",[Validators.required, Validators.minLength(6)]],


  })
  constructor(private fb:FormBuilder, private router:Router, private authService:AuthService){}

  register(){
    const {password,password2}= this.miFormulario.value

    if(password === password2){
      this.authService.register(this.miFormulario.value).subscribe((res)=>{ // se suscribe al servicio
        if (res === true) {
          localStorage.setItem("user",JSON.stringify(this.authService.user)) // guarda el token del usuario en el localStorage
          this.router.navigateByUrl("/home") // lo redirije al home del usuario
        }else{
          Swal.fire({
            title:"Error ...",
            text:res,
            icon:"error"
          })
        }      
      })
    }else{
      Swal.fire({
        title:"Error ...",
        text:"Las contraseñas deben ser iguales",
        icon:"error"
      })
    }
  }
}
