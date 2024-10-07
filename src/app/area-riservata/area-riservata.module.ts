import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AreaRiservataRoutingModule } from './area-riservata-routing.module';
import { ProfiloComponent } from './profilo/profilo.component';
import { OrdiniComponent } from './ordini/ordini.component';
import { DatiPersonaliComponent } from './dati-personali/dati-personali.component';


@NgModule({
  declarations: [
    ProfiloComponent,
    OrdiniComponent,
    DatiPersonaliComponent
  ],
  imports: [
    CommonModule,
    AreaRiservataRoutingModule
  ]
})
export class AreaRiservataModule { }
