import { Component } from '@angular/core';
import { ArticoliService } from '../services/articoli.service';
import { ActivatedRoute } from '@angular/router';
import { UtilityService } from '../services/utility.service';
import { CarrelloService } from '../services/carrello.service';
import { FormControl, Validators } from '@angular/forms';
import { Articolo, ArticoloCarrello } from '../models/articolo.model';
import { Colore } from '../models/colore.model';

@Component({
  selector: 'app-scheda-articolo',
  templateUrl: './scheda-articolo.component.html',
  styleUrl: './scheda-articolo.component.scss'
})
export class SchedaArticoloComponent {

  articolo?: Articolo
  articoli_correlati?: Articolo[]
  colori_disponibili?: Colore[]
  mostra_popup: boolean = false

  taglia_selezionata = new FormControl("", Validators.required,)
  colore_selezionato = new FormControl("", Validators.required)

  constructor(
    private articoloService: ArticoliService,
    private route: ActivatedRoute,
    public utility: UtilityService,
    private cs: CarrelloService
  ) { }

  ngOnInit() {
    this.route.params.subscribe({
      next: (param) => { this.articoloService.dettaglioArticolo(param['id']).subscribe({
          next: (data) => {
            this.articolo = data
            this.colori_disponibili = this.utility.colori.filter(colore => this.articolo!.colori_disponibili.includes(colore.nome_colore))
          }
        })
      },
      error: (e) => console.log(e)
    })
  }

  aggiungiArticolo() {

    if (this.articolo) {
      
      const prodottoAggiunto: ArticoloCarrello = {
        nome: this.articolo.nome,
        attivita: this.articolo.attivita,
        prezzo: this.articolo.prezzo,
        prezzo_finale: this.articolo!.prezzo,
        taglia: this.taglia_selezionata.value!,
        colore: this.colore_selezionato.value!,
        immagine: this.articolo.immagine[0],
        quantita: 1
      }

        this.mostra_popup = true
        this.cs.aggiungiArticolo(prodottoAggiunto)
    }

  }

  chiudiPopup() {
    this.mostra_popup = false
    this.taglia_selezionata.reset()
    this.colore_selezionato.reset()
  }

}
