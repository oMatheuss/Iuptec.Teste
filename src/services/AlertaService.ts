import { Injectable } from '@angular/core';
import { AlertaComponent } from 'src/app/alerta/alerta.component';

@Injectable()
export class AlertaService {
	openAlert = Function();
	ref: object | undefined;

	constructor() { }

	listen(fn : Function, ref: [object]) {
		this.ref = ref[0];
		this.openAlert = fn;
	}

	call(title: string, message: string, type: string) {
		this.openAlert.apply(this.ref, [{title, message, type}]);
	}
}