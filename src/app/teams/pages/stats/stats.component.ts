import { AfterViewInit, Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router'
import { SportmonksService } from 'src/app/services/sportmonks.service';
import Chart from 'chart.js/auto'
import { CrudService } from 'src/app/services/crud.service';
import { Datum } from 'src/app/interface/TeamsBySeason.interface';
import {Team} from 'src/app/interface/TeamInfo.interface'

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit{
  idEquipo!: any;
  stats: any;
  types: any[] =[]
  contador :any[]=[]
  extractedValues:any[]=[]
  user:any
  preferences: Array<any> = []
  preferences2:any
  public filteredPreferences: any[] = [];
  teamStatsByUser: any[] = [];
  mostrarGrafico= false;
  chart:Chart | undefined
  currentType!: number;
  showChartMap: { [key: number]: boolean } = {};
  graficos: Chart[] = [];
  showChartId: number | null = null;
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

  constructor(private route:ActivatedRoute, private sportMonksService:SportmonksService , private crudService:CrudService){}
 

  ngOnInit(): void {
    this.idEquipo=this.route.snapshot.params['id']
    // console.log(this.idEquipo);
    this.getStatsByTeamId(this.idEquipo)

    // this.generateBarChart()
    this.grafico2()
    this.getStatsByUserPreferences()
    this.getInfoByTeamId(this.idEquipo)
    
    
    // this.getNameStatsByTeamId(this.idEquipo)
    // this.showChart()
    
    
  }

  getInfoByTeamId(id:any){
    this.sportMonksService.getTeamById(id).subscribe((data:any)=>{
      this.team= data.data
      console.log(this.team);
    })
  }

  
  showChart(team: any, typeId: number) {
    this.showChartMap[typeId] = true;
  
    if (typeId === 196 || typeId === 213) {
      this.mostrarGrafico = true;
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
      this.mostrarGrafico = true;
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
                  // Título del gráfico
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

  getSubtitleText(item: any): string {
  if (item.type_id === 196 || item.type_id === 213 || item.type_id === 88 || item.type_id === 52) {
    return 'Total Goles';
  } else {
    return 'Total Partidos';
  }
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

  getStatsByUserPreferences(){
    this.user = this.crudService.user
    this.crudService.read().subscribe((res)=>{
      this.preferences2 = res.preferences
      // console.log(this.preferences2);
    })

    this.sportMonksService.getTeamsById(this.idEquipo).subscribe((res:any)=>{
      this.stats = res.data.statistics[0].details
      // console.log(this.stats);

    this.filteredPreferences = [];

    for (const preference of this.preferences2) {
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
            value: preference[key]
          });
        }
      }
    }
     console.log(this.filteredPreferences);
    
    const matchingStatistics = this.filteredPreferences.filter((preference) => {
      return this.stats.some(
        (statistic:any) => statistic.type_id === preference.value
        
      );
      
      
    });
     console.log(matchingStatistics);

    matchingStatistics.forEach((preference) => {
      const matchingStatistic = this.stats.find(
        (statistic:any) => statistic.type_id === preference.value
      );
      // Aquí puedes mostrar la estadística coincidente
      this.teamStatsByUser.push(matchingStatistic)
    });

    console.log(this.teamStatsByUser);


    })
  }


  

  getStatsByTeamId(value:any){
    this.user = this.crudService.user
    this.crudService.read().subscribe((res)=>{
      this.preferences = res.preferences  //preferencias del usuario
      // console.log(this.preferences);
    })

    this.sportMonksService.getTeamsById(value).subscribe((res:any)=>{
      this.stats = res.data.statistics[0].details // Estadisticas API segun equipo
      // console.log(this.stats); 
      // this.extractValues()

      
    })
  }

  
  extractValues() {
    this.stats.forEach((stat: any) => {
      const valueObject = stat.value;
  
      if (stat.type.name === "Conceded Scoring Minutes") {
        Object.keys(valueObject).forEach((key: string) => {
          const subObject = valueObject[key];
  
          if (subObject && subObject.hasOwnProperty("count")) {
            const value = subObject.count;
            const range = key;
  
            this.extractedValues.push({
              range: range,
              count: value
            });
          }
        });
      }
    });
  }


  

  
  generateBarChart(counts: any) {
    const canvas: HTMLCanvasElement | null = document.getElementById('myChart') as HTMLCanvasElement;
  
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        new Chart(ctx, {
          type: 'bar',
          data: {
            labels: ['0-15', '15-30', '30-45', '45-60', '60-75', '75-90'],
            datasets: [{
              label: 'Goles',
              data: counts,
              backgroundColor: 'rgba(75, 192, 192, 0.6)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1
            }]
          },
          options: {
            plugins: {
              title: {
                display: true,
                text: 'Gráfico de Goles Concedidos', // Título del gráfico
                font: {
                  size: 13
                }
              }
            },
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
        });
      }
    }
  }



// FUNCIONA
  grafico2():void{
    const labels = this.extractedValues.map((data:any) => data.range);
    const data = this.extractedValues.map((data) => data.count);

    const canvas = document.getElementById('myChart2') as HTMLCanvasElement;
    if(canvas){
      const myChart = new Chart(canvas, {
        type: 'bar',
        data: {
          labels: ['0-15', '15-30', '30-45', '45-60', '60-75','75-90'],
          datasets: [{
            label: 'Goles',
            data: [6,3,4,4,7,5],
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
              text: 'Rango de Goles Concedidos'
            }
          }
        }
      });
    }
  }


  //Poisson
calcularPoisson(lambda: number, k: number): number {
  const exponente = Math.exp(-lambda); //e'-LAMBDA
  const numerador = Math.pow(lambda, k); // LAMBDA 'ELEVADO a K
  const factorial = this.factorialRecursivo(k);
  return (exponente * numerador) / factorial;
}

factorialRecursivo(n: number): number {
  if (n === 0 || n === 1) {
    return 1;
  } else {
    return n * this.factorialRecursivo(n - 1);
  }
}
calcularProbabilidadGoles(lambda: number, k: number): number[] {
  const probabilidades: number[] = [];

  for (let i = 0; i <= k; i++) {
    const probabilidad = this.calcularPoisson(lambda, i);
    probabilidades.push(probabilidad);
  }

  const totalProbabilidades = probabilidades.reduce((a, b) => a + b, 0);
  const porcentajes: number[] = probabilidades.map((probabilidad) => (probabilidad / totalProbabilidades) * 100);

  return porcentajes;
}

mostrarPorcentajes(lambda: number, k: number): number[] {
  let contador = 1;
  return this.calcularProbabilidadGoles(lambda, k);

}
}
