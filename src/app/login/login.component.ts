import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertaService } from 'src/services/AlertaService';
import { ApiService } from 'src/services/ApiService';

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
		private route: Router,
		private alert : AlertaService) {
	}

	ngOnInit(): void {
	}

	formSubmit(f: NgForm): void {
		this.api.tryLogin(this.email, this.senha).then((data) => {
			if (data.success) {
				this.route.navigate(['/home']);
			} else {
				this.alert.call("Atenção", data.message, "warning");
			}
		}).catch((reason : Error) => {
			this.alert.call("Atenção", reason.message, "danger");
		});
	}
}
