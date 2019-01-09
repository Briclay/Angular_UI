import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { constantService } from '../../constant/constant.serive';
import { UserDashboardData } from '../../interfaces/interfaces';

const data: UserDashboardData = {
	"result": "success",
	"data": [
		{
			"workRequestID": "R001", 
			"workOrderID": "A001", 
			"typeOfWork": "contractual", 
			"project": "Sound of water", 
			"package": "pillars", 
			"needByDate": "30/01/2019", 
			"workCategory": "electric", 
			"supportRole": "enginneer", 
			"assignee": "technicain", 
			"putintiateDate": "10/10/2017", 
			"RFAPutDate": "10/10/2017", 
			"WOPutDate": "10/10/2017", 
			"approvalintiateDate": "20/10/2017", 
			"RFAApprovalDate": "16/10/2017",
			"WOApprovalDate": "26/10/2017",
			"status": "Pending",
			"documentStatus": "Pending",
			"remarks": "Good",
		}
	]
}

@Injectable()
export class UserDashboardService {
	constructor(
	) { }
	// pass params data
	public getData(): Observable<UserDashboardData> {
		return of(data);;
	}
}