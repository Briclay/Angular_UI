import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { constantService } from '../../constant/constant.serive';
import { RoleData } from '../../interfaces/interfaces';
import { map } from 'rxjs/operators';

const data: RoleData = {
    "result": "success",
    "data": [
		{ 
			"_organisationId" : "1",
		    "name": "Admin",
		    "description" : "this role",
		    "_departmentId" : "Construction",
		    "features" : "0",
		    "approvals" : "0"
		},
		{ 
			"_organisationId" : "2",
		    "name": "Manager",
		    "description" : "this role",
	      	"_departmentId" : "Finance",
		    "features" : "1",
		    "approvals" : "1"
		},
		{
		  	"_organisationId" : "3",
		    "name": "Design",
		    "description" : "this role",
	      	"_departmentId" : "Finance",
		    "features" : "2",
		    "approvals" : "2"
		}
	]
}

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

@Injectable()
export class RoleService {
    constructor(
	    //private apiService: ApiService,
    ) { }
    // pass params data
    public getData(): Observable<RoleData> {
        return  of(data);;
    }

    public getHistory(): Observable<any> {
		return of(history)
	}

	/*public createRole(request): Observable<any> {
        let url = "https://matkraft-api.herokuapp.com/api/v1/roles?filter[_organisationId]=5a58438f734d1d61613f6ed9";
        return this.apiService.post(url, request).pipe(map(res => res));
    }*/
}