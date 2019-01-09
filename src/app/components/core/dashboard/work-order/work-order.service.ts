import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ApiService } from "../../../../services/api.service";

@Injectable({
  providedIn: 'root',
})
export class WorkOrderService {
    constructor(private apiService: ApiService) { }
    public getWorkOrder(): Observable<any> {
        let url = `https://briclay-work-tracker.herokuapp.com/work-order?filter[_organisationId]=5a5844cd734d1d61613f7066&order=createdAt&sort=desc`
        return this.apiService.get(url).pipe(map(res => res));
    }
}