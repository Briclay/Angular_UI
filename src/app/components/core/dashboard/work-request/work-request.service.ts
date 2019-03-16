import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ApiService } from "../../../../services/api.service";
import {environmentService} from "../../../../constant/environment"

@Injectable({
  providedIn: 'root',
})
export class WorkRequestService {
    constructor(private apiService: ApiService) { }
    public getWorkRequest(orgID): Observable<any> {
        const url = `${environmentService.briclayApiBase}/work-request?${orgID}&order=createdAt&sort=desc`;
        return this.apiService.get(url).pipe(map(res => res));
    }
    public getSingleWork(id): Observable<any> {
        const url = `${environmentService.briclayApiBase}/work-config/${id}`;
        return this.apiService.get(url).pipe(map(res => res));
    }

    public saveWorkRequest(request): Observable<any> {
        const url = `${environmentService.briclayApiBase}/work-request`;
        return this.apiService.post(url, request).pipe(map(res => res));
    }
     public saveWorkConfig(request): Observable<any> {
        const url = `${environmentService.briclayApiBase}/work-config`;
        return this.apiService.post(url, request).pipe(map(res => res));
    }
     public updateWorkConfig(request): Observable<any> {
        const url = `${environmentService.briclayApiBase}/work-config`;
        return this.apiService.post(url, request).pipe(map(res => res));
    }


    public getWorkConfig(orgID): Observable<any> {
        const url = `${environmentService.briclayApiBase}/work-config?${orgID}&configValues=WORK_CATEGORY`;
        return this.apiService.get(url).pipe(map(res => res));
    }

    public updateWorkRequest(request, requestID): Observable<any> {
        const url = `${environmentService.briclayApiBase}/work-request/${requestID}`;
        return this.apiService.put(url, request).pipe(map(res => res));
    }
}