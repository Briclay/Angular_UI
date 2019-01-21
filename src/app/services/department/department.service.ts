import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { constantService } from '../../constant/constant.serive';
import { DepartmentData } from '../../interfaces/interfaces';
import { ApiService } from "./../api.service";
import { map } from 'rxjs/operators';

const data: DepartmentData = {
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
    // pass params data
    public getData(): Observable<DepartmentData> {
        return  of(data);;
    }

    public getHistory(): Observable<any> {
		return of(history)
	}

	public getAll(request): Observable<any> {
        let url = "https://matkraft-api.herokuapp.com/api/v1/departments?filter[_organisationId]=5a58438f734d1d61613f6ed9";
        return this.apiService.get(url, request).pipe(map(res => res));
    }

    public getOne(request): Observable<any> {
        let url = "https://matkraft-api.herokuapp.com/api/v1/departments/5a5848c98e64e99e47f98a8d";
        return this.apiService.get(url, request).pipe(map(res => res));
    }

    public update(id , request): Observable<any> {
        let url = "https://matkraft-api.herokuapp.com/api/v1/departments/5a5848c98e64e99e47f98a8d";
        return this.apiService.put(url, request).pipe(map(res => res));
    }

    public save(request): Observable<any> {
        let url = "https://matkraft-api.herokuapp.com/api/v1/departments";
        return this.apiService.post(url, request).pipe(map(res => res));
    }

    /*public deleteDept(request): Observable<any> {
        let url = "https://matkraft-api.herokuapp.com/api/v1/departments/5a5848c98e64e99e47f98a8d";
        return this.apiService.post(url, request).pipe(map(res => res));
    }*/
}