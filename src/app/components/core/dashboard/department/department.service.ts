import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ApiService } from "../../../../services/api.service";
import {environmentService} from "../../../../constant/environment"


@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
    constructor(
        private apiService: ApiService
    ) { }
    // pass params data
    public getAllDept(orgId?): Observable<any> {
        let url = `${environmentService.briclayCore}/departments?select=all&filter[_organisationId]=${orgId}`
        return this.apiService.get(url).pipe(map(res => res));
    }

}
