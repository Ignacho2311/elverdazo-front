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

  getFixtureByDate():Observable<any>{
    return this._http.get<any>(`api/football/fixtures/date/2023-06-09?include=participants`)
  }
  getTeamsStatisticsBySeason():Observable<any>{
    return this._http.get<any>("api/football/teams/seasons/19686?include=statistics.details.type&filters=teamstatisticSeasons:19686")
  }
 
  getSeasonStats():Observable<any>{
    return this._http.get<any>("api/football/seasons/19686?include=statistics")
  }

   // LIGA ESCOCIA 
  getTeamsStatisticsBySeason2():Observable<any>{
    return this._http.get<any>("api/football/teams/seasons/19735?include=statistics.details.type&filters=teamstatisticSeasons:19735")
  }

  getTeams2():Observable<any>{
    return this._http.get<any>("api/football/teams/seasons/19735")
  }

  getSeasonStats2():Observable<any>{
    return this._http.get<any>("api/football/seasons/19735?include=statistics")
  }

  getTeamsById2(id:any):Observable<any>{
    return this._http.get<any>(`api/football/teams/${id}?include=statistics.details.type&filters=teamStatisticSeasons:19735`)
  }
}
