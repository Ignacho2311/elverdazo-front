import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'verdazo-front';


  constructor( private router:Router){
  
  }


  logout(){
    localStorage.clear()
    this.router.navigateByUrl("/auth")
    this.refrescarPagina()
  }
  
  refrescarPagina() {
    // Refresca la página
    location.reload();
  }
  

}
