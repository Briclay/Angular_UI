import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ApiService } from "../../../../services/api.service";
import {environmentService} from "../../../../constant/environment"

@Injectable({
  providedIn: 'root',
})

export class NcmService {
    
    constructor(private apiService: ApiService) { }

    public getNcm(): Observable<any> {
        const url = `${environmentService.briclayApiBase}/ncm`
        //const url = `http://localhost:9999/ncm`
        return this.apiService.get(url).pipe(map(res => res));
    }

    public getNcmAnalytics(): Observable<any> {
         let url = `${environmentService.briclayApiBase}/ncm/analytics`;
        return this.apiService.get(url).pipe(map(res => res));
    }

     public getNcmBpdListAnalytics(): Observable<any> {
        let url = `${environmentService.briclayApiBase}/ncm/bpd-list/analytics`;
        return this.apiService.get(url).pipe(map(res => res));
    }

    public getSingleNcm(id): Observable<any> {
        const url = `${environmentService.briclayApiBase}/ncm/${id}`
        return this.apiService.get(url).pipe(map(res => res));
    }

    public saveNcm(request): Observable<any> {
        const url = `${environmentService.briclayApiBase}/ncm`
        //const url = `http://localhost:9999/ncm`
        return this.apiService.post(url, request).pipe(map(res => res));
    }

    public updateNcm(request ,id): Observable<any> {
        const url = `${environmentService.briclayApiBase}/ncm/${id}`
        return this.apiService.put(url, request).pipe(map(res => res));
    }
}

