import { Component, OnInit, OnDestroy } from '@angular/core';
import { SharedVariables } from './commons/shared.variables';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  token: string = "";
  title = 'Inicio';
  subscription: Subscription | undefined;

  constructor (
    private shared : SharedVariables) {
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  ngOnInit(): void {
    this.subscription = this.shared.currentToken.subscribe(token => this.token = token);
  }
}
