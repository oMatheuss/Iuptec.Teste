import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from './commons/ApiService';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Inicio';

  constructor(private api: ApiService, private router: Router) {}

  ngOnDestroy(): void {
  }

  ngOnInit(): void {
  }

  logout() {
    this.api.Logout().then(() => {
      this.router.navigate(['/login']);
    });
  }
}
