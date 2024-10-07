import { Component, HostListener } from '@angular/core';
import { UtilityService } from '../services/utility.service';
import { Router } from '@angular/router';
import { CarrelloService } from '../services/carrello.service';
import { Renderer2 } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ArticoliService } from '../services/articoli.service';
import { Articolo } from '../models/articolo.model';
import { Subscription } from 'rxjs';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  scroll: number = 0
  logo: string = "../../assets/image/logo-desktop-transformed.png"

  apri_ricerca: boolean = false
  barra_ricerca = new FormControl("")
  risultati?: Articolo[]

  sub?: Subscription

  constructor(
    public utility: UtilityService,
    private router: Router,
    public cs: CarrelloService,
    private renderer: Renderer2,
    private articoliService: ArticoliService,
    public accountService: AccountService
  ) { }

  ngOnInit() {
    this.sub = this.barra_ricerca.valueChanges.subscribe(value => {
      if (value && value.length > 0) {
        this.articoliService.ricercaPerNome(value).subscribe({
          next: (data) => {
            this.risultati = data.articoli
            console.log(data.articoli)
          },
          error: (e) => console.log(e)
        })
      } else {
        this.risultati = []
      }
    })
  }

  ngOnDestroy() {
    this.sub?.unsubscribe()
  }

  chiudiRicerca() {
    this.apri_ricerca = false
    this.barra_ricerca.reset()
    this.risultati = []
  }

  apriCarrello(num: number, boolean: boolean) {

    if (boolean === true) {
      this.utility.apri_carrello = num
      setTimeout(() => {
        this.utility.effetto_blur = boolean
        this.renderer.addClass(document.body, 'overflow-hidden')
      }, 500)

    } else {
      this.utility.effetto_blur = boolean

      setTimeout(() => {
        this.renderer.removeClass(document.body, 'overflow-hidden')
        this.utility.apri_carrello = num
      }, 500)
    }
  }

  indirizza(rotta: string[]) {
    this.utility.effetto_blur = false

    setTimeout(() => {
      this.utility.apri_carrello = 0
      this.renderer.removeClass(document.body, 'overflow-hidden')
      this.router.navigate(rotta)
    }, 500)
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(evento: Event) {
    this.scroll = Math.round(document.documentElement.scrollTop);
    this.scroll > 500 ? this.logo = "../../assets/image/logo-mobile.png" : this.logo = "../../assets/image/logo-desktop-transformed.png"
  }
}
