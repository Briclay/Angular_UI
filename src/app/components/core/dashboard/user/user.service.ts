import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ApiService } from "../../../../services/api.service";
import {environmentService} from "../../../../constant/environment"


@Injectable({
  providedIn: 'root'
})
export class UserService {
    constructor(
        private apiService: ApiService
    ) { }
    // pass params data
    public getUser(orgID?): Observable<any> {
        let url = `${environmentService.briclayApiBase}/users?select=all&filter[_organisationId]=${orgID}`
        return this.apiService.get(url).pipe(map(res => res));
    }

    public getUserByDepId(depID): Observable<any> {
        let url = `${environmentService.briclayApiBase}/users?select=all&filter[_departmentId]=${depID}`
        return this.apiService.get(url).pipe(map(res => res));
    }

    public getSingleUser(userID): Observable<any> {
        let url = `${environmentService.briclayApiBase}/users/${userID}`
        return this.apiService.get(url).pipe(map(res => res));
    }

    public saveUser(request?): Observable<any> {
        let url = `${environmentService.briclayApiBase}/users`
        return this.apiService.post(url, request).pipe(map(res => res));
    }

    public updateUser(userId, request): Observable<any> {
        let url = `${environmentService.briclayApiBase}/users/${userId}`;
        return this.apiService.put(url, request).pipe(map(res => res));
    }

}
