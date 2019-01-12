import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ApiService } from "../../../../services/api.service";

@Injectable({
  providedIn: 'root',
})
export class WorkRequestService {
    constructor(private apiService: ApiService) { }
    public getWorkRequest(orgID): Observable<any> {
        let url = `https://briclay-work-tracker.herokuapp.com/work-request?${orgID}&order=createdAt&sort=desc`;
        return this.apiService.get(url).pipe(map(res => res));
    }

    public saveWorkRequest(request): Observable<any> {
        let url = `https://briclay-work-tracker.herokuapp.com/work-request?filter[_organisationId]=5a5844cd734d1d61613f7066&order=createdAt&sort=desc`;
        return this.apiService.post(url, request).pipe(map(res => res));
    }

    public getWorkCategory(orgID): Observable<any> {
        let url = `https://briclay-work-tracker.herokuapp.com/work-config?${orgID}&configValues=WORK_CATEGORY`;
        return this.apiService.get(url).pipe(map(res => res));
    }

    public updateWorkRequest(request, requestID): Observable<any> {
        let url = `https://briclay-work-tracker.herokuapp.com/work-request/${requestID}`;
        return this.apiService.put(url, request).pipe(map(res => res));
    }
}