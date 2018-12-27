import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { constantService } from '../../constant/constant.serive';
import { RoleData } from '../../interfaces/interfaces';

const data: RoleData = {
    "result": "success",
    "data": [
		{ 
			"id" : "1",
		    "roleNane": "Admin",
		    "details" : {
		      "department" : "Construction",
		      "shift" : "Regular",
		      "subrole" : "Technician"
		    },
		    "features" : 0,
		    "approvals" : 0
		},
		{ 
			"id" : "2",
		    "roleNane": "Manager",
		    "details" : {
		      "department" : "Finance",
		      "shift" : "Day",
		      "subrole" : "Technician"
		    },
		    "features" : 1,
		    "approvals" : 1
		},
		{
		  	"id" : "3",
		    "roleNane": "Design",
		    "details" : {
		      "department" : "Finance",
		      "shift" : "Night",
		      "subrole" : "Technician"
		    },
		    "features" : 2,
		    "approvals" : 2
		}
	]
}

@Injectable()
export class RoleService {
    constructor(
    ) { }
    // pass params data
    public getData(): Observable<RoleData> {
        return  of(data);;
    }
}