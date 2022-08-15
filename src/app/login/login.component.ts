import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import axios from 'axios';
import { environment } from 'src/environments/environment';
import { SharedVariables } from '../commons/shared.variables';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  title: string = "Login"
  email: string = "";
  senha: string = "";

  constructor(
    private shared: SharedVariables,
    private route: Router ) {
  }

  ngOnInit(): void {
    let token: string = "";
    this.shared.currentToken.subscribe(val => token = val);
    if (token) {
      this.route.navigate(['/home']);
    }
  }
  
  formSubmit(f: NgForm): void {
    axios.post("/login", f.value, {
      baseURL: environment.apiurl,
    }).then(({ data }) => {
      if (data.success) {
        console.log(data.output.token); 
        this.shared.setApiToken(data.output.token);
        this.route.navigate(['/home']);
      } else {
        console.log(data.message);
      }
    })
  }
}
