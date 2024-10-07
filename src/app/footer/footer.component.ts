import { Component } from '@angular/core';
import { UtilityService } from '../services/utility.service';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  mostraAccordion: boolean = window.innerWidth > 900 ? true : false

  constructor(public utility: UtilityService) {

    fromEvent(window, 'resize').subscribe(data => {
      window.innerWidth > 900 ? this.mostraAccordion = true : this.mostraAccordion = false
    })

  }

  numeroAccordion: number = 0

  apriAccordion(num: number) {

    if (window.innerWidth > 900) return
    this.numeroAccordion == num ? this.numeroAccordion = 0 : this.numeroAccordion = num
    
  }

}
