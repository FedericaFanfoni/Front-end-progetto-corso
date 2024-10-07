import { Component } from '@angular/core';
import { ArticoliService } from '../services/articoli.service';
import { UtilityService } from '../services/utility.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Articolo, Response } from '../models/articolo.model';
import { Subscription, fromEvent } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-articoli',
  templateUrl: './articoli.component.html',
  styleUrl: './articoli.component.scss'
})
export class ArticoliComponent {

  apri_sidebar = window.innerWidth > 1000 ? true : false
  articoli?: Articolo[]
  totale_articoli?: number
  messaggio?: string
  param?: string
  skip: number = 0

  p: any
  ricercaBySidebar?: boolean

  sub?: Subscription
  sub_route?: Subscription

  constructor(
    private articoliService: ArticoliService,
    private utility: UtilityService,
    private route: ActivatedRoute
  ) {
    fromEvent(window, 'resize').subscribe(data => {
      window.innerWidth > 1000 ? this.apri_sidebar = true : this.apri_sidebar = false
    })
  }

  ngOnInit() {
    this.utility.apri_carrello = 0
    this.utility.apri_menu = 0
    this.ricercaBySidebar = false

    this.sub_route = this.route.params.subscribe({
      next: (data) => {

        if (data["params"]) {

          this.param = data['params']

          if (this.param == "Nuovi arrivi") {
            this.p = { nuovo_arrivo: true, skip: 0 }
            this.sub = this.articoliService.articoliPerParams(this.p).subscribe({
              next: (data) => {
                this.p.skip = 12
                this.articoli = data.articoli
                this.totale_articoli = data.totale_articoli
                this.utility.apri_menu = 0
                this.utility.sotto_menu = false
              }
            })
          }
          else if (this.param == "Best seller") {
            this.p = { best_seller: true, skip: 0 }
            this.sub = this.articoliService.articoliPerParams(this.p).subscribe({
              next: (data) => {
                this.p.skip = 12
                this.articoli = data.articoli
                this.totale_articoli = data.totale_articoli
                this.utility.apri_menu = 0
                this.utility.sotto_menu = false
              }
            })
          }
          else {
            this.p = { attivita: this.param, skip: 0 }
            this.sub = this.articoliService.articoliPerParams(this.p).subscribe({
              next: (data) => {
                this.articoli = data.articoli
                this.totale_articoli = data.totale_articoli
                this.utility.apri_menu = 0
                this.utility.sotto_menu = false
              }
            })
          }
        }
        else {
          this.param = "Abbigliamento e calzature"
          this.p = { skip: 0 }
          this.sub = this.articoliService.articoliPerParams(this.p).subscribe({
            next: (data) => {
              this.p.skip = 12
              this.articoli = data.articoli
              this.totale_articoli = data.totale_articoli
              this.utility.apri_menu = 0
            }
          })
        }
      }
    })

  }

  ngOnDestroy() {
    this.sub_route?.unsubscribe()
    this.sub?.unsubscribe()
  }

  ricercaDaSidebar(nuovaRicerca: any) {
    window.innerWidth > 1000 ? this.apri_sidebar = true : this.apri_sidebar = false
    this.articoli = nuovaRicerca.articoli_trovati.articoli
    this.totale_articoli = nuovaRicerca.articoli_trovati.totale_articoli
    this.p = { skip: 0, ...nuovaRicerca.parametri_ricerca }
    this.ricercaBySidebar = true
  }

  handlePageEvent(e: PageEvent) {
    this.p.skip = 12 * e.pageIndex

    if (this.ricercaBySidebar) {
      this.sub = this.articoliService.ricercaArticoli(this.p).subscribe({
        next: (data) => {
          this.articoli = data.articoli
          this.totale_articoli = data.totale_articoli
          window.scrollTo(0, 0)
        }
      })
    } else {
      this.sub = this.articoliService.articoliPerParams(this.p).subscribe({
        next: (data) => {
          this.articoli = data.articoli
          this.totale_articoli = data.totale_articoli
          window.scrollTo(0, 0)
        }
      })
    }
  }

}
