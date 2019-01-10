import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { constantService } from '../../constant/constant.serive';
import { DepartmentData } from '../../interfaces/interfaces';

const data: DepartmentData = {
    "result": "success",
    "data": [
		{ 
			"id" : "1",
		    "departmentName" : "Construction",
		    "details" : {
		      "description" : "Construction Department ",
		    },
		    "features" : 0
		},
		{ 
			"id" : "1",
		    "departmentName" : "Finance",
		    "details" : {
		      "description" : "Finance Department ",
		    },
		    "features" : 1
		},
		{ 
			"id" : "1",
		    "departmentName" : "Construction",
		    "details" : {
		      "description" : "Construction Department ",
		    },
		    "features" : 2
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
    ) { }
    // pass params data
    public getData(): Observable<DepartmentData> {
        return  of(data);;
    }

    public getHistory(): Observable<any> {
		return of(history)
	}
}