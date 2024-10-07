import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CreateAccountRequest, GenericResponse, LoggedAccount, LoginRequest, LoginResponse, OrdiniEffettuati } from '../models/account.model';
import { environment } from '../../environments/environment.development';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { Ordine } from '../models/articolo.model';


@Injectable({
  providedIn: 'root'
})
export class AccountService {

  account?: LoggedAccount

  constructor(
    private http: HttpClient,
    private jwt: JwtHelperService,
    private router: Router
  ) 
  {
    /* 
    Quando il service viene caricato prendo il token dal localStorage e solo se lo trova richiama il metodo che
    attribuisce a this.account il valore del paylode del token decodificato
     */
    const token = localStorage.getItem("jwt")
    if (token !== null) {
      this.createLoggerAccount(this.jwt.decodeToken(token))
    }
  }

  // Effettua la creazione di un account
  creaAccount(dto: CreateAccountRequest) {
    return this.http.post<GenericResponse>(`${environment.urlProgetto}/accounts/registrazione`, dto)
  }
  // Effettua l'accesso all'account
  login(dto: LoginRequest) {
    return this.http.post<LoginResponse>(`${environment.urlProgetto}/accounts/login`,
      dto)
  }

  loginOk(data: LoginResponse) {
    localStorage.setItem("jwt", data.token)
    this.createLoggerAccount(this.jwt.decodeToken(data.token));
  }
  /* 
    Dopo aver effettuato l'accesso, se non ci sono stati errori, viene rilasciato un token dal BE.
    Il token viene messo nel localStorage, viene decodificato attraverso il metodo decodeToken e
    passato al metodo createLoggerAccount per assegnare il contenuto del payload (dove sono contenute le informazioni dell'utente)
    del token alla proprietà "this.account".
  */
  private createLoggerAccount(data: any) {
    const { _id, nome, cognome, email } = data;
    this.account = { _id, nome, cognome, email };
  }
 // Controlla che l'account esiste per verificare se è stato effettuato l'accesso
  utenteLoggato() {
    return this.account !== undefined
  }
 
  logout() {
    localStorage.clear()
    this.account = undefined
    this.router.navigateByUrl("/login")
  }

  aggiungiOrdine(dto: Ordine) {
    return this.http.post<GenericResponse>(`${environment.urlProgetto}/accounts/ordini`,
      dto)
  }

  ordiniEffettuati() {
    return this.http.get<OrdiniEffettuati>(`${environment.urlProgetto}/accounts/ordini`)
  }

}
