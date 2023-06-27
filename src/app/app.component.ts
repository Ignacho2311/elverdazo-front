import { Component, OnInit, } from '@angular/core';
import { Router } from '@angular/router';
import { CrudService } from './services/crud.service';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'verdazo-front';
  user:any

  constructor( private router:Router, private crudService:CrudService,){
  
  }

  ngOnInit(){
    this.user = this.crudService.user
    let hasUser = this.hasUser();
    console.log(hasUser); 
  }
  
  hasUser(): boolean {
    return this.user !== null && this.user !== undefined;
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
