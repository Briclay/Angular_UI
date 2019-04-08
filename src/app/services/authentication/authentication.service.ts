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

   /* flag = 0;

     public getFlag(request): Observable<any> {
        let url = `${environmentService.briclayApiBase}/auth/signin`;
        return this.apiService.post(url, request).pipe(map(res => res));
    }*/

    public login(request): Observable<any> {
        let url = `${environmentService.briclayApiBase}/auth/signin`;
        return this.apiService.post(url, request).pipe(map(res => res));
    }

    public register(request): Observable<any> {
        let url = `${environmentService.briclayApiBase}/auth/signup`;
        return this.apiService.post(url, request).pipe(map(res => res));
    }

    public forgotPwd(query: string, request): Observable<any> {
        let url = `${environmentService.briclayApiBase}/auth/forgot?email=${query}`;
        return this.apiService.post(url,request).pipe(map(res => res));
    }

    public changePassword(id, request): Observable<any> {
        let url = `${environmentService.briclayApiBase}/users/${id}`;
        return this.apiService.put(url, request).pipe(map(res => res));
    }

    public resetPwd(request, token): Observable<any> {
        let url = `${environmentService.briclayApiBase}/auth/reset?token=${token}`;
        return this.apiService.post(url, request).pipe(map(res => res));
    }
}