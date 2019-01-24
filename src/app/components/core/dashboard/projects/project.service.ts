import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ApiService } from "../../../../services/api.service";

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
    
    constructor(private apiService: ApiService) { }
    public getProjects(orgID): Observable<any> {
        let url = `https://briclay-core.herokuapp.com/projects?select=name&filter[_organisationId]=${orgID}`
        return this.apiService.get(url).pipe(map(res => res));
    }
    public getSingleProjects(projID): Observable<any> {
        let url = `https://briclay-core.herokuapp.com/projects/${projID}`
        return this.apiService.get(url).pipe(map(res     => res));
    }
}

