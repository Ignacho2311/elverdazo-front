import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CrudService } from 'src/app/services/crud.service';
import { SportmonksService } from 'src/app/services/sportmonks.service';
import {Datum, TeamsBySeason} from 'src/app/interface/TeamsBySeason.interface'

@Component({
  selector: 'app-home-account',
  templateUrl: './home-account.component.html',
  styleUrls: ['./home-account.component.css']
})
export class HomeAccountComponent implements OnInit {
  teams:Datum[]=[]
  user:any
  preferences: Array<any> = []
  miFormulario: FormGroup = this.formBuilder.group({
    equipos: this.formBuilder.array([]),
    corners:"",
    over1_5goals:"",
    yellow_cards:""
  })


  constructor(private crudService:CrudService, private router:Router,private formBuilder:FormBuilder, private sportMonksService:SportmonksService){}

  ngOnInit():void{
    this.user = this.crudService.user
    this.crudService.read().subscribe((res)=>{
      this.preferences = res.preferences
    })

    this.sportMonksService.getTeams().subscribe(data=>{
      this.teams= data.data
      console.log(this.teams);
    })
  }



  refrescarPagina() {
    // Refresca la página
    location.reload();
  }

  create(){
      // console.log(this.miFormulario.value);
      
      this.crudService.create(this.miFormulario.value).subscribe((response)=>{
      this.miFormulario.reset()
      this.crudService.read().subscribe((res)=>{
      this.preferences = res.preferences
      
    })
  })
  
  
}

  delete(id:string){
    this.crudService.delete(id).subscribe(response=>{
      this.crudService.read().subscribe((res)=>{
        this.preferences = res.preferences
      })
    })
  }

  logout(){
    localStorage.clear()
    this.router.navigateByUrl("/auth")
    this.refrescarPagina()
  }

  
}

  