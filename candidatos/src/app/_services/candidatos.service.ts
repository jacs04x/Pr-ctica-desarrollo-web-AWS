import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Candidato} from '../_models/candidato'

@Injectable({
  providedIn: 'root'
})
export class CandidatosService {

  constructor(private httpClient: HttpClient) { }

  getCandidatos(){
    return this.httpClient.get("/UAT/all")
  }

  getCandidato(id:number){
    return this.httpClient.get("UAT/get?id="+id)
  }

  updateCandidato(candidato: Candidato){
    return this.httpClient.patch("/UAT/update", candidato)
  }

}



