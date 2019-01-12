import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ApiService } from "../../../../services/api.service";

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
    constructor(private apiService: ApiService) { }
    public getProjects(request): Observable<any> {
        return this.apiService.get('./assets/data/projects.json').pipe(map(res => res));
    }
}