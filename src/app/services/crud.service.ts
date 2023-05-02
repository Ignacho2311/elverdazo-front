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
    return this.httpClient.post<any>(`${this.baseUrl}/myaccount/createpreferences/`,{equipos:value.equipos,corners:value.corners,over1_5goals:value.over1_5goals,yellow_cards:value.yellow_cards,goals_conceded_minutes:value.goals_conceded_minutes,goals:value.goals,cleansheets:value.cleansheets,draw:value.draw,lost:value.lost,goals_conceded:value.goals_conceded,win:value.win,scoring_goal_minutes:value.scoring_goal_minutes,failed_to_score:value.failed_to_score},{headers})
  }
}
