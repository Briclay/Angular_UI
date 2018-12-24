import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-organisation',
  templateUrl: './organisation.component.html',
  styleUrls: ['./organisation.component.scss']
})
export class OrganisationComponent implements OnInit {
    value: string;
  	viewValue: string;
		organizationDataOptions: any;
    features: Featues[] = [
	    {value: 'steak-0', viewValue: 'File'},
	    {value: 'pizza-1', viewValue: 'Service Request'},
	    {value: 'tacos-2', viewValue: 'Snag Master'}
	  ];
		

	orgData : OrgData[]= [
		  { "id" : "1",
		    "orgName": "Purvankara Limited",
		    "orgAddress": "Ulsoor bangalore",
		    "subsciption" : {
		      "plan" : "Premium"
		    },
		    "details" : {
		      "email" : "xyz@mail.com",
		      "Address" : "Ulsoor bangalore"
		    },
		    "entities":{
		      "count" : "1",
		      "validtill" : "15/06/2018"
		    }
		  },
		  { "id" : "2",
		    "orgName": "Purvankara Limited",
		    "orgAddress": "JP nagar bangalore",
		     "subsciption" : {
		      "plan" : "Premium1"
		    },
		    "details" : {
		      "email" : "xyz2@mail.com",
		      "Address" : "JP nagar bangalore"
		    },
		    "entities":{
		      "count" : "2",
		      "validtill" : "10/10/2018"
		    }
		  },
		  {
		  	"id" : "3",
		    "orgName": "Purvankara Limited",
		    "orgAddress": "ITPL bangalore",
		     "subsciption" : {
		      "plan" : "Premium2"
		    },
		    "details" : {
		      "email" : "xyz3@mail.com",
		      "Address" : "ITPL bangalore"
		    },
		    "entities":{
		      "count" : "3",
		      "validtill" : "25/11/2018"
		    }
		  }
		]
  	constructor() { }

  	ngOnInit() {
			this.organizationDataOptions = [
        {
          title: 'User Name', type: 'list', list: [
            { title: 'UserName', key: 'orgName', hideTitle: true, type: 'label' },
            { title: 'Address', key: 'orgAddress', hideTitle: true, type: 'label' }
          ]
        }, {
					title: 'Plan', key: 'subsciption.plan',
				}, {
					title: 'Valid till', key: 'entities.validtill'
				}, {
					title: 'Entities', key: 'entities.count'
				}]
  	}
   
}
