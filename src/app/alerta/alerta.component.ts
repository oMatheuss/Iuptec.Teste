import { Component, OnInit } from '@angular/core';
import { AlertaService } from 'src/services/AlertaService';

@Component({
	selector: 'app-alerta',
	templateUrl: './alerta.component.html',
	styleUrls: ['./alerta.component.css']
})
export class AlertaComponent implements OnInit {
	data = {
		title: "Teste",
		message: "Essa é uma mensagem de teste",
		type: "success"
	}
	hide = true;
	timer: number = 0;

	constructor(private alertaService : AlertaService) {
	}

	ngOnInit(): void {
		this.alertaService.listen(this.openAlert, [this]);
	}

	openAlert({title = "", message = "", type = ""}) {
		this.data = {
			title: title,
			message:  message,
			type: type
		}
		if (this.hide) {
			this.hide = false;
			this.timer = setTimeout(() => {
				this.closeAlert.apply(this);
			}, 7000, [this.hide]);
		} else {
			this.resetTimer();
		}
	}
	
	closeAlert() {
		this.hide = true;
		clearTimeout(this.timer);
	}

	resetTimer() {
		clearTimeout(this.timer);
		this.timer = setTimeout(() => {
			this.closeAlert.apply(this);
		}, 7000, [this.hide]);
	}
}
