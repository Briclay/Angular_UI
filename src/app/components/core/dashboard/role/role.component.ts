import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss']
})
export class RoleComponent implements OnInit {

	editAdminFlag = false;
    editAddressFlag = false;
    editPreminumFlag  = false;
    getFeatures = false;
    value: string;
  	viewValue: string;
    features =  [
	    {value: 'steak-0', viewValue: 'File'},
	    {value: 'pizza-1', viewValue: 'Service Request'},
	    {value: 'tacos-2', viewValue: 'Snag Master'}
	  ];

	orgData = [
		  { 
			  	"id" : "1",
			    "roleName": "Admin",
			    "details" : {
			    	"department":"Operation",
			    	"shifts":"Day",
			    	"subrole":"Admin"
			    },
			    "features" : 0,
			    "approvels" : 0
		  },
		  { 
			  	"id" : "2",
			    "roleName": "Manager",
			    "details" : {
			    	"department":"Operation",
			    	"shifts":"Day",
			    	"subrole":"Admin"
			    },
			    "features" : 0,
			    "approvels" : 0
		  },
		  { 
			  	"id" : "3",
			    "roleName": "Design",
			    "details" : {
			    	"department":"Operation",
			    	"shifts":"Day",
			    	"subrole":"Admin"
			    },
			    "features" : 0,
			    "approvels" : 0
		  }
		]
  	constructor() { }

  	ngOnInit() {
  		console.log(this.orgData,"**")
  	}
    
  	editAdmin(){
  		this.editAdminFlag = true;
  	}
  	editAddress(){
  		this.editAddressFlag = true;
  	}
  	editPreminum(){
  		this.editPreminumFlag = true;
  	}
  	getFeatureDropdown (){
  		this.getFeatures = true;
  	}


}
