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
        let url = `${environmentService.briclayApiBase}/projects?select=*&filter[_organisationId]=${orgID}`
        return this.apiService.get(url).pipe(map(res => res));
    }
    public getSingleProjects(projID): Observable<any> {
        let url = `${environmentService.briclayApiBase}/projects/${projID}`
        return this.apiService.get(url).pipe(map(res     => res));
    }

    public update(body, id): Observable<any> {
        let url = `${environmentService.briclayApiBase}/projects/${id}`
        return this.apiService.put(url, body).pipe(map(res => res));
    }

    public save(body: any): Observable<any> {
        let url = `${environmentService.briclayApiBase}/projects`
        return this.apiService.post(url, body).pipe(map(res => res));
    }
}

