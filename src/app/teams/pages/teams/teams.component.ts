import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CrudService } from 'src/app/services/crud.service';
import { SportmonksService } from 'src/app/services/sportmonks.service';
import Chart from 'chart.js/auto'
import Swal from 'sweetalert2';


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
    dataEquipos: any[] = [];
    equiposFavoritos:any[]= []
    idsEquiposFavoritos:Array<any> = []

    constructor(private crudService:CrudService, private router:Router, private sportMonksService:SportmonksService ){}

    
    ngOnInit():void{
      this.obtenerEquiposFavoritos()
      
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
      this.router.navigate(['/teams/stats', value]);
      // this.sportMonksService.getTeamsById(value).subscribe((res)=>{
      //   this.stats = res.data.statistics[0].details
      //   console.log(this.stats);
      // })
    }

  //   grafico():void{
  //     const canvas = document.getElementById('myChart') as HTMLCanvasElement;
  //     if(canvas){
  //       const myChart = new Chart(canvas, {
  //         type: 'bar',
  //         data: {
  //           labels: ['0-15', '15-30', '30-45', '45-60', '60-75','75-90'],
  //           datasets: [{
  //             label: 'Goles',
  //             data: [6,3,4,4,7,5],
  //             backgroundColor: [
  //               'rgba(255, 99, 132, 0.2)',
  //               'rgba(54, 162, 235, 0.2)',
  //               'rgba(255, 206, 86, 0.2)',
  //               'rgba(75, 192, 192, 0.2)',
  //               'rgba(153, 102, 255, 0.2)'
  //             ],
  //             borderColor: [
  //               'rgba(255, 99, 132, 1)',
  //               'rgba(54, 162, 235, 1)',
  //               'rgba(255, 206, 86, 1)',
  //               'rgba(75, 192, 192, 1)',
  //               'rgba(153, 102, 255, 1)'
  //             ],
  //             borderWidth: 1
  //           }]
  //         },
  //         options: {
  //           scales: {
  //             y: {
  //               beginAtZero: true
  //             }
  //           },
  //           plugins: {
  //             title: {
  //               display: true,
  //               text: 'Rango de Goles Concedidos'
  //             }
  //           }
  //         }
  //       });
  //     }
  // }

  obtenerEquiposFavoritos() {
    this.crudService.read().subscribe(
      (res) => {
        this.idsEquiposFavoritos = [];
        res.preferences.forEach((preference: any) => {
          this.idsEquiposFavoritos.push(...preference.equipos);
        });
        this.actualizarEquiposFavoritos();
      },
      (error) => {
        console.log(error);
      }
    );
  }
  
  private actualizarEquiposFavoritos() {
    this.sportMonksService.getTeams().subscribe(
      (data) => {
        this.dataEquipos = data.data;
        this.equiposFavoritos = this.dataEquipos.filter((equipo) =>
          this.idsEquiposFavoritos.includes(equipo.id)
        );
      },
      (error) => {
        console.log(error);
      }
    );
  }
  

  deleteTeam(idTeam: number) {
    this.crudService.deleteTeam(idTeam).subscribe(
      response => {
        const flag = response.ok;
        if (flag === true) {
          Swal.fire({
            title: "Confirmar",
            text: "¿Estás seguro de eliminar el equipo?",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "Cancelar"
          }).then(result => {
            if (result.isConfirmed) {
              // Se confirma la eliminación del equipo
              this.obtenerEquiposFavoritos() 
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
          text: "Es necesario que exista al menos un equipo registrado en las preferencias.",
          icon: "error"
        });
        console.log(error);
      }
    );
  }
  
  
  

  // obtenerEquiposActualizados(): void {
  //   this.crudService.obtenerEquipos().subscribe(
  //     (response) => {
  //       // Actualiza la lista de equipos favoritos con la respuesta obtenida
  //       this.equiposFavoritos = response.equipos;
  //     },
  //     (error) => {
  //       console.error('Error al obtener la lista de equipos:', error);
  //     }
  //   );
  // }

  // eliminarEquipo(idEquipo: number): void {
  //   // Lógica para eliminar el equipo

  //   // Luego de eliminar el equipo, llama al método para obtener la lista de equipos actualizada
  //   this.obtenerEquiposActualizados();
  // }
}
