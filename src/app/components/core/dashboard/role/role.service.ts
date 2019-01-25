import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { RoleData } from './interfaces';
import { ApiService } from "../../../../services/api.service";
import { environmentService } from "../../../../constant/environment";

const history = {
	"result": "success",
    "data": [
		{
			username: 'username1',
			changedBy: 'Admin',
			changedDate: '01/12/2017'
		},
		{
			username: 'username1',
			changedBy: 'Admin',
			changedDate: '01/12/2017'
		},
		{
			username: 'username1',
			changedBy: 'Admin',
			changedDate: '01/12/2017'
		}
	]
}

@Injectable({
  providedIn: 'root',
})
export class RoleService {
    constructor( 
		private apiService: ApiService
    ) { }
    // pass params data
    public getData(ordID): Observable<RoleData> {
        let url = `${environmentService.briclayCore}/roles?select=all&filter[_organisationId]=${ordID}`
        return this.apiService.get(url).pipe(map(res     => res));
    }

	public getHistory(): Observable<any> {
		return of(history)
	}

	/*public createRole(request): Observable<any> {
        let url = "https://matkraft-api.herokuapp.com/api/v1/roles?filter[_organisationId]=5a58438f734d1d61613f6ed9";
        return this.apiService.post(url, request).pipe(map(res => res));
    }*/
}