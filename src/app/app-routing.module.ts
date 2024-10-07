import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { ArticoliComponent } from './articoli/articoli.component';
import { SchedaArticoloComponent } from './scheda-articolo/scheda-articolo.component';
import { CarrelloComponent } from './carrello/carrello.component';
import { ModuloPagamentoComponent } from './modulo-pagamento/modulo-pagamento.component';
import { LoginComponent } from './login/login.component';
import { RegistrazioneComponent } from './registrazione/registrazione.component';
import { authGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: "", component: HomepageComponent },
  { path: "articoli", component: ArticoliComponent },
  { path: "articoli/:params", component: ArticoliComponent },
  { path: "scheda-articolo/:id", component: SchedaArticoloComponent },
  { path: "carrello", component: CarrelloComponent },
  { path: "modulo-pagamento", component: ModuloPagamentoComponent },
  { path: "login", component: LoginComponent },
  { path: "registrazione", component: RegistrazioneComponent },
  {
    path: 'area-riservata',
    canActivate: [authGuard],
    loadChildren: () => import("./area-riservata/area-riservata.module").then((m) => m.AreaRiservataModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
