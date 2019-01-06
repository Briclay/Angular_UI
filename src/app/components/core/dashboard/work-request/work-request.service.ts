import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ApiService } from "../../../../services/api.service";

@Injectable({
  providedIn: 'root',
})
export class WorkRequestService {
    constructor(private apiService: ApiService) { }
    public getWorkRequest(): Observable<any> {
        return this.apiService.get('work-request.json').pipe(map(res => res));
    }
}