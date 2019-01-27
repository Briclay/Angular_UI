import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { constantService } from '../../constant/constant.serive';
import { DepartmentData } from '../../interfaces/interfaces';
import { ApiService } from "./../api.service";
import { environmentService } from "./../../constant/environment";
import { map } from 'rxjs/operators';

/*const data: DepartmentData = {
    "result": "success",
    "data": [
		{ 
			"id" : "1",
		    "name" : "Construction",
	      	"description" : "Construction Department ",
		    "features" : ['0']
		},
		{ 
			"id" : "1",
		    "name" : "Finance",
	      	"description" : "Finance Department ",
		    "features" : ["1"]
		},
		{ 
			"id" : "1",
		    "name" : "Construction",
	      	"description" : "Construction Department ",
		    "features" : ["2"]
		}
	]
}
*/
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
export class DepartmentService {
    constructor(
	    private apiService: ApiService,
    ) { }

    public getHistory(): Observable<any> {
		return of(history)
	}

	public getAll(id): Observable<any> {
        let url = `${environmentService.briclayCore}/departments?select=*&filter[_organisationId]=${id}`;
        return this.apiService.get(url).pipe(map(res => res));
    }

	public getDepartmentByOrg(OrgId): Observable<any> {
        let url = `${environmentService.briclayCore}/departments?select=*&${OrgId}`;
        return this.apiService.get(url).pipe(map(res => res));
    }

    public getOne(id): Observable<any> {
        let url = `${environmentService.briclayCore}/departments/${id}`;
        return this.apiService.get(url, id).pipe(map(res => res));
    }

    public update(id , request): Observable<any> {
        let url = `${environmentService.briclayCore}/departments/${id}`;
        return this.apiService.put(url, request).pipe(map(res => res));
    }

    public save(request): Observable<any> {
        let url = `${environmentService.briclayCore}/departments`;
        return this.apiService.post(url, request).pipe(map(res => res));
    }

    /*public deleteDept(request): Observable<any> {
        let url = "/departments?select=*";
        return this.apiService.post(url, request).pipe(map(res => res));
    }*/
}