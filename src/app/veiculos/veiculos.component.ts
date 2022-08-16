import { Component, OnInit } from '@angular/core';
import { ApiService } from '../commons/ApiService';

export interface Veiculo {
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

  displayedColumns: string[] = ['placa', 'marca', 'modelo', 'ano'];
  veiculos: Veiculo[] = [];

  constructor(private api : ApiService) { }

  ngOnInit(): void {
    this.api.getVeiculos().then(data => {
      if (data.success) {
        this.veiculos = [];
        for (let val of data.output) {
          this.veiculos.push({
            placa: val.placa,
            marca: val['veiculo.marca'],
            modelo: val['veiculo.modelo'],
            ano: val['veiculo.ano'],
          });
          console.log(this.veiculos);
        }
      } else {
        alert(data.message);
      }
    })
  }

}
