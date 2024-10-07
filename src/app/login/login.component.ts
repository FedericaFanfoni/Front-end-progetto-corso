import { Component } from '@angular/core';
import { UtilityService } from '../services/utility.service';
import { FormControl, FormGroup, Validator, Validators } from '@angular/forms';
import { AccountService } from '../services/account.service';
import { LoginRequest } from '../models/account.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  msgError?:string

  account = new FormGroup({
    email: new FormControl("", Validators.email),
    password: new FormControl("", Validators.required),
  })

  constructor(
    private utility: UtilityService,
    private router: Router,
    private accountService: AccountService
  ) { }

  ngOnInit() {
    this.utility.apri_menu = 0
  }

  login() {
    this.accountService.login(this.account.value as LoginRequest).subscribe({
      next: (data) => {
        this.accountService.loginOk(data)
        this.router.navigateByUrl("/area-riservata")
      },
      error: (e) => { 
        console.log(e.error.error) 
        this.msgError = e.error.error
      }
    })
  }
}
