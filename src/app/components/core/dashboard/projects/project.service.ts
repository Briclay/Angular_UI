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
        return this.apiService.get('./assets/data/projects.json').pipe(map(res => res));
    }
    public getSingleProjects(projID): Observable<any> {
        let url = `./assets/data/singleProject.json`
        return this.apiService.get(url).pipe(map(res => res));
    }
}