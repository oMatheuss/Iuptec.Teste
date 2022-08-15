import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';
import { environment } from 'src/environments/environment';
import { SharedVariables } from '../commons/shared.variables';

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
    private shared: SharedVariables,
    private router: Router) { }

  getPerfil(token: string) {
    axios.get('/user/me', {
      baseURL: environment.apiurl,
      headers: {
        'Authorization': `Bearer ${token.toString()}`
      }
    }).then(({ data }) => {
      if (data.success) {
        this.nome = data.output.nome;
        this.email = data.output.email;
        this.telefone = data.output.telefone;
      } else {
        console.log(data.message);
        this.shared.setApiToken("");
        this.router.navigate(['/login']);
      }
    });
  }
  
  ngOnInit(): void {
    let token: string = "";
    this.shared.currentToken.subscribe(val => token = val);
    console.log(token);
    if (token.length > 15) {
      this.getPerfil(token);
    } else {

      axios.get('refreshtoken', {
        baseURL: environment.apiurl
      }).then(({ data }) => {
        if (data.success) {
          token = data.output.token;
          console.log(token);
          this.shared.setApiToken(data.output.token);
        } else {
          console.log(data.message);
          this.shared.setApiToken("");
          this.router.navigate(['/login']);
        }

        if (token) {
          this.getPerfil(token);
        } else {
          this.router.navigate(['/login']);
        }
      });
    }
  }
}
