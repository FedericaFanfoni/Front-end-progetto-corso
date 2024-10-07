import { Component } from '@angular/core';
import { UtilityService } from '../../services/utility.service';

@Component({
  selector: 'app-profilo',
  templateUrl: './profilo.component.html',
  styleUrl: './profilo.component.scss'
})
export class ProfiloComponent {

  constructor(
    private utility:UtilityService
  ){}

  ngOnInit(){
    this.utility.mostraIcona = true
    this.utility.apri_menu = 0
  }


}
