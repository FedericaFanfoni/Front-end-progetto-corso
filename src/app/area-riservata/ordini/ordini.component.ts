import { Component } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { Ordine } from '../../models/articolo.model';

@Component({
  selector: 'app-ordini',
  templateUrl: './ordini.component.html',
  styleUrl: './ordini.component.scss'
})

export class OrdiniComponent {

  constructor(
    private accountService: AccountService
  ){}

  ordini?:Ordine[]

  ngOnInit(){
 
    this.accountService.ordiniEffettuati().subscribe({
      next: (data) => {
        this.ordini = data.ordini.ordini        
      },
      error: (e) => console.log(e)
    })
  }

}
