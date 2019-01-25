import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ApiService } from "../../../../services/api.service";
import {environmentService} from "../../../../constant/environment"

@Injectable({
  providedIn: 'root',
})
export class WorkOrderService {
    constructor(private apiService: ApiService) { }
    public getWorkOrder(orgId): Observable<any> {
        let url = `${environmentService.briclayWorkRequest}/work-order?${orgId}&order=createdAt&sort=desc`
        return this.apiService.get(url).pipe(map(res => res));
    }
}