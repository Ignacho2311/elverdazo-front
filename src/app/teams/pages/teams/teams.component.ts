import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CrudService } from 'src/app/services/crud.service';
import { SportmonksService } from 'src/app/services/sportmonks.service';
import Chart from 'chart.js/auto'

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit {
    user:any
    preferences: Array<any> = []
    id_teams:Array<any> = []
    stats:any

    constructor(private crudService:CrudService, private router:Router, private sportMonksService:SportmonksService ){}

    
    ngOnInit():void{
      this.user = this.crudService.user
      this.crudService.read().subscribe((res)=>{
        res.preferences.forEach((preference:any)=>{
          this.id_teams.push(...preference.equipos)
        })
      })
    }

    refrescarPagina() {
      // Refresca la página
      location.reload();
    }

    logout(){
      localStorage.clear()
      this.router.navigateByUrl("/auth")
      this.refrescarPagina()
    }

    getStatsByTeamId(value:any){
      this.sportMonksService.getTeamsById(value).subscribe((res)=>{
        this.stats = res.data.statistics[0].details
        console.log(this.stats);
      })
    }

    grafico():void{
      const canvas = document.getElementById('myChart') as HTMLCanvasElement;
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
}
