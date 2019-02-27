import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ApiService } from "../../../../services/api.service";
import { environmentService } from "../../../../constant/environment";

@Injectable({
  providedIn: 'root',
})
export class IssueTrackerService {
    
    constructor(private apiService: ApiService) { }

    public getAllIssueTracker(): Observable<any> {
		let url = `${environmentService.briclayApiBase}/issue-tracker`
        return this.apiService.get(url).pipe(map(res => res));
	}

	public getSingleIssueTracker(id, request): Observable<any> {
        let url = `${environmentService.briclayApiBase}/issue-tracker/${id}`;
        return this.apiService.get(url, request).pipe(map(res => res));
    }

	public createIssueTracker(request): Observable<any> {
        let url = `${environmentService.briclayApiBase}/issue-tracker`;
        return this.apiService.post(url, request).pipe(map(res => res));
    }

	public updateIssueTracker(id, request): Observable<any> {
        let url = `${environmentService.briclayApiBase}/issue-tracker/${id}`;
        return this.apiService.put(url, request).pipe(map(res => res));
    }
}

