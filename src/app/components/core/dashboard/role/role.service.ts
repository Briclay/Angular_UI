import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { RoleData } from './interfaces';
import { ApiService } from "../../../../services/api.service";

@Injectable({
  providedIn: 'root',
})
export class RoleService {
    constructor( 
		private apiService: ApiService
    ) { }
    // pass params data
    public getData(ordID): Observable<RoleData> {
        let url = `https://briclay-core.herokuapp.com/roles?select=all&filter[_organisationId]=${ordID}`
        return this.apiService.get(url).pipe(map(res     => res));
    }
}