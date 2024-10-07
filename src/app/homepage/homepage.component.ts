import { Component, ViewChild, ElementRef } from '@angular/core';
import { ArticoliService } from '../services/articoli.service';
import { UtilityService } from '../services/utility.service';
import { Articolo } from '../models/articolo.model';
import { Subscription} from 'rxjs';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})
export class HomepageComponent {

  nuovi_arrivi?: Articolo[]
  best_seller?: Articolo[]
  sub?: Subscription

  constructor(
    public utility: UtilityService,
    private articoliService: ArticoliService
  ) { }

  @ViewChild('card') card!: ElementRef
  @ViewChild('containerNovita') containerNovita!: ElementRef
  @ViewChild('#containerBestSeller') containerBestSeller!: ElementRef

  ngOnInit() {
    this.utility.mostraIcona = true
    this.utility.apri_menu = 0

    this.sub = this.articoliService.articoliPerParams({ nuovo_arrivo: true, skip: 0 }).subscribe({
      next: (data) => {
        console.log(data)
        this.nuovi_arrivi = data.articoli
      },
      error: (e) => { console.log(e) }
    })

    this.sub = this.articoliService.articoliPerParams({ best_seller: true, skip: 0 }).subscribe({
      next: (data) => {
        this.best_seller = data.articoli
      },
      error: (e) => { console.log(e) }
    })
  }

  ngOnDestroy() {
    this.sub!.unsubscribe()
  }

  indietro(nome: string) {
    if (nome === "novita") {
      this.containerNovita.nativeElement.scrollBy({ left: - this.card.nativeElement.offsetWidth - 50, behavior: 'smooth' })
    }
    else {
      this.containerBestSeller.nativeElement.scrollBy({ left: - this.card.nativeElement.offsetWidth - 50, behavior: 'smooth' })
    }
  }

  avanti(nome: string) {
    if (nome === "novita") {
      this.containerNovita.nativeElement.scrollBy({ left: this.card.nativeElement.offsetWidth + 20, behavior: 'smooth' })
    }
    else {
      this.containerBestSeller.nativeElement.scrollBy({ left: this.card.nativeElement.offsetWidth + 20, behavior: 'smooth' })
    }
  }
}
