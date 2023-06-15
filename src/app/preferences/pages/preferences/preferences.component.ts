import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CrudService } from 'src/app/services/crud.service';
import { SportmonksService } from 'src/app/services/sportmonks.service';
import {Datum, } from 'src/app/interface/TeamsBySeason.interface'
import Swal from 'sweetalert2';

@Component({
  selector: 'app-preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.css']
})
export class PreferencesComponent implements OnInit{


  id_teams:Array<any>=[]
  user:any
  id:any
  preferences: Array<any> = []
  teams:Datum[]=[]
  
  equiposSeleccionados:number[]=[]
  preferences2: any;
  filteredPreferences: any[]=[];
  teamStatsByUser: any[]=[];
  translations: { [key: string]: string } = {
    'Corners': 'Tiros de Esquina',
    'Ball Possession %': 'Posesión balon',
    'Yellowcards':'Tarjetas Amarillas',
    'Conceded Scoring Minutes':'Rango de Minutos de Goles Concedidos',
    'Goals':'Goles Anotados',
    'Cleansheets':'Porteria en 0',
    'Team Draws':'Empates',
    'Team Lost': 'Derrotas',
    'Goals Conceded':' Goles Concedidos',
    'Team Wins':'Victorias',
    'Scoring Minutes':'Rango de Minutos de Goles Anotados',
    'Failed To Score':'Sin anotar Goles',
    'Number Of Goals': 'Rango de Cantidad de Goles( +0.5, +1.5)',
    'Both Teams To Score':'Ambos Equipos Anotan'
    // Agrega más traducciones para los otros tipos de estadísticas
  };
  
  constructor(private crudService:CrudService, private router:Router,private formBuilder:FormBuilder, private sportMonksService:SportmonksService){}
  
  ngOnInit():void{
    this.user = this.crudService.user
    console.log(this.user);
    
    this.crudService.read().subscribe((res)=>{
      this.preferences = res.preferences
      console.log(this.preferences);
      this.preferences.forEach(preference=>{
        this.id_teams.push(...preference.equipos)
      })
    })
    
    
    this.getStatsByUserPreferences()
    
  }

  getIconClass(typeId: number): string {
    if (typeId === 34) {
      return 'icon-corner';
    } else if (typeId === 45) {
      return 'icon-possession';
    } else if (typeId === 84) {
      return 'icon-yellow-card';
    } else if (typeId === 213 || typeId === 196 || typeId === 52 || typeId === 88 || typeId === 191 || typeId === 192){
      return 'icon-goal'
    }else if (typeId === 214){
      return 'icon-win'
    }else if (typeId === 216 ){
      return 'icon-lost'
    }else if (typeId === 194 || typeId === 575 ){
      return 'icon-cleansheets'
    }else if (typeId === 215 ){
      return 'icon-draw'
    }
    return '';
  }
  getStatsByUserPreferences() {
    this.user = this.crudService.user;
    this.crudService.read().subscribe((res) => {
      this.preferences = res.preferences;
      console.log(this.preferences);
      this.preferences.forEach((preference) => {
        this.id_teams.push(...preference.equipos);
      });
    });
  
    this.sportMonksService.getTeamForPreferences().subscribe((res: any) => {
      this.teams = res.data.statistics[0].details;
      console.log(this.teams);
  
      this.filteredPreferences = [];
  
      for (const preference of this.preferences) {
        for (const key in preference) {
          if (
            key !== '_id' &&
            key !== 'equipos' &&
            key !== 'creator' &&
            preference[key] !== 0 &&
            preference[key] !== null
          ) {
            this.filteredPreferences.push({
              attribute: key,
              value: preference[key],
            });
          }
        }
      }
      console.log(this.filteredPreferences);
  
      const matchingStatistics = this.filteredPreferences.filter((preference) => {
        return this.teams.some((statistic: any) => statistic.type_id === preference.value);
      });
      console.log(matchingStatistics);
  
      this.teamStatsByUser.splice(0); // Vaciar la lista teamStatsByUser
  
      matchingStatistics.forEach((preference) => {
        const matchingStatistic = this.teams.find(
          (statistic: any) => statistic.type_id === preference.value
        );
        // Aquí puedes mostrar la estadística coincidente
        this.teamStatsByUser.push(matchingStatistic);
      });
  
      console.log(this.teamStatsByUser);
    });
  }

  // onChange(event: Event, equipo: any) {
  //   const input = event.target as HTMLInputElement;
  //   if (input.checked) {
  //     this.equiposSeleccionados.push(equipo.id);
  //   } else {
  //     const index = this.equiposSeleccionados.indexOf(equipo.id);
  //     if (index !== -1) {
  //       this.equiposSeleccionados.splice(index, 1);
  //     }
  //   }
  // }


  refrescarPagina() {
    // Refresca la página
    location.reload();
  }

  
  delete(id:string){
    this.crudService.delete(id).subscribe(response=>{
      this.crudService.read().subscribe((res)=>{
        this.preferences = res.preferences
      })
    })
  }

  // updatePreference(idPreference:number){
  //   this.crudService.updatePreference(idPreference).subscribe(response=>{
  //     this.crudService.read().subscribe((res)=>{
  //       this.preferences = res.preferences
  //     })
  //   })
  // }

  updatePreference(idPreferencia: number) {
    this.user = this.crudService.user;
    const headers = {
      "x-auth-token": this.user.token
    };

    this.crudService.updatePreference(idPreferencia,headers).subscribe(
      (response) => {
        console.log(this.preferences);
        console.log(response);
        
        const flag = response.ok;
        if (flag === true) {
          Swal.fire({
            title: "Confirmar",
            text: "¿Estás seguro de quitar la preferencia?",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, quitar",
            cancelButtonText: "Cancelar"
          }).then(result => {
            if (result.isConfirmed) {
              // Se confirma la actualización de la preferencia
              this.getStatsByUserPreferences()
            }
          });
        } else {
          Swal.fire({
            title: "Error ...",
            text: response.msg,
            icon: "error"
          });
        }
      },
      error => {
        Swal.fire({
          title: "Error ...",
          text: "Error al eliminar la preferencia.",
          icon: "error"
        });
        console.log(error);
      }
    );
  
  }

  getPreferenceValues(preference: any): any[] {
    return Object.keys(preference).map(key => preference[key]);
  }

  obtenerPreferencias() {
    this.crudService.read().subscribe((res)=>{
      this.preferences = res.preferences
      console.log(this.preferences);
    })
  }
  

  logout(){
    localStorage.clear()
    this.router.navigateByUrl("/auth")
    this.refrescarPagina()
  }


  
//   user:any
//   preferences: Array<any> = []
//   miFormulario: FormGroup = this.formBuilder.group({
//     equipos: [],
//     corners:"",
//     over1_5goals:"",
//     yellow_cards:"",
//     goals_conceded_minutes:"",
//     goals:"",
//     cleansheets:"",
//     draw:"",
//     lost:"",
//     goals_conceded:"",
//     win:"",
//     scoring_goal_minutes:"",
//     failed_to_score:"",
//   })

//   teams:Datum[]=[]
//   equiposSeleccionados:number[]=[]


  
//   constructor(private crudService:CrudService, private router:Router,private formBuilder:FormBuilder, private sportMonksService:SportmonksService){
  
//   }

//   onChange(event: Event, equipo: any) {
//     const input = event.target as HTMLInputElement;
//     if (input.checked) {
//       this.equiposSeleccionados.push(equipo.id);
//     } else {
//       const index = this.equiposSeleccionados.indexOf(equipo.id);
//       if (index !== -1) {
//         this.equiposSeleccionados.splice(index, 1);
//       }
//     }
//   }

//   ngOnInit():void{
//     this.user = this.crudService.user
//     this.crudService.read().subscribe((res)=>{
//       this.preferences = res.preferences
//       console.log(this.preferences.length);
//     })
    

//     this.sportMonksService.getTeams().subscribe(data=>{
//       this.teams= data.data
//     })
//   }

//   refrescarPagina() {
//     // Refresca la página
//     location.reload();
//   }

//   create(){
//       const formValue = this.miFormulario.value
//       const data = {
//         equipos :this.equiposSeleccionados,
//         corners: formValue.corners,
//         over1_5goals: formValue.over1_5goals,
//         yellow_cards:formValue.yellow_cards,
//         goals_conceded_minutes:formValue.goals_conceded_minutes,
//         goals:formValue.goals,
//         cleansheets:formValue.cleansheets,
//         draw:formValue.draw,
//         lost:formValue.lost,
//         goals_conceded:formValue.goals_conceded,
//         win:formValue.win,
//         scoring_goal_minutes:formValue.scoring_goal_minutes,
//         failed_to_score:formValue.failed_to_score,
//       }
      
      
//       this.crudService.create(data).subscribe((response)=>{
//       this.equiposSeleccionados = []
//       this.miFormulario.reset()
      
//       this.crudService.read().subscribe((res)=>{
//       this.preferences = res.preferences
//       console.log(data); 
//     })
//   })
//   this.router.navigateByUrl("/home")
  
// }

//   delete(id:string){
//     this.crudService.delete(id).subscribe(response=>{
//       this.crudService.read().subscribe((res)=>{
//         this.preferences = res.preferences
//       })
//     })
//   }

//   logout(){
//     localStorage.clear()
//     this.router.navigateByUrl("/auth")
//     this.refrescarPagina()
//   }

  
}
