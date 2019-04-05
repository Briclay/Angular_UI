import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ApiService } from "./../api.service";
import { environmentService } from "./../../constant/environment";
import { map } from 'rxjs/operators';

@Injectable()	
export class NotificationService {
    constructor(
	    private apiService: ApiService,
    ) { }

	public getAll(): Observable<any> {
        let url = `${environmentService.briclayApiBase}/notifications`;
        return this.apiService.get(url).pipe(map(res => res));
    }

    public getOne(id): Observable<any> {
        let url =  `${environmentService.briclayApiBase}/notifications/${id}`;
        return this.apiService.get(url, id).pipe(map(res => res));
    }
   
    public update (id, request): Observable<any> {
        let url = `${environmentService.briclayApiBase}/notifications/${id}`;
        return this.apiService.put(url, request).pipe(map(res => res));
    }

    public delete (id): Observable<any> {
        let url = `${environmentService.briclayApiBase}/notifications/${id}`;
        return this.apiService.delete(url).pipe(map(res => res));
    }
}

