'use strict';

import { Injectable } from "@angular/core";
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class SharedVariables {

    private token = new BehaviorSubject('token');
    currentToken = this.token.asObservable();

    constructor () { }

    setApiToken(token: string) {
        this.token.next(token);
    }


}