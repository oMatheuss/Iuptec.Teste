import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/services/ApiService';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
	telefone: string = "";
	nome: string = "";
	email: string = "";

	constructor(
		private api: ApiService,
		private router: Router) { }

	getPerfil() {
		this.api.getMe().then((data) => {
			if (data.success) {
				this.nome = data.output.nome;
				this.email = data.output.email;
				this.telefone = data.output.telefone;
			}
		});
	}

	acessarVeiculos() {
		this.router.navigate(['/veiculos']);
	}

	ngOnInit(): void {  
		this.getPerfil();
	}
}
