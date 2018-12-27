import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

// import { ApiService } from '../api.service';
import { roleData } from '../../interfaces/interfaces'

@Injectable({
  providedIn: 'root',
})

export class RoleService {
    data = [
		{ 
			"id" : "1",
		    "roleNane": "Admin",
		    "details" : {
		      "department" : "Finance",
		      "shift" : "Regular",
		      "subrole" : "Technician"
		    },
		    "features" : 0,
		    "approvels" : 0
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
		    "approvels" : 1
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
		    "approvels" : 2
		}
	]

    public getData(): Observable<roleData> {
        return of(this.data);
    }

}