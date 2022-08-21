import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertaService } from 'src/services/AlertaService';
import { ApiService } from 'src/services/ApiService';

export interface Veiculo {
	id: number;
	placa: string;
	marca: string;
	modelo: string;
	ano: string;
}

@Component({
  selector: 'app-veiculos',
  templateUrl: './veiculos.component.html',
  styleUrls: ['./veiculos.component.css']
})
export class VeiculosComponent implements OnInit {

	displayedColumns: string[] = ['placa', 'marca', 'modelo', 'ano', 'id'];
	veiculos: Veiculo[] = [];

	constructor(private api : ApiService, private router: Router,
		private alert: AlertaService) { }

	ngOnInit(): void {
		this.api.getMeusVeiculos().then(data => {
			if (data.success) {
				this.veiculos = [];
				for (let val of data.output) {
					this.veiculos.push({
						id: val.id,
						placa: val.placa,
						marca: val['veiculo.marca'],
						modelo: val['veiculo.modelo'],
						ano: val['veiculo.ano'],
					});
				}
			} else {
				this.alert.call("Atenção", data.message, "danger");
			}
		});
	}

	cadastro() {
		this.router.navigate(['/cadastro-veiculos']);
	}

	delete(id: number) {
		this.api.removeMeuVeiculo(id).then(data => {
			if (data.success) {
				for (let i = 0; i < this.veiculos.length; i++) {
					this.veiculos = this.veiculos.filter(val => val.id !== id);
				}
				this.alert.call("Sucesso", data.message, "success");
			} else {
				this.alert.call("Atenção", data.message, "warning");
			}
		});
	}
}
