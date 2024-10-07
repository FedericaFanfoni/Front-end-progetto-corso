import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import myLocaleIt from '@angular/common/locales/it';
import { registerLocaleData } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { HomepageComponent } from './homepage/homepage.component';
import { ArticoliComponent } from './articoli/articoli.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { FooterComponent } from './footer/footer.component';
import { NewsletterComponent } from './newsletter/newsletter.component';
import { SchedaArticoloComponent } from './scheda-articolo/scheda-articolo.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CarrelloComponent } from './carrello/carrello.component';
import { ModuloPagamentoComponent } from './modulo-pagamento/modulo-pagamento.component';
import { LoginComponent } from './login/login.component';
import { RegistrazioneComponent } from './registrazione/registrazione.component';
import { JwtModule } from '@auth0/angular-jwt';
import { tokenInterceptor } from './interceptors/token.interceptor';

registerLocaleData(myLocaleIt)

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomepageComponent,
    ArticoliComponent,
    SidebarComponent,
    FooterComponent,
    NewsletterComponent,
    SchedaArticoloComponent,
    CarrelloComponent,
    ModuloPagamentoComponent,
    LoginComponent,
    RegistrazioneComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgxSliderModule,
    MatPaginatorModule,
    JwtModule.forRoot({ config: { disallowedRoutes: [""] } })
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'it' }, provideAnimationsAsync(), provideHttpClient(
    withInterceptors([tokenInterceptor]),
  )],
  bootstrap: [AppComponent]
})
export class AppModule { }
