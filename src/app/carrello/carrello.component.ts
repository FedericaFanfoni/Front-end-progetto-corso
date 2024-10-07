import { Component } from '@angular/core';
import { CarrelloService } from '../services/carrello.service';

@Component({
  selector: 'app-carrello',
  templateUrl: './carrello.component.html',
  styleUrl: './carrello.component.scss'
})
export class CarrelloComponent {

  apri_accordion: number = 0

  constructor(public cs: CarrelloService) { }

}
