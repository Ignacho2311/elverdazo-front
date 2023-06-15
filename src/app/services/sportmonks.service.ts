import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Datum } from '../interface/TeamsBySeason.interface';

@Injectable({
  providedIn: 'root'
})
export class SportmonksService {
  // private token= '5CmvZkaC2QfE3LM0OP8c1mX1uCQrN43nbHNuLSiltjWucCjLw1CBwSDsuHd4'
  constructor(private _http:HttpClient) { }

  getTeams():Observable<any>{
    return this._http.get<any>("api/football/teams/seasons/19686")
  }

  getTeamForPreferences():Observable<any>{
    return this._http.get<any>(`api/football/teams/85?include=statistics.details.type&filters=teamStatisticSeasons:19686`)
  }

  getTeamsById(id:any):Observable<any>{
    return this._http.get<any>(`api/football/teams/${id}?include=statistics.details.type&filters=teamStatisticSeasons:19686`)
  }

  getTeamById(id:any):Observable<Datum>{
    return this._http.get<Datum>(`api/football/teams/${id}`)
  }
}
