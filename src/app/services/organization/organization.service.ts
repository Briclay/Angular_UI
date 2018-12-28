import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { constantService } from '../../constant/constant.serive';
import { OrganizationData } from '../../interfaces/interfaces';

const data: OrganizationData = {
    "result": "success",
    "data": [
		{
			"id": "1",
			"orgName": "Purvankara Limited",
			"orgAddress": "Ulsoor bangalore",
			"subsciption": {
				"plan": "Premium"
			},
			"details": {
				"email": "xyz@mail.com",
				"Address": "Ulsoor bangalore"
			},
			"entities": {
				"count": "1",
				"validtill": "15/06/2018"
			}
		},
		{
			"id": "2",
			"orgName": "Purvankara Limited",
			"orgAddress": "JP nagar bangalore",
			"subsciption": {
				"plan": "Premium1"
			},
			"details": {
				"email": "xyz2@mail.com",
				"Address": "JP nagar bangalore"
			},
			"entities": {
				"count": "2",
				"validtill": "10/10/2018"
			}
		},
		{
			"id": "3",
			"orgName": "Purvankara Limited",
			"orgAddress": "ITPL bangalore",
			"subsciption": {
				"plan": "Premium2"
			},
			"details": {
				"email": "xyz3@mail.com",
				"Address": "ITPL bangalore"
			},
			"entities": {
				"count": "3",
				"validtill": "25/11/2018"
			}
		}
	]
}

@Injectable()
export class OrganizationService {
    constructor(
    ) { }
    // pass params data
    public getData(): Observable<OrganizationData> {
        return  of(data);;
    }
}

