import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CrudService } from 'src/app/services/crud.service';
import { SportmonksService } from 'src/app/services/sportmonks.service';
import {Datum, TeamsBySeason} from 'src/app/interface/TeamsBySeason.interface'
import { Statistic } from 'src/app/interface/teamStats.interface';
import Chart from 'chart.js/auto'


@Component({
  selector: 'app-home-account',
  templateUrl: './home-account.component.html',
  styleUrls: ['./home-account.component.css']
})
export class HomeAccountComponent implements OnInit {
  
  // id_teams:Array<any>=[]
  // user:any
  // id:any
  // preferences: Array<any> = []
  // miFormulario: FormGroup = this.formBuilder.group({
  //   equipos: [],
  //   corners:"",
  //   over1_5goals:"",
  //   yellow_cards:""
  // })
  // teams:Datum[]=[]
  // equiposSeleccionados:number[]=[]

  teams:any
  idTeam1:any
  idTeam2:any
  locationTeam1:any
  locationTeam2:any
  image1:any
  image2:any
  seasonStats:any
  data:any
  AVGYellowCards: any;
  nameLeague: any;
  cornerStats!: any[];
  cardStats!: any[];
  viewTeam: boolean = false
  teamsBySeason:any
  team1: any;
  team2: any;

  constructor(private sportMonksService:SportmonksService, private router:Router){
  
  }

  ngOnInit():void{
    this.sportMonksService.getFixtureByDate().subscribe((res)=>{
      this.idTeam1 = res.data[0].participants[0].id
      this.idTeam2 = res.data[0].participants[1].id
      this.team1 = res.data[0].participants[0].name
      this.team2 = res.data[0].participants[1].name
      this.locationTeam1 = res.data[0].participants[0].location
      this.locationTeam2 = res.data[0].participants[1].location
      this.image1= res.data[0].participants[0].image_path
      this.image2= res.data[0].participants[1].image_path


    })

    this.graficoPromedioCorners()
    this.graficoPromedioGolesAnotados()
    this.graficoPromedioTarjetasAmarillas()
    // this.getTopCornersAverage()
    this.getSeasonStats()

    this.sportMonksService.getTeams().subscribe((res)=>{
      this.teamsBySeason= res.data
      console.log(this.teamsBySeason);
      
    })
  }

  verEstadisticas(teamId:any){
    this.router.navigate(['/home/team-stats', teamId]);
  }
  verEstadisticasEquipos(team1:any,team2:any){
    this.router.navigate(['/home/stats-comparison', team1,team2]);

  }

  viewTeams(){
    this.viewTeam = true

  }

  closeTeams(){
    this.viewTeam = false

  }

  // getTopCornersAverage() {
  //   this.sportMonksService.getTeamsStatisticsBySeason().subscribe((res) => {
  //     const data = res.data;
  //     const promediosCorners: { equipo: string, promedio: number }[] = [];
  
  //     // Iterar sobre los datos de los equipos
  //     data.forEach((team: any) => {
  //       team.statistics.forEach((statistic: any) => {
  //         const cornerStatistic = statistic.details.find((detail: any) => detail.type_id === 34);
  
  //         if (cornerStatistic && cornerStatistic.value.average) {
  //           const equipo = team.name;
  //           const promedio = cornerStatistic.value.average;
  //           promediosCorners.push({ equipo, promedio });
  //         }
  //       });
  //     });
  
  //     // Ordenar los promedios de forma descendente
  //     promediosCorners.sort((a, b) => b.promedio - a.promedio);
  
  //     // Obtener los 5 mayores promedios
  //     const top5Promedios = promediosCorners.slice(0, 5);
  
  //     console.log(top5Promedios); // Puedes mostrar los 5 mayores promedios en la consola o asignarlos a una variable en tu componente
  //   });
  // }
  
  


  graficoPromedioCorners(): void {
    this.sportMonksService.getTeamsStatisticsBySeason().subscribe((res) => {
      const data = res.data;
      const promediosCorners: { equipo: string, promedio: number }[] = [];
  
      // Iterar sobre los datos de los equipos
      data.forEach((team: any) => {
        team.statistics.forEach((statistic: any) => {
          const cornerStatistic = statistic.details.find((detail: any) => detail.type_id === 34);
  
          if (cornerStatistic && cornerStatistic.value.average) {
            const equipo = team.name;
            const promedio = cornerStatistic.value.average;
            promediosCorners.push({ equipo, promedio });
          }
        });
      });
  
      // Ordenar los promedios de forma descendente
      promediosCorners.sort((a, b) => b.promedio - a.promedio);
  
      // Obtener los 5 mayores promedios
      const top5Promedios = promediosCorners.slice(0, 5);
  
      console.log(top5Promedios); // Puedes mostrar los 5 mayores promedios en la consola o asignarlos a una variable en tu componente
  
      const canvas = document.getElementById('Corners') as HTMLCanvasElement;
      if (canvas) {
        canvas.style.height = '300px';
  
        const labels = top5Promedios.map((promedio) => promedio.equipo);
        const data = top5Promedios.map((promedio) => promedio.promedio);
  
        const myChart = new Chart(canvas, {
          type: 'bar',
          data: {
            labels: labels,
            datasets: [{
              label: 'Promedio Tiros de Esquina',
              data: data,
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)'
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)'
              ],
              borderWidth: 1
            }]
          },
          options: {
            scales: {
              y: {
                beginAtZero: true
              }
            },
            plugins: {
              title: {
                display: true,
                text: 'Promedio de Tiros de Esquina'
              }
            }
          }
        });
      }
    });
  }


  graficoPromedioGolesAnotados(): void {
    this.sportMonksService.getTeamsStatisticsBySeason().subscribe((res) => {
      const data = res.data;
      const promediosGoles: { equipo: string, promedio: number }[] = [];
  
      // Iterar sobre los datos de los equipos
      data.forEach((team: any) => {
        team.statistics.forEach((statistic: any) => {
          const goalStatistic = statistic.details.find((detail: any) => detail.type_id === 52);
  
          if (goalStatistic && goalStatistic.value.all && goalStatistic.value.all.average) {
            const equipo = team.name;
            const promedio = goalStatistic.value.all.average;
            promediosGoles.push({ equipo, promedio });
          }
        });
      });
  
      // Ordenar los promedios de forma descendente
      promediosGoles.sort((a, b) => b.promedio - a.promedio);
  
      // Obtener los 5 mayores promedios
      const top5Promedios = promediosGoles.slice(0, 5);
  
      console.log(top5Promedios); // Puedes mostrar los 5 mayores promedios en la consola o asignarlos a una variable en tu componente
  
      const canvas = document.getElementById('GolesAnotados') as HTMLCanvasElement;
      if (canvas) {
        canvas.style.height = '300px';
  
        const labels = top5Promedios.map((promedio) => promedio.equipo);
        const data = top5Promedios.map((promedio) => promedio.promedio);
  
        const myChart = new Chart(canvas, {
          type: 'bar',
          data: {
            labels: labels,
            datasets: [{
              label: 'Goles',
              data: data,
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)'
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)'
              ],
              borderWidth: 1
            }]
          },
          options: {
            scales: {
              y: {
                beginAtZero: true
              }
            },
            plugins: {
              title: {
                display: true,
                text: 'Goles Anotados'
              }
            }
          }
        });
      }
    });
  }

  graficoPromedioTarjetasAmarillas(): void {
    this.sportMonksService.getTeamsStatisticsBySeason().subscribe((res) => {
      const data = res.data;
      const promediosTarjetas: { equipo: string, promedio: number }[] = [];
  
      // Iterar sobre los datos de los equipos
      data.forEach((team: any) => {
        team.statistics.forEach((statistic: any) => {
          const yellowCardStatistic = statistic.details.find((detail: any) => detail.type_id === 84);
  
          if (yellowCardStatistic && yellowCardStatistic.value.average) {
            const equipo = team.name;
            const promedio = yellowCardStatistic.value.average;
            promediosTarjetas.push({ equipo, promedio });
          }
        });
      });
  
      // Ordenar los promedios de forma descendente
      promediosTarjetas.sort((a, b) => b.promedio - a.promedio);
      const promedios = promediosTarjetas
      // Obtener los 5 mayores promedios
      const top5Promedios = promediosTarjetas.slice(0, 5);
  
      console.log(top5Promedios); // Puedes mostrar los 5 mayores promedios en la consola o asignarlos a una variable en tu componente
      console.log(promedios);
      
      const canvas = document.getElementById('TarjetasAmarillas') as HTMLCanvasElement;
      if (canvas) {
        canvas.style.height = '300px';
  
        const labels = top5Promedios.map((promedio) => promedio.equipo);
        const data = top5Promedios.map((promedio) => promedio.promedio);
  
        const myChart = new Chart(canvas, {
          type: 'bar',
          data: {
            labels: labels,
            datasets: [{
              label: 'Tarjetas Amarillas',
              data: data,
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)'
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)'
              ],
              borderWidth: 1
            }]
          },
          options: {
            scales: {
              y: {
                beginAtZero: true
              }
            },
            plugins: {
              title: {
                display: true,
                text: 'Tarjetas Amarillas'
              }
            }
          }
        });
      }
    });
  }
  
  getSeasonStats(){
    this.sportMonksService.getSeasonStats().subscribe((res)=>{
      this.seasonStats = res.data.statistics
      this.nameLeague = res.data.name
      console.log(this.seasonStats);
      this.cornerStats = this.extractStatistics(this.seasonStats);
      this.cardStats = this.extractStatistics2(this.seasonStats);
      
    })
  }

  extractStatistics(statistics: any[]) {
    const cornerStats = [];
  
    for (const stat of statistics) {
      if (stat.type_id === 34) {
        const value = stat.value.count;
        const teamName = stat.value.team_most_corners_name;
  
        // Guarda los valores en la variable cornerStats
        cornerStats.push({
          count: value,
          teamName: teamName
        });
      }
    }
  
    return cornerStats;
  }

  extractStatistics2(statistics: any[]) {
    const cardStats:any[] =[]

    for (const stat of statistics) {
      if (stat.type_id === 193 ) {
        const totalYellowcards = stat.value.yellowcards;
        const totalRedCards = stat.value.redcards;
        const AVGYellowCards = stat.value.average_yellowcards;

      // Guarda los valores en la variable cardStats
      cardStats.push({
        totalYellowcards: totalYellowcards,
        totalRedCards: totalRedCards,
        AVGYellowCards: AVGYellowCards
      });
        
      }
    }
    return cardStats
  }


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

    // this.user = this.crudService.user
    // this.crudService.read().subscribe((res)=>{
    //   this.preferences = res.preferences
    //   console.log(this.preferences);
    //   this.preferences.forEach(preference=>{
    //     this.id_teams.push(...preference.equipos)
    //   })
    // })
    
    
    // this.sportMonksService.getTeams().subscribe(data=>{
    //   this.teams= data.data
    //   console.log(this.teams);
    // })

  // mostrarEquipos(){
  //   this.crudService.read().subscribe((res)=>{
  //     this.preferences = res.preferences
  //     console.log(this.preferences);
  //     this.preferences.forEach(preference=>{
  //       preference.equipos.forEach((equipo:any)=>{
  //         console.log(equipo);
  //       })
  //     })
  //   })
  // }

  // refrescarPagina() {
  //   // Refresca la página
  //   location.reload();
  // }

//   create(){
//       const formValue = this.miFormulario.value
//       const data = {
//         equipos :this.equiposSeleccionados,
//         corners: formValue.corners,
//         over1_5goals: formValue.over1_5goals,
//         yellow_cards:formValue.yellow_cards
//       }
      
      
//       this.crudService.create(data).subscribe((response)=>{
//       this.equiposSeleccionados = []
//       this.miFormulario.reset()
      
//       this.crudService.read().subscribe((res)=>{
//       this.preferences = res.preferences
//       console.log(data); 
//     })
//   })
  
  
// }

  // delete(id:string){
  //   this.crudService.delete(id).subscribe(response=>{
  //     this.crudService.read().subscribe((res)=>{
  //       this.preferences = res.preferences
  //     })
  //   })
  // }

  // logout(){
  //   localStorage.clear()
  //   this.router.navigateByUrl("/auth")
  //   this.refrescarPagina()
  // }


  