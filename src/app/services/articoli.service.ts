import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Articolo, Response, RicercaArticoli } from '../models/articolo.model';
import { environment } from '../../environments/environment.development';
import { skip } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArticoliService {

  constructor(
    private http: HttpClient
  ) { }

  ricercaPerNome(nome: string) {
    return this.http.get<Response>(`${environment.urlProgetto}/articoli`,
      { params: { nome } }
    )
  }

  dettaglioArticolo(_id: string) {
    return this.http.get<Articolo>(`${environment.urlProgetto}/articoli/${_id}`)
  }

  ricercaArticoli(params: RicercaArticoli) {
    return this.http.get<Response>(`${environment.urlProgetto}/articoli`,
      {
        params: {
          attivita: params.attivita,
          taglia: params.taglia,
          colore: params.colore,
          min: params.prezzo.min,
          max: params.prezzo.max,
          skip: params.skip
        }
      }
    )
  }

  articoliPerParams(params:any){
    return this.http.get<Response>(`${environment.urlProgetto}/articoli`,
    { params:  params  }
  )
  }

}
