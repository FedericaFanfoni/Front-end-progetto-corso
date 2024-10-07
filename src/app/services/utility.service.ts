import { Injectable } from '@angular/core';
import { Colore } from '../models/colore.model';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor() { }

  apri_menu: number = 0
  apri_carrello:number = 0
  effetto_blur = false
  mostraIcona: boolean = true
  sotto_menu: boolean = false

  attivita: string[] = ["Arrampicata", "Mountain Running®", "Escursionismo", "Alpinismo", "Scialpinismo"]
  taglie: string[] = ["35","36","37", "38", "39", "40", "41", "42", "43", "44", "45"]
  colori: Colore[] = [
    {
      nome_colore: "Red",
      primo: "#ff0000",
      secondo: "#ff0000"
    },
    {
      nome_colore: "Green",
      primo: "#53a828",
      secondo: "#53a828"
    },
    {
      nome_colore: "Blue",
      primo: "#1857f7",
      secondo: "#1857f7"
    },
    {
      nome_colore: "Orange",
      primo: "#ff7d00",
      secondo: "#ff7d00"
    },
    {
      nome_colore: "Turquoise",
      primo: "#2aefff",
      secondo: "#2aefff"
    },
    {
      nome_colore: "Black/Yellow",
      primo: "#ffff00",
      secondo: "#000",
    },
    {
      nome_colore: "Blue/Black",
      primo: "#1857f7",
      secondo: "#000"
    },
    {
      nome_colore: "Black",
      primo: "#000",
      secondo: "#000"
    },
  ]

  preventDefault(e:Event){
    e.preventDefault()
   }
}
