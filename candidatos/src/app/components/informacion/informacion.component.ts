import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { CandidatosService } from '../../_services/candidatos.service'
import {Candidato} from '../../_models/candidato'
import Swal from 'sweetalert2'
declare var $: any

@Component({
  selector: 'app-informacion',
  templateUrl: './informacion.component.html',
  styleUrls: ['./informacion.component.css']
})
export class InformacionComponent implements OnInit {

  id: number;
  candidato: Candidato [] | any
  habilidades = [] 

  constructor(private route: ActivatedRoute, private candidatosService: CandidatosService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.id=params.id
    });
    this.getCandidato()
    
  }

  getCandidato(){
    this.candidatosService.getCandidato(this.id).subscribe(
      res => {
        this.candidato=res

        var x = this.habilidades.push({id: 1, selected:this.candidato[0].java, nombre:"Java"})
        x += this.habilidades.push({id:2, selected: this.candidato[0].microservicios, nombre:"Microservicios"})
        x+= this.habilidades.push({id:3, selected: this.candidato[0].elastic, nombre:"Elastic"})

      },
      err => {
        console.log("error al obtener el candidato con id="+this.id)
      }
    )
  }

onChangeHabilidad($event){
  const id = $event.target.value
  const isSelected = $event.target.checked
  this.habilidades = this.habilidades.map((d) => {
    if (d.id == id){
      d.selected = isSelected
      return d
    }
    return d
  })
  console.log(this.habilidades)
}

update(){
  const nuevo = new Candidato(this.candidato[0].id, this.candidato[0].nombre, 
    this.candidato[0].fecha_entrevista, this.habilidades[2].selected, this.habilidades[0].selected,
    this.habilidades[1].selected)

    console.log(nuevo)

  this.candidatosService.updateCandidato(nuevo).subscribe(
      res => {
        this.showSuccess("Guardado!")
      },
      err => {
        console.log(err)
      }
    )
}

showSuccess(texto: String){
Swal.fire({
  position: 'center',
  icon: 'success',
  title: texto,
  showConfirmButton: true,
  
})
}

}
