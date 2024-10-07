import { Component } from '@angular/core';
import { formatDate } from '@angular/common';
import { CarrelloService } from '../services/carrello.service';
import { UtilityService } from '../services/utility.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Ordine } from '../models/articolo.model';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-modulo-pagamento',
  templateUrl: './modulo-pagamento.component.html',
  styleUrl: './modulo-pagamento.component.scss'
})
export class ModuloPagamentoComponent {

  apri: number = 0
  data_corrente = formatDate(new Date(), "dd/MM/yyyy", "it-IT")
  data_spedizione_standard = formatDate(new Date().setDate(new Date().getDate() + 5), "dd/MM/yyyy", 'it-IT');
  data_spedizione_veloce = formatDate(new Date().setDate(new Date().getDate() + 2), "dd/MM/yyyy", 'it-IT');

  numero_step: number = 0
  mostra_form = false
  ordine?: Ordine

  constructor(
    public cs: CarrelloService,
    private utility: UtilityService,
    public router: Router,
    public accountService: AccountService
  ) { }

  wizardForm = new FormGroup({

    dati_spedizione: new FormGroup({

      nome: new FormControl("", [Validators.required, Validators.pattern(/^[a-zA-ZÀ-ÖØ-öø-ÿ]{2,}(?:\s[a-zA-ZÀ-ÖØ-öø-ÿ]+(?:\.)?)?$/)]),
      cognome: new FormControl("", [Validators.required, Validators.pattern(/^[a-zA-ZÀ-ÖØ-öø-ÿ]{2,}(?:\s[a-zA-ZÀ-ÖØ-öø-ÿ]+(?:\.)?)?$/)]),

      indirizzo: new FormGroup({
        via_civico: new FormControl("", [Validators.required, Validators.pattern(/^[a-zA-ZÀ-ÖØ-öø-ÿ]{3,}(?:\s[a-zA-ZÀ-ÖØ-öø-ÿ]+)*(?:\s[a-zA-ZÀ-ÖØ-öø-ÿ]+,)?\s\d+(?:\s[a-zA-ZÀ-ÖØ-öø-ÿ]{1,2})?$/)]),
        cap: new FormControl("", [Validators.required, Validators.pattern(/^[0-9]{5}$/)]),
        citta: new FormControl("", [Validators.required, Validators.pattern(/^[a-zA-Zà-úÀ-Ú']+(?: [a-zA-Zà-úÀ-Ú']+)*$/)]),
        provincia: new FormControl("", [Validators.required, Validators.pattern(/^[a-zA-Z]{2}$/)]),
        paese: new FormControl("", [Validators.required, Validators.pattern(/^[a-zA-Z\s]{2,50}$/)]),
      }),

      telefono: new FormControl("", [Validators.required, Validators.pattern(/^(?:\+?\d{1,4}\s?\d{7,10})$/)]),
      email: new FormControl("", [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+(\.[a-zA-Z0-9._%+-]+)*@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]),
      spedizione_veloce: new FormControl(false),
    }),

    dati_carta: new FormGroup({

      numero_carta: new FormControl("", [Validators.required, Validators.pattern(/^\d{4}([-\s]?\d{4}){3}$/)]),
      scadenza: new FormControl("", [Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/(20\d{2}|[2-9]\d)$/)]),
      cvv: new FormControl("", [Validators.required, Validators.pattern(/^\d{3,4}$/)]),

    }),
  })

  ngOnInit() {
    this.utility.mostraIcona = false
  }

  ngDestroy(){
    this.utility.mostraIcona = true
  }

  checkBox() {
    this.wizardForm.get('dati_spedizione')!.get('spedizione_veloce')!.valueChanges.subscribe(value => {
      if (value === true) {
        this.cs.costo_spedizione = 15
        this.cs.calcoloTotale(this.cs.costo_spedizione)

      } else {
        this.cs.calcoloTotale(this.cs.calcoloSpedizione())
      }
    })
  }

  continua(num: number) {
    this.numero_step = num
  }

  inviaOrdine() {

    this.ordine = {

      dati_spedizione: this.wizardForm.get('dati_spedizione')!.getRawValue(),
      ordine: this.cs.carrello,
      metodo_pagamento: "Carta Mastercard",
      costo_spedizione: this.cs.costo_spedizione,
      totale: this.cs.totale,
      data_ordine: this.data_corrente,
      data_spedizione: this.data_spedizione_veloce
    }

    this.wizardForm.reset()
    this.cs.pulisciCarrello()
    this.numero_step = 0

    if (this.accountService.account) {
      this.accountService.aggiungiOrdine(this.ordine).subscribe({
        next: (data) => { console.log(data) },
        error: (e) => { console.log(e) }
      })
    }
  }

}
