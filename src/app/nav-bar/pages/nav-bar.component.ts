import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CrudService } from 'src/app/services/crud.service';


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  user:any

  constructor( private router:Router, private crudService:CrudService, public authService:AuthService){
  
  }

  ngOnInit(){
    this.user = this.crudService.user
    let hasUser = this.hasUser();
    console.log(hasUser); 
  }
  
  menuIsOpen = false;

  toggleMenu() {
    this.menuIsOpen = !this.menuIsOpen;
    if (this.menuIsOpen) {
      document.body.style.overflow = 'hidden'; // Oculta el scroll del body
    } else {
      document.body.style.overflow = ''; // Restaura el scroll del body
    }
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
