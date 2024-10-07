import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validator, Validators } from '@angular/forms';
import { CreateAccountRequest } from '../models/account.model';
import { AccountService } from '../services/account.service';
import { UtilityService } from '../services/utility.service';

@Component({
  selector: 'app-registrazione',
  templateUrl: './registrazione.component.html',
  styleUrl: './registrazione.component.scss'
})
export class RegistrazioneComponent {

  frmRegistrazione = new FormGroup({
    nome: new FormControl("", Validators.required),
    cognome: new FormControl("", Validators.required),
    email: new FormControl("", Validators.email),
    password: new FormControl("", Validators.required),
    conferma_password: new FormControl("", Validators.required)
  })

  msg?: string

  constructor(
    private router: Router,
    private accountService: AccountService,
    private utility: UtilityService,
  ) { }

  ngOnInit() {
    this.utility.apri_menu = 0
  }

  creaAccount() {

    if (this.frmRegistrazione.get("conferma_password")!.value != this.frmRegistrazione.get("password")!.value) {
      this.msg = "La password non corrisponde a quella scelta"
      setTimeout(() => {
        this.msg = undefined
      }, 3000)
      return
    }

    const dto:CreateAccountRequest = {
      nome: this.frmRegistrazione.get("nome")!.value!,
      cognome: this.frmRegistrazione.get("cognome")!.value!,
      email: this.frmRegistrazione.get("email")!.value!,
      password: this.frmRegistrazione.get("password")!.value!,
      ordini: []
    }

    this.accountService.creaAccount(dto).subscribe({
      next: (data) => {
        this.router.navigateByUrl("/login")
      },
      error: (e) => {
        console.log(e)
        this.msg = e.error
        setTimeout(() => {
          this.msg = undefined
        }, 3000)
      }
    })
  }

}
