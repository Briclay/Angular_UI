import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ApiService } from "../../../../services/api.service";
import { environmentService } from "../../../../constant/environment";

@Injectable({
  providedIn: 'root'
})
export class BpdListService {

  constructor(private apiService: ApiService) { }

    public getAll(): Observable<any> {
        let url = `${environmentService.briclayApiBase}/bpd`;
        //const url = `http://localhost:9999/bpd`

        return this.apiService.get(url).pipe(map(res => res));
    }

	// public getBpdList(Id): Observable<any> {
    //        let url = `${environmentService.briclayApiBase}/bpd/${Id}`;
    //        return this.apiService.get(url).pipe(map(res => res));
    //    }

    // public getOne(id): Observable<any> {
    //     let url = `${environmentService.briclayApiBase}/bpd/${id}`;
    //     return this.apiService.get(url, id).pipe(map(res => res));
    // }

    public update(id , request): Observable<any> {
        let url = `${environmentService.briclayApiBase}/bpd/${id}`;
        return this.apiService.put(url, request).pipe(map(res => res));
    }

    public save(request): Observable<any> {
        let url = `${environmentService.briclayApiBase}/bpd`;
        return this.apiService.post(url, request).pipe(map(res => res));
    }
}
