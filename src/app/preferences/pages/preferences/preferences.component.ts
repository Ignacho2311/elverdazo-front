import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CrudService } from 'src/app/services/crud.service';
import { SportmonksService } from 'src/app/services/sportmonks.service';
import {Datum, } from 'src/app/interface/TeamsBySeason.interface'

@Component({
  selector: 'app-preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.css']
})
export class PreferencesComponent implements OnInit{
  
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
      console.log(this.preferences.length);
    })
    

    this.sportMonksService.getTeams().subscribe(data=>{
      this.teams= data.data
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
  this.router.navigateByUrl("/home")
  
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
