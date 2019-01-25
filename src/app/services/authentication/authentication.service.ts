import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ApiService } from "./../api.service";
import {environmentService} from "./../../constant/environment"

@Injectable({
 providedIn: 'root',
})

export class AuthenticationService {
    constructor(private apiService: ApiService) { }
    // pass params data

    public login(request): Observable<any> {
        let url = `${environmentService.briclayCore}/auth/signin`;
        return this.apiService.post(url, request).pipe(map(res => res));
    }
}