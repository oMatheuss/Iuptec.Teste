import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../commons/ApiService';

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
    private api: ApiService,
    private route: Router ) {
  }

  ngOnInit(): void {
    this.api.validateToken().then(valid => {
      if (valid)
        this.route.navigate(['/home']);
    }).catch(reason => {
      alert(reason);
    })
  }
  
  formSubmit(f: NgForm): void {
    this.api.tryLogin(this.email, this.senha).then((data) => {
      if (data.success) {
        this.route.navigate(['/home']);
      } else {
        console.log(data.message);
      }
    }).catch((reason : Error) => {
      alert(reason.message);
    })
  }
}
