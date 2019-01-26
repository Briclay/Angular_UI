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

	public getFeatures(userType, departID): Observable<any> {
		let url = `${environmentService.briclayCore}/rolefeatures?userType=${userType}&departmentId=${departID}`
        return this.apiService.get(url).pipe(map(res => res));
	}

	public createRole(request): Observable<any> {
        let url = `${environmentService.briclayCore}/roles?filter[_organisationId]=${request._organisationId}`;
        return this.apiService.post(url, request).pipe(map(res => res));
    }

	public updateRole(roleId, request): Observable<any> {
        let url = `${environmentService.briclayCore}/roles/${roleId}`;
        return this.apiService.put(url, request).pipe(map(res => res));
    }
}