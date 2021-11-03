import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Candidato} from '../_models/candidato'

@Injectable({
  providedIn: 'root'
})
export class CandidatosService {

  API_URL =  "https://9h4uugy0hj.execute-api.us-east-2.amazonaws.com/"



  constructor(private httpClient: HttpClient) { }

  getCandidatos(){
    let headers = new HttpHeaders({
      'Access-Control-Allow-Headers' : 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
      'Access-Control-Allow-Origin' : '*',
      'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS'
    })
    
    return this.httpClient.get(this.API_URL+"/UAT/all", {headers})
  }

  updateCandidato(candidato: Candidato){
    return this.httpClient.patch(this.API_URL+"UAT2/update", candidato)
  }

}



