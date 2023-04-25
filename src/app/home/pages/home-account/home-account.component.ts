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
  
  user:any
  preferences: Array<any> = []
  miFormulario: FormGroup = this.formBuilder.group({
    equipos: [],
    corners:"",
    over1_5goals:"",
    yellow_cards:""
  })

  teams:Datum[]=[]
  miFormulario2!: FormGroup;
  equiposSeleccionados:number[]=[]


  
  constructor(private crudService:CrudService, private router:Router,private formBuilder:FormBuilder, private sportMonksService:SportmonksService){
    this.miFormulario2= this.formBuilder.group({})
  }

  onChange(event: Event, equipo: any) {
    const input = event.target as HTMLInputElement;
    if (input.checked) {
      this.equiposSeleccionados.push(equipo.id);
    } else {
      const index = this.equiposSeleccionados.indexOf(equipo.id);
      if (index !== -1) {
        this.equiposSeleccionados.splice(index, 1);
      }
    }
  }

  ngOnInit():void{
    this.user = this.crudService.user
    this.crudService.read().subscribe((res)=>{
      this.preferences = res.preferences
    })

    this.sportMonksService.getTeams().subscribe(data=>{
      this.teams= data.data
      // console.log(this.teams);
    })
  }

  refrescarPagina() {
    // Refresca la página
    location.reload();
  }

  create(){
      const formValue = this.miFormulario.value
      const data = {
        equipos :this.equiposSeleccionados,
        corners: formValue.corners,
        over1_5goals: formValue.over1_5goals,
        yellow_cards:formValue.yellow_cards
      }
      
      
      this.crudService.create(data).subscribe((response)=>{
      this.equiposSeleccionados = []
      this.miFormulario.reset()
      
      this.crudService.read().subscribe((res)=>{
      this.preferences = res.preferences
      console.log(data);
      
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

  