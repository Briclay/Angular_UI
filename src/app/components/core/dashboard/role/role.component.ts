import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss']
})
export class RoleComponent implements OnInit {
	editAdminFlag = false;
    editshiftFlag = false;
    editPreminumFlag  = false;
    getFeatures = false;
    value: string;
  	viewValue: string;
  	roleDataOptions : any;
    features  =  [
	    {value: 'steak-0', viewValue: 'File'},
	    {value: 'pizza-1', viewValue: 'Service Request'},
	    {value: 'tacos-2', viewValue: 'Snag Master'}
	];

	roleData = [
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
	/*orgData = [
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
		]*/
  	constructor() { }

  	ngOnInit() {
		this.roleDataOptions = [
        {
          title: 'User Name', type: 'list', list: [
            { title: 'UserName', key: 'roleNane', hideTitle: true, type: 'label' },
          ]
        }, 
        {
			title: 'Features', key: 'features'
		},
		 {
			title: 'Approvals', key: 'approvels'
		}
		]
  	}
    
  	editAdmin(){
  		this.editAdminFlag = true;
  	}
  	editshift(){
  		this.editshiftFlag = true;
  	}
  	editPreminum(){
  		this.editPreminumFlag = true;
  	}
  	getFeatureDropdown(){
  		this.getFeatures = true;
  	}


}
