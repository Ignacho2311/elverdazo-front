import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SportmonksService } from 'src/app/services/sportmonks.service';
import Chart from 'chart.js/auto'
import { Team } from 'src/app/interface/TeamInfo.interface';

@Component({
  selector: 'app-team-statistics',
  templateUrl: './team-statistics.component.html',
  styleUrls: ['./team-statistics.component.css']
})
export class TeamStatisticsComponent implements OnInit {

  idEquipo!:number
  stats:any
  showChartMap: { [key: number]: boolean } = {};
  team:Team={
    id: 1,
    sport_id: 1,
    country_id: 1,
    venue_id: 1,
    gender: '',
    name: '',
    short_code: '',
    image_path: '',
    founded: 1,
    type: '',
    placeholder: false,
    last_played_at: new Date()
  };


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

  constructor(private route: ActivatedRoute, private sportMonksService:SportmonksService){}

  ngOnInit(): void {
    this.idEquipo=this.route.snapshot.params['id']
    console.log(this.idEquipo);

    this.sportMonksService.getTeamsById(this.idEquipo).subscribe((res:any)=>{
      this.stats= res.data.statistics[0].details
      console.log(this.stats);
      this.getInfoByTeamId(this.idEquipo)
    })
    // if(this.idEquipo===2447 || this.idEquipo===2650 || this.idEquipo===2394 || this.idEquipo===1789 || this.idEquipo===211 || this.idEquipo===1020 || this.idEquipo===2356 || this.idEquipo===939 || this.idEquipo===86 || this.idEquipo===85 || this.idEquipo===293 || this.idEquipo===2905){
      
    // }
    // if(this.idEquipo===309 || this.idEquipo===180 || this.idEquipo===273 || this.idEquipo===66 || this.idEquipo===53 || this.idEquipo===258 || this.idEquipo===314 || this.idEquipo===62 || this.idEquipo===246 || this.idEquipo===282 || this.idEquipo===496 || this.idEquipo===734){
      
    // }

    this.sportMonksService.getTeamsById2(this.idEquipo).subscribe((res:any)=>{
      this.stats= res.data.statistics[0].details
      console.log(this.stats);
      this.getInfoByTeamId(this.idEquipo)
    })
    
    
  }

  getInfoByTeamId(id:any){
    this.sportMonksService.getTeamById(id).subscribe((data:any)=>{
      this.team= data.data
      console.log(this.team);
    })
  }

  getSubtitleText(item: any): string {
    if (item.type_id === 196 || item.type_id === 213 || item.type_id === 88 || item.type_id === 52) {
      return 'Total Goles';
    } else {
      return 'Total Partidos';
    }
    }

    getCustomCount(item: any): number {
      let sum = 0;
      if (item.type_id === 196 || item.type_id === 213) {
        for (const key in item.value) {
          if (item.value.hasOwnProperty(key) && item.value[key].count) {
            sum += item.value[key].count;
          }
        }
      }
        return sum;
    }

    showChart(team: any, typeId: number) {
      this.showChartMap[typeId] = true;
    
      if (typeId === 196 || typeId === 213) {
        const counts = Object.values(team.value).map((item: any) => item.count);
        const name = team.type.name;
        const canvasId = `myChart${typeId}`;
        const canvas: HTMLCanvasElement | null = document.getElementById(canvasId) as HTMLCanvasElement;
    
        if (canvas) {
          const ctx = canvas.getContext('2d');
          if (ctx) {
            // Verificar si ya existe un gráfico en el canvas
            const chartInstance = Chart.getChart(canvas);
            if (chartInstance) {
              chartInstance.destroy(); // Destruir el gráfico existente
            }
    
            // Mostrar el canvas nuevamente
            canvas.style.display = 'block';
            canvas.style.height = '265px'
            new Chart(ctx, {
              type: 'bar',
              data: {
                labels: ['0-15', '15-30', '30-45', '45-60', '60-75', '75-90'],
                datasets: [
                  {
                    label: 'Goles',
                    data: counts,
                    backgroundColor: 'rgba(75, 192, 192, 0.6)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1,
                  },
                ],
              },
              options: {
                plugins: {
                  title: {
                    display: true,
                    // text: name, // Título del gráfico
                    font: {
                      size: 13,
                    },
                  },
                },
                scales: {
                  y: {
                    beginAtZero: true,
                  },
                },
              },
            });
          }
        }
      }
    
      if (
  
        typeId === 88 ||
        typeId === 52
      ) {
        const countsHome = team.value.home.count;
        const countsAway = team.value.away.count;
        const counts = [countsHome, countsAway];
        const name = team.type.name;
        const canvasId = `myChart${typeId}`;
        const canvas: HTMLCanvasElement | null = document.getElementById(canvasId) as HTMLCanvasElement;
    
        if (canvas) {
          const ctx = canvas.getContext('2d');
          if (ctx) {
            // Verificar si ya existe un gráfico en el canvas
            const chartInstance = Chart.getChart(canvas);
            if (chartInstance) {
              chartInstance.destroy(); // Destruir el gráfico existente
            }
    
            // Mostrar el canvas nuevamente
            canvas.style.display = 'block';
  
            new Chart(ctx, {
              type: 'pie',
              data: {
                labels: ['Local', 'Visita'],
                datasets: [
                  {
                    label: 'Goles',
                    data: counts,
                    backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(255, 99, 132, 0.6)'], // Asignar colores diferentes a cada sección
                    borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)'], // Asignar colores del borde correspondientes
                    borderWidth: 1,
                  },
                ],
              },
              options: {
                plugins: {
                  title: {
                    display: true,
                    // text: name, // Título del gráfico
                    font: {
                      size: 13,
                    },
                  },
                },
                scales: {
                  y: {
                    display: false,
                  },
                },
              },
            });
          }
        } else {
          console.log("NO PASa NAA");
        }
      }
  
      if (
        typeId === 194 ||
        typeId === 215 ||
        typeId === 216 ||
        typeId === 214 ||
        typeId === 575 ||
        typeId === 192 
      ) {
        const countsHome = team.value.home.count;
        const countsAway = team.value.away.count;
        const counts = [countsHome, countsAway];
        const name = team.type.name;
        const canvasId = `myChart${typeId}`;
        const canvas: HTMLCanvasElement | null = document.getElementById(canvasId) as HTMLCanvasElement;
    
        if (canvas) {
          const ctx = canvas.getContext('2d');
          if (ctx) {
            // Verificar si ya existe un gráfico en el canvas
            const chartInstance = Chart.getChart(canvas);
            if (chartInstance) {
              chartInstance.destroy(); // Destruir el gráfico existente
            }
    
            // Mostrar el canvas nuevamente
            canvas.style.display = 'block';
  
            new Chart(ctx, {
              type: 'pie',
              data: {
                labels: ['Local', 'Visita'],
                datasets: [
                  {
                    label: 'Partidos',
                    data: counts,
                    backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(255, 99, 132, 0.6)'], // Asignar colores diferentes a cada sección
                    borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)'], // Asignar colores del borde correspondientes
                    borderWidth: 1,
                  },
                ],
              },
              options: {
                plugins: {
                  title: {
                    display: true,
                    // text: name, // Título del gráfico
                    font: {
                      size: 13,
                    },
                  },
                },
                scales: {
                  y: {
                    display: false,
                  },
                },
              },
            });
          }
        } else {
          console.log("NO PASa NAA");
        }
      }
  
  
  
      if (typeId === 196 || typeId === 213) {
        const counts = Object.values(team.value).map((item: any) => item.count);
        const name = team.type.name;
        const canvasId = `myChart${typeId}`;
        const canvas: HTMLCanvasElement | null = document.getElementById(canvasId) as HTMLCanvasElement;
    
        if (canvas) {
          const ctx = canvas.getContext('2d');
          if (ctx) {
            // Verificar si ya existe un gráfico en el canvas
            const chartInstance = Chart.getChart(canvas);
            if (chartInstance) {
              chartInstance.destroy(); // Destruir el gráfico existente
            }
    
            // Mostrar el canvas nuevamente
            canvas.style.display = 'block';
            canvas.style.height = '300px'
            new Chart(ctx, {
              type: 'bar',
              data: {
                labels: ['0-15', '15-30', '30-45', '45-60', '60-75', '75-90'],
                datasets: [
                  {
                    label: 'Goles',
                    data: counts,
                    backgroundColor: 'rgba(75, 192, 192, 0.6)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1,
                  },
                ],
              },
              options: {
                plugins: {
                  title: {
                    display: true,
                    // text: name, // Título del gráfico
                    font: {
                      size: 13,
                    },
                  },
                },
                scales: {
                  y: {
                    beginAtZero: true,
                  },
                },
              },
            });
          }
        }
      }
    
      if (typeId === 191) {
        const countsMatches = Object.values(team.value).map((item: any) => item.matches.count);
        const countsTeam = Object.values(team.value).map((item: any) => item.team.count);
      
        const name = team.type.name;
        const canvasId = `myChart${typeId}`;
        const canvas: HTMLCanvasElement | null = document.getElementById(canvasId) as HTMLCanvasElement;
      
        if (canvas) {
          const ctx = canvas.getContext('2d');
          if (ctx) {
            // Verificar si ya existe un gráfico en el canvas
            const chartInstance = Chart.getChart(canvas);
            if (chartInstance) {
              chartInstance.destroy(); // Destruir el gráfico existente
            }
      
            // Mostrar el canvas nuevamente
            canvas.style.display = 'block';
            canvas.style.height = '300px'
            new Chart(ctx, {
              type: 'bar',
              data: {
                labels: ['+0.5 Gol', '+1.5 Gol', '+2.5 Gol', '+3.5 Gol', '+4.5 Gol', '+5.5 Gol'],
                datasets: [
                  {
                    label: 'Partidos',
                    data: countsMatches,
                    backgroundColor: 'rgba(75, 192, 192, 0.6)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1,
                  },
                  {
                    label: 'Equipo',
                    data: countsTeam,
                    backgroundColor: 'rgba(255, 99, 132, 0.6)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1,
                  },
                ],
              },
              options: {
                plugins: {
                  title: {
                    display: true,
                    // text: name, // Título del gráfico
                    font: {
                      size: 13,
                    },
                  },
                },
                scales: {
                  y: {
                    beginAtZero: true,
                  },
                },
              },
            });
          }
        }
      }
      
      
  
    }

    closeChart(typeId: number) {
      const chartId = `myChart${typeId}`;
      const canvas: HTMLCanvasElement | null = document.getElementById(chartId) as HTMLCanvasElement;
    
      if (canvas) {
        canvas.style.display = 'none';
      }
      
      this.showChartMap[typeId] = false;
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

    
  // this.idEquipo=this.route.snapshot.params['id']
}
