import { Injectable } from '@angular/core';
import { ArticoloCarrello } from '../models/articolo.model';
import { FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CarrelloService {


  carrelloString: string | null = ""
  carrello: ArticoloCarrello[] = []

  msg_carrello_vuoto: string = "Non ci sono articoli nel tuo carrello"
  totale_quantita: number = 0
  subtotale: number = 0
  totale: number = 0
  costo_spedizione: number = 0

  array_formControl: FormControl[] = []

  constructor() {

    this.carrelloString = localStorage.getItem("Carrello")
    if (this.carrelloString != null) { // Quando nel localStorage sono presenti dei dati metto tutto nella variabile carrello
      this.carrello = JSON.parse(this.carrelloString)

      this.carrello.forEach(p => {
        this.array_formControl.push(new FormControl(p.quantita))
        this.totale_quantita += p.quantita
        this.subtotale += p.prezzo_finale
      })

      this.subtotale > 180 ? this.costo_spedizione = 0 : this.costo_spedizione = 7
      this.totale = this.subtotale + this.costo_spedizione
    }
  }

  calcoloSpedizione() {
    return this.subtotale > 180 ? this.costo_spedizione = 0 : this.costo_spedizione = 7
  }

  calcoloTotale(spedizione: number) {
    return this.totale = this.subtotale + spedizione
  }

  ricalcolo() {
    this.totale_quantita = 0
    this.subtotale = 0

    this.carrello.forEach(p => {
      this.totale_quantita += p.quantita
      this.subtotale += p.prezzo_finale
    })

    this.calcoloTotale(this.calcoloSpedizione())
  }

  salva() {
    this.ricalcolo()
    localStorage.setItem("Carrello", JSON.stringify(this.carrello))
  }

  // metodo per l'aggiunta del prodotto nel carrello e incremento del numero totale dei prodotti 
  aggiungiArticolo(articoloCarrello: ArticoloCarrello) {

    let articolo = this.carrello.find(
      a => a.nome === articoloCarrello.nome && a.taglia === articoloCarrello.taglia && a.colore === articoloCarrello.colore)

    if (articolo) {
      articolo.quantita++
      articolo.prezzo_finale = articolo.prezzo * articolo.quantita
      this.salva()
    }
    else {
      this.carrello.push(articoloCarrello)
      this.array_formControl.push(new FormControl(1))
      // // Ogni volta che aggiungo un prodotto nel carrello questo viene salvato nel localStorage
      this.salva() // in calcola è compreso il metodo ricalcolo()
    }
  }

  rimuoviArticolo(i: number) {

    this.carrello.splice(i, 1) // Cancello dall'array del carrello il cui indice corrisponde.
    this.salva()
  }

  aumentaQuantita(articoloCarrello: ArticoloCarrello) {

    articoloCarrello.quantita++
    articoloCarrello.prezzo_finale = articoloCarrello.prezzo * articoloCarrello.quantita
    this.salva()
  }

  diminuisciQuantita(articoloCarrello: ArticoloCarrello) {

    articoloCarrello.quantita === 1 ? articoloCarrello.quantita = 1 : articoloCarrello.quantita--
    articoloCarrello.prezzo_finale = articoloCarrello.prezzo * articoloCarrello.quantita
    this.salva()
  }

  modificaDaInput(formControl: FormControl, articoloCarrello: ArticoloCarrello) {

    if (formControl.value === 0 || formControl.value === null) {
      formControl.setValue(1)
      articoloCarrello.quantita = formControl.value
    }

    if (formControl.value !== 0) {
      articoloCarrello.quantita = formControl.value
      articoloCarrello.prezzo_finale = articoloCarrello.prezzo * articoloCarrello.quantita

      this.salva()
    }
  }

  pulisciCarrello() {
    this.carrello = []
    this.totale_quantita = 0
    localStorage.removeItem('Carrello')
  }
}
