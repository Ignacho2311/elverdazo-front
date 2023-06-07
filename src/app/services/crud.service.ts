import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  private _user:any = JSON.parse(localStorage.getItem("user")!)
  private baseUrl = environment.baseUrl


  get user(){
    return this._user
  }

  constructor(private httpClient:HttpClient) {}

  read(){
    const headers = {
      "x-auth-token":this.user.token
    }

    return this.httpClient.get<any>(`${this.baseUrl}/myaccount/readpreferences`,{headers})
  }


  delete(id:string){
    const headers = {
      "x-auth-token":this.user.token
    }

    return this.httpClient.delete<any>(`${this.baseUrl}/myaccount/deletepreferences/${id}`,{headers})
  }

  create(value:any){
    const headers = {
      "x-auth-token":this.user.token
    }
    return this.httpClient.post<any>(`${this.baseUrl}/myaccount/createpreferences/`,{equipos:value.equipos,corners:value.corners,ball_possession:value['ball-possesion'],yellow_cards:value.yellowcards,goals_conceded_minutes:value['conceded-scoring-minutes'],goals:value.goals,cleansheets:value.cleansheets,draw:value['team-draws'],lost:value['team-lost'],goals_conceded:value['goals-conceded'],win:value['team-wins'],scoring_goal_minutes:value['scoring-minutes'],failed_to_score:value['failed-toscore'],number_of_goals:value['number-of-goals'],both_teams_to_score:value.btts},{headers})
  }
}
