import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ApiService } from "../../../../services/api.service";
import { environmentService } from "../../../../constant/environment";

@Injectable({
  providedIn: 'root',
})
export class FeedbackService {
    
    constructor(private apiService: ApiService) { }
    public getAll(orgID): Observable<any> {
        let url = `${environmentService.briclayApiBase}/feedback?${orgID}`
        return this.apiService.get(url).pipe(map(res => res));
    }
   
    public save(body: any): Observable<any> {
        let url = `${environmentService.briclayApiBase}/feedback`
        return this.apiService.post(url, body).pipe(map(res => res));
    }
}