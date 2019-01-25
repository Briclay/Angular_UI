import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ApiService } from "../../../../services/api.service";
import { environmentService } from "../../../../constant/environment";

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
    
    constructor(private apiService: ApiService) { }
    public getProjects(orgID): Observable<any> {
        let url = `${environmentService.briclayCore}/projects?select=name&filter[_organisationId]=${orgID}`
        return this.apiService.get(url).pipe(map(res => res));
    }
    public getSingleProjects(projID): Observable<any> {
        let url = `${environmentService.briclayCore}/projects/${projID}`
        return this.apiService.get(url).pipe(map(res     => res));
    }
}

