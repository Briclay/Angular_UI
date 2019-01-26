import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ApiService } from "../../../../services/api.service";
import { environmentService } from "../../../../constant/environment";

@Injectable({
    providedIn: 'root',
})
export class UserService {

    constructor(private apiService: ApiService) { }
    public getUser(orgID): Observable<any> {
        let url = `${environmentService.briclayCore}/users?select=name&filter[_organisationId]=${orgID}`
        return this.apiService.get(url).pipe(map(res => res));
    }
    public getSingleUser(projID): Observable<any> {
        let url = `${environmentService.briclayCore}/users/${projID}`
        return this.apiService.get(url).pipe(map(res => res));
    }
}

