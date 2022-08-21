import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { AlertaService } from 'src/services/AlertaService';
import { ApiService } from 'src/services/ApiService';

export interface Veiculo {
	id : number;
	marca: string;
	modelo: string;
	ano: string;
}

@Component({
  selector: 'app-cadastro-veiculos',
  templateUrl: './cadastro-veiculos.component.html',
  styleUrls: ['./cadastro-veiculos.component.css']
})
export class CadastroVeiculosComponent implements OnInit {

	veiculos: Veiculo[] = [];
	marcas: Array<string> = [];
	modelos: Array<string> = [];
	anos: Array<string> = [];

	placa = "";
	marca = "";
	modelo = "";
	ano = "";

	placaMask0 = /^([A-Z]{3}[0-9]{1}[A-Z]{1}[0-9]{2})/;
	//placaMask1 = /^([A-Z]{3}[0-9]{4})/;

	constructor(private api: ApiService, private alert : AlertaService) { }

	ngOnInit(): void {
		this.api.getVeiculos().then(data => {
			if (data.success) {
				for (let val of data.output) {
					this.veiculos.push({
						id: val.id,
						marca: val.marca,
						modelo: val.modelo,
						ano: val.ano,
					});
				}
				this.veiculos.forEach(val => {
					if (!this.marcas.includes(val.marca))
						this.marcas.push(val.marca);
				});
			} else {
				alert(data.message);
			}
		});
	}

	onSelectMarca(e : MatSelectChange) {
		this.modelos = [];
		this.veiculos.forEach(val => {
			if (e.value === val.marca) {
				this.modelos.push(val.modelo);
			}
		});
		this.modelo = '';
	}

	onSelectModelo(e : MatSelectChange) {
		this.anos = [];
		this.veiculos.forEach(val => {
			if (e.value === val.modelo && this.marca === val.marca) {
				this.anos.push(val.ano);
			}
		});
		this.ano = '';
	}

	capitalize() {
		this.placa = this.placa?.toUpperCase() || "";
	}

	formSubmit(f : NgForm) {
		if (!f.invalid) {
			if (!this.placaMask0.test(this.placa)) {
				this.alert.call('Atenção', 'A placa informada é inválida!', 'warning');
				return;
			}
			let veic = this.veiculos.find((val) => {
				return val.marca === this.marca && val.modelo === this.modelo && val.ano === this.ano;
			});
			if (!veic) {
				this.alert.call('Atenção', 'Ocorreu um erro ao tentar inserir veiculo', 'danger');
				return;
			}
			this.api.adicionaMeuVeiculo(veic.id, this.placa).then(
				(response)=> {
					if (response.success) {
						f.resetForm('');
						this.alert.call('Sucesso', response.message, 'success');
					} else {
						this.alert.call('Erro', response.message, 'danger');
					}
				}
			);
		}
	}
}
