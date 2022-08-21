import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertaService } from 'src/services/AlertaService';
import { ApiService } from 'src/services/ApiService';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {
	nome: string = "";
	email: string = "";
	senha: string = "";
	telefone: string = "";

	constructor(
		private api: ApiService,
		private router: Router,
		private alert : AlertaService) { }

	ngOnInit(): void {
	}

	formSubmit(f: NgForm): void {
		this.api.postCadastro(this.nome, this.email, this.senha, this.telefone)
		.then(
			(data) => {
				if (data.success) {
					this.router.navigate(['/login']);
				} else {
					this.alert.call("Atenção", data.message, "warning");
				}
			}
		).catch(
			(reason : Error) => {
				this.alert.call("Atenção", reason.message, "danger");
			}
		);
	}
}
