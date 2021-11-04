import { Component, OnInit } from '@angular/core';
import {CandidatosService} from '../../_services/candidatos.service'
import {Candidato} from '../../_models/candidato'

declare var $:any

@Component({
  selector: 'app-candidatos',
  templateUrl: './candidatos.component.html',
  styleUrls: ['./candidatos.component.css']
})
export class CandidatosComponent implements OnInit {

  candidatos : Candidato [] | any

  constructor(private candidatosService: CandidatosService) { }

  ngOnInit(): void {

    this.getCandidatos()

  }
  getCandidatos(){
    this.candidatosService.getCandidatos().subscribe(
      res => {
        this.candidatos=res
        console.log(this.candidatos)
      },
      err => {
        console.log("algo salio mal al consultar los candidatos")
      }
    )
  }
}
