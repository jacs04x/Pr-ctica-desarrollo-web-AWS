export class Candidato{

    id : number 
    nombre: string
    fecha_entrevista: Date
    elastic: boolean
    java: boolean
    microservicios: boolean

  constructor(
    id: number , 
    nombre: string, 
    fecha_entrevista: Date, 
    elastic: boolean, 
    java: boolean, 
    microservicios: boolean
) {
    this.id = id
    this.nombre = nombre
    this.fecha_entrevista = fecha_entrevista
    this.elastic = elastic
    this.java = java
    this.microservicios = microservicios
  }
    

}