import { NgModule, ViewChild } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MaterialModule } from './material.module';
import { FormsModule }   from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { VeiculosComponent } from './veiculos/veiculos.component';
import { CadastroVeiculosComponent } from './cadastro-veiculos/cadastro-veiculos.component';
import { ApiService } from 'src/services/ApiService';
import { AlertaService } from 'src/services/AlertaService';
import { AlertaComponent } from './alerta/alerta.component';
import { CadastroComponent } from './cadastro/cadastro.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    VeiculosComponent,
	CadastroComponent,
    CadastroVeiculosComponent,
    PagenotfoundComponent,
	AlertaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    FormsModule
  ],
  providers: [ApiService, AlertaService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
