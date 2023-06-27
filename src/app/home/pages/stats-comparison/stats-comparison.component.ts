import { Component,OnInit } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { SportmonksService } from 'src/app/services/sportmonks.service';

@Component({
  selector: 'app-stats-comparison',
  templateUrl: './stats-comparison.component.html',
  styleUrls: ['./stats-comparison.component.css']
})
export class StatsComparisonComponent implements OnInit {
  idEquipo1!:number
  idEquipo2!:number
  dataEquipo1:any
  dataEquipo2:any
  statistics: any[] = [];
  teamName1:any
  teamName2:any

  constructor(private route:ActivatedRoute , private sportMonksService:SportmonksService){

  }
  
  ngOnInit(): void {
    this.idEquipo1=this.route.snapshot.params['id1']
    this.idEquipo2=this.route.snapshot.params['id2']
    console.log(this.idEquipo1,this.idEquipo2);
    
     this.sportMonksService.getTeamsById(this.idEquipo1).subscribe((res:any)=>{
      this.teamName1 = res.data.name
      this.dataEquipo1= res.data
      console.log(this.dataEquipo1);
      
    })
    this.sportMonksService.getTeamsById(this.idEquipo2).subscribe((res:any)=>{
      this.teamName2 = res.data.name
      this.dataEquipo2= res.data
      console.log(this.dataEquipo2);

    })

    
    
  }
  
  getCorners(data: any): number {
    // Verificar si los datos existen y contienen estadísticas
    if (data && data.statistics[0]) {
      const cornerStatistic = data.statistics[0].details.find((stat: any) => stat.type_id === 34);
      if (cornerStatistic) {
        // Devolver el total de corners
        return cornerStatistic.value.average
      }
    }
    return 0; // Valor predeterminado si no se encuentra la estadística
  }

  getYellowCards(data: any): number {
    // Verificar si los datos existen y contienen estadísticas
    if (data && data.statistics[0]) {
      const yellowCardStatistic = data.statistics[0].details.find((stat: any) => stat.type_id === 84);
      if (yellowCardStatistic) {
        // Devolver el total de corners
        return yellowCardStatistic.value.average
      }
    }
    return 0; // Valor predeterminado si no se encuentra la estadística
  }

  getBallPossession(data: any): number {
    // Verificar si los datos existen y contienen estadísticas
    if (data && data.statistics[0]) {
      const ballPossessionStatistic = data.statistics[0].details.find((stat: any) => stat.type_id === 45);
      if (ballPossessionStatistic) {
        // Devolver el total de corners
        return ballPossessionStatistic.value.average
      }
    }
    return 0; // Valor predeterminado si no se encuentra la estadística
  }

  getGoalsConceded(data: any): number {
    // Verificar si los datos existen y contienen estadísticas
    if (data && data.statistics[0]) {
      const GoalsConcededStatistic = data.statistics[0].details.find((stat: any) => stat.type_id === 88);
      if (GoalsConcededStatistic) {
        // Devolver el total de corners
        return GoalsConcededStatistic.value.all.count
      }
    }
    return 0; // Valor predeterminado si no se encuentra la estadística
  }

  getScoringGoals(data: any): number {
    // Verificar si los datos existen y contienen estadísticas
    if (data && data.statistics[0]) {
      const ScoringGoalsStatistic = data.statistics[0].details.find((stat: any) => stat.type_id === 52);
      if (ScoringGoalsStatistic) {
        // Devolver el total de corners
        return ScoringGoalsStatistic.value.all.count
      }
    }
    return 0; // Valor predeterminado si no se encuentra la estadística
  }

  getBothTeamsToScore(data: any): number {
    // Verificar si los datos existen y contienen estadísticas
    if (data && data.statistics[0]) {
      const BothTeamsToScoreStatistic = data.statistics[0].details.find((stat: any) => stat.type_id === 192);
      if (BothTeamsToScoreStatistic) {
        // Devolver el total de corners
        return BothTeamsToScoreStatistic.value.all.count
      }
    }
    return 0; // Valor predeterminado si no se encuentra la estadística
  }

  getCleansheets(data: any): number {
    // Verificar si los datos existen y contienen estadísticas
    if (data && data.statistics[0]) {
      const CleansheetsStatistic = data.statistics[0].details.find((stat: any) => stat.type_id === 194);
      if (CleansheetsStatistic) {
        // Devolver el total de corners
        return CleansheetsStatistic.value.all.count
      }
    }
    return 0; // Valor predeterminado si no se encuentra la estadística
  }

  getFailedToScore(data: any): number {
    // Verificar si los datos existen y contienen estadísticas
    if (data && data.statistics[0]) {
      const FailedToScoreStatistic = data.statistics[0].details.find((stat: any) => stat.type_id === 575);
      if (FailedToScoreStatistic) {
        // Devolver el total de corners
        return FailedToScoreStatistic.value.all.count
      }
    }
    return 0; // Valor predeterminado si no se encuentra la estadística
  }

  getTeamDraws(data: any): number {
    // Verificar si los datos existen y contienen estadísticas
    if (data && data.statistics[0]) {
      const TeamDrawsStatistic = data.statistics[0].details.find((stat: any) => stat.type_id === 215);
      if (TeamDrawsStatistic) {
        // Devolver el total de corners
        return TeamDrawsStatistic.value.all.count
      }
    }
    return 0; // Valor predeterminado si no se encuentra la estadística
  }

  getTeamWins(data: any): number {
    // Verificar si los datos existen y contienen estadísticas
    if (data && data.statistics[0]) {
      const TeamWinsStatistic = data.statistics[0].details.find((stat: any) => stat.type_id === 214);
      if (TeamWinsStatistic) {
        // Devolver el total de corners
        return TeamWinsStatistic.value.all.count
      }
    }
    return 0; // Valor predeterminado si no se encuentra la estadística
  }

  getTeamLost(data: any): number {
    // Verificar si los datos existen y contienen estadísticas
    if (data && data.statistics[0]) {
      const TeamLostStatistic = data.statistics[0].details.find((stat: any) => stat.type_id === 216);
      if (TeamLostStatistic) {
        // Devolver el total de corners
        return TeamLostStatistic.value.all.count
      }
    }
    return 0; // Valor predeterminado si no se encuentra la estadística
  }

 
}
