import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { constantService } from '../../constant/constant.serive';
import { UserDashboardData } from '../../interfaces/interfaces';

const data: UserDashboardData = {
    "result": "success",
    "data": [
		{    
			"workRequestID" : "R001",
			"workOrderID" : "A001",
			"typeOfWork" : "Contractual",
			"project" :"Sound of water",
			"package" : "Structural",
			"needByDate" : "15/02/2019",
		    "workCategory": "electric",
	      	"supportRole" : "enginneer",
	      	"assignee" : "technicain",
	      	"putintiateDate" : "10/10/2017",
		    "RFAPutDate" : "10/10/2017",
		    "WOPutDate" : "10/10/2017",
		    "approvalintiateDate" : "20/10/2017",
		    "RFAApprovalDate" : "16/10/2017",
		    "WOApprovalDate" : "26/10/2017",
		    "status": "Pending",
	      	"documentStatus" : "Pending",
	      	"remarks" : "Good",
		},
		{    
			"workRequestID" : "R002",
			"workOrderID" : "A002",
			"typeOfWork" : "Excavation",
			"project" :"The Tree",
			"package" : "Finshing",
			"needByDate" : "30/01/2019",
		    "workCategory": "electric",
	      	"supportRole" : "enginneer",
	      	"assignee" : "technicain",
	      	"putintiateDate" : "10/10/2017",
		    "RFAPutDate" : "10/10/2017",
		    "WOPutDate" : "10/10/2017",
		    "approvalintiateDate" : "20/10/2017",
		    "RFAApprovalDate" : "16/10/2017",
		    "WOApprovalDate" : "26/10/2017",
		    "status": "Pending",
	      	"documentStatus" : "Pending",
	      	"remarks" : "Good",
		},
		{    
			"workRequestID" : "R003",
			"workOrderID" : "A004",
			"typeOfWork" : "Consulting",
			"project" :"Plan Beach",
			"package" : "Design Work",
			"needByDate" : "05/02/2019",
		    "workCategory": "electric",
	      	"supportRole" : "enginneer",
	      	"assignee" : "technicain",
	      	"putintiateDate" : "10/10/2017",
		    "RFAPutDate" : "10/10/2017",
		    "WOPutDate" : "10/10/2017",
		    "approvalintiateDate" : "20/10/2017",
		    "RFAApprovalDate" : "16/10/2017",
		    "WOApprovalDate" : "26/10/2017",
		    "status": "Pending",
	      	"documentStatus" : "Pending",
	      	"remarks" : "Good",
		},
		{    
			"workRequestID" : "R004",
			"workOrderID" : "A004",
			"typeOfWork" : "Architectural",
			"project" :"The park",
			"package" : "Excavation",
			"needByDate" : "10/02/2019",
		    "workCategory": "electric",
	      	"supportRole" : "enginneer",
	      	"assignee" : "technicain",
	      	"putintiateDate" : "10/10/2017",
		    "RFAPutDate" : "10/10/2017",
		    "WOPutDate" : "10/10/2017",
		    "approvalintiateDate" : "20/10/2017",
		    "RFAApprovalDate" : "16/10/2017",
		    "WOApprovalDate" : "26/10/2017",
		    "status": "Pending",
	      	"documentStatus" : "Pending",
	      	"remarks" : "Good",
		}
		

	]
}

@Injectable()
export class UserDashboardService {
    constructor(
    ) { }
    // pass params data
    public getData(): Observable<UserDashboardData> {
        return  of(data);;
    }
}