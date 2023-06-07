import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Datum } from 'src/app/interface/TeamsBySeason.interface';
import { CrudService } from 'src/app/services/crud.service';
import { SportmonksService } from 'src/app/services/sportmonks.service';
import {ReactiveFormsModule} from '@angular/forms'

@Component({
  selector: 'app-create-preference',
  templateUrl: './create-preference.component.html',
  styleUrls: ['./create-preference.component.css']
})
export class CreatePreferenceComponent {

    user:any
  preferences: Array<any> = []
  miFormulario: FormGroup = this.formBuilder.group({
    equipos: [],
    corners:new FormControl(),
    'ball-possession':new FormControl(false),
    yellowcards:new FormControl(false),
    'conceded-scoring-minutes':new FormControl(false),
    goals:new FormControl(false),
    cleansheets:new FormControl(false),
    'team-draws':new FormControl(false),
    'team-lost':new FormControl(false),
    'goals-conceded':new FormControl(false),
    'team-wins':new FormControl(false),
    'scoring-minutes':new FormControl(false),
    'failed-toscore':new FormControl(false),
    'number-of-goals':new FormControl(false),
    btts:new FormControl(false),

  })

  teams:Datum[]=[]
  teamStats:any[]=[]

  equiposSeleccionados:number[]=[]


  
  constructor(private crudService:CrudService, private router:Router,private formBuilder:FormBuilder, private sportMonksService:SportmonksService){
  
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
      console.log(this.teams);
      
    })

    this.sportMonksService.getTeamForPreferences().subscribe(data=>{
      this.teamStats= data.data.statistics[0].details
      console.log(this.teamStats);
      
    })
  }
  updateValue(event: any, controlName: string, value: number) {
    if (event.target.checked) {
      this.miFormulario.get(controlName)?.setValue(value);
    } else {
      this.miFormulario.get(controlName)?.setValue(null);
    }
  }


  toggleSelection(team: any) {
    const index = this.equiposSeleccionados.indexOf(team.id);
    if (index === -1) {
      this.equiposSeleccionados.push(team.id);
    } else {
      this.equiposSeleccionados.splice(index, 1);
    }
  }

  
  toggleSelection2(team: any) {
    const index = this.teamStats.indexOf(team.id);
    if (index === -1) {
      this.teamStats.push(team.id);
    } else {
      this.teamStats.splice(index, 1);
    }
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
        'ball-possesion': formValue['ball-possession'],
        yellowcards:formValue.yellowcards,
        'conceded-scoring-minutes':formValue['conceded-scoring-minutes'],
        goals:formValue.goals,
        cleansheets:formValue.cleansheets,
        'team-draws':formValue['team-draws'],
        'team-lost':formValue['team-lost'],
        'goals-conceded':formValue['goals-conceded'],
        'team-wins':formValue['team-wins'],
        'scoring-minutes':formValue['scoring-minutes'],
        'failed-toscore':formValue['failed-toscore'],
        'number-of-goals':formValue['number-of-goals'],
        btts: formValue.btts
      }
      console.log(data);
      
      
      this.crudService.create(data).subscribe((response)=>{
      this.equiposSeleccionados = []
      this.miFormulario.reset()
      
      this.crudService.read().subscribe((res)=>{
      this.preferences = res.preferences
      console.log(data); 
    })
  })
  this.router.navigateByUrl("/mypreferences")
  
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
