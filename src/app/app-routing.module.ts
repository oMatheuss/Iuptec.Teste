import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroVeiculosComponent } from './cadastro-veiculos/cadastro-veiculos.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { VeiculosComponent } from './veiculos/veiculos.component';


const routes: Routes = [
	{ path: 'home', component: HomeComponent },
	{ path: 'veiculos', component: VeiculosComponent },
	{ path: 'login', component: LoginComponent },
	{ path: 'cadastro', component: CadastroComponent },
	{ path: 'cadastro-veiculos', component: CadastroVeiculosComponent },
	{ path: '', redirectTo: 'home', pathMatch: 'full' },
	{ path: '**', component: PagenotfoundComponent },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {}
