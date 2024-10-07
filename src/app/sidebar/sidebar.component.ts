import { Component } from '@angular/core';
import { Articolo, Response, RicercaArticoli } from '../models/articolo.model';
import { Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { UtilityService } from '../services/utility.service';
import { ArticoliService } from '../services/articoli.service';
import { Options } from '@angular-slider/ngx-slider';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {

  @Input() articoli?: Articolo[]
  @Output() articoli_sidebar = new EventEmitter<any>()

  constructor(
    public utility: UtilityService,
    private articoliService: ArticoliService
  ) { }

  apri_categorie!: number
  parametri_ricerca?:RicercaArticoli
  sub?: Subscription

  value: number = 0;
  highValue: number = 600;
  options: Options = {
    floor: 0,
    ceil: 600,
    step: 50,
    showTicks: true
  };

  frmRicerca = new FormGroup({
    attivita: new FormControl(""),
    taglia: new FormControl(""),
    colore: new FormControl(""),
    prezzo: new FormGroup({
      min: new FormControl(this.value),
      max: new FormControl(this.highValue)
    }),
    skip: new FormControl(0)
  })

  ricercaArticoli() {

    this.frmRicerca.get("prezzo")!.get("min")!.setValue(this.value)
    this.frmRicerca.get("prezzo")!.get("max")!.setValue(this.highValue)

    // console.log(this.frmRicerca.value)

   this.sub = this.articoliService.ricercaArticoli(this.frmRicerca.value as RicercaArticoli).subscribe({
      next: (data) => {
        this.parametri_ricerca = this.frmRicerca.value as RicercaArticoli
        // console.log(data)
        let nuovaRicerca = {articoli_trovati: data, parametri_ricerca: this.parametri_ricerca}

        if(data.totale_articoli == 0) return
        this.articoli_sidebar.emit(nuovaRicerca)
        window.scrollTo(0, 0)
      }
    })
  }

  ngOnDestroy() {
    this.sub?.unsubscribe()
  }

}
