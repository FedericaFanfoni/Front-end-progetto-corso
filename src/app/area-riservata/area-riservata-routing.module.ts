import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfiloComponent } from './profilo/profilo.component';
import { OrdiniComponent } from './ordini/ordini.component';
import { DatiPersonaliComponent } from './dati-personali/dati-personali.component';

const routes: Routes = [
  {
    path: "", component: ProfiloComponent,
    children: [
      { path: 'ordini', component: OrdiniComponent },
      { path: 'dati-personali', component: DatiPersonaliComponent },
    ]
  }
]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AreaRiservataRoutingModule { }
