import { Component, OnInit, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { ApiService } from '../services/ApiService';

const publicRoutes = [
	"/login", "/cadastro"
]

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
	title = 'Inicio';
	route = '';

	constructor(private api: ApiService, private router: Router) {

		this.router.events.subscribe((event) => {
			if (event instanceof NavigationStart) {
				this.route = event.url;

				if (publicRoutes.includes(event.url)) {
					if (this.api.isLogged) {
						this.router.navigate(['/home']);
					} else {
						this.api.refreshToken().then((valid) => {
							if (valid) {
								this.router.navigate(['/home']);
							}
						});
					}
				} else {
					if (!this.api.isLogged) {
						(async () => {
							let valid = await this.api.refreshToken();
							if (!valid) {
								this.router.navigate(['/login']);
							}
						})();
					}
				}
			}
		});

	}

	ngOnDestroy(): void {
	}

	ngOnInit(): void {
	}

	logout() {
		this.api.Logout().then(() => {
			this.router.navigate(['/login']);
		});
	}

	goTo(route : string) {
		if (route === this.route) return;
		this.router.navigate([route]);
	}
}
