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

    public getWorkRequest(filter): Observable<any> {
        const url = `${environmentService.briclayApiBase}/work-request?${filter}&order=createdAt&sort=desc`;
        return this.apiService.get(url).pipe(map(res => res));
    }

    public saveWorkRequest(request): Observable<any> {
        const url = `${environmentService.briclayApiBase}/work-request`;
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

    public getWorkRequestAnalytics(orgID): Observable<any> {
        const url = `${environmentService.briclayApiBase}/work-request/analytics?filter[_organisationId]=${orgID}`;
        return this.apiService.get(url).pipe(map(res => res));
    }
    public getWorkRequestProjectsAnalytics(orgID): Observable<any> {
        const url = `${environmentService.briclayApiBase}/work-request/project/analytics?filter[_organisationId]=${orgID}`;
        return this.apiService.get(url).pipe(map(res => res));
    }
}