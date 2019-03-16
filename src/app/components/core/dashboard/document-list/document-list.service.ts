import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ApiService } from "../../../../services/api.service";
import { environmentService } from "../../../../constant/environment";

@Injectable({
  providedIn: 'root'
})
export class DocumentListService {

  constructor(private apiService: ApiService) { }


    public getAll(projectId,orgId): Observable<any> {
        let url = `${environmentService.briclayApiBase}/list?filter[_projectId]=${projectId}&filter[_organisationId]=${orgId}`;
        return this.apiService.get(url).pipe(map(res => res));
    }
    public getOne(id): Observable<any> {
        let url = `${environmentService.briclayApiBase}/list/${id}`;
        return this.apiService.get(url, id).pipe(map(res => res));
    }
    public update(id , request): Observable<any> {
        let url = `${environmentService.briclayApiBase}/list/${id}`;
        return this.apiService.put(url, request).pipe(map(res => res));
    }

    public save(request): Observable<any> {
        let url = `${environmentService.briclayApiBase}/list`;
        return this.apiService.post(url, request).pipe(map(res => res));
    }

}
