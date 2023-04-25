import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TeamsBySeason } from '../interface/TeamsBySeason.interface';

@Injectable({
  providedIn: 'root'
})
export class SportmonksService {
  // private token= '5CmvZkaC2QfE3LM0OP8c1mX1uCQrN43nbHNuLSiltjWucCjLw1CBwSDsuHd4'
  constructor(private _http:HttpClient) { }

  getTeams():Observable<any>{
    return this._http.get<any>("api/football/teams/seasons/19686")
  }
}
