import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-design-dashboard',
  templateUrl: './design-dashboard.component.html',
  styleUrls: ['./design-dashboard.component.scss']
})
export class DesignDashboardComponent implements OnInit {
  organizations: any[] = [
    { value: 'organizations-1', viewValue: 'Organizations-1' },
    { value: 'organizations-2', viewValue: 'Organizations-2' },
    { value: 'organizations-3', viewValue: 'Organizations-3' }
  ];

  projectConsultances : any[] = [
    {
      "_id": "1",
      "name": "Architect",
      "internaluser" : "Internal User 1",
      "externaluser" : "External User 1"
    },
    {
      "_id": "2",
      "name": "Structural Engg",
      "internaluser" : "Internal User 1",
      "externaluser" : "External User 1"
    },
    {
      "_id": "3",
      "name": "Public Health Engg",
      "internaluser" : "Internal User 1",
      "externaluser" : "External User 1"
    },
    {
      "_id": "4",
      "name": "Fire & Emergency",
      "internaluser" : "Internal User 1",
      "externaluser" : "External User 1"
    },
    {
      "_id": "5",
      "name": "Electrical Engg",
      "internaluser" : "Internal User 1",
      "externaluser" : "External User 1"
    },
    {
      "_id": "6",
      "name": "HVAC Design",
      "internaluser" : "Internal User 1",
      "externaluser" : "External User 1"
    },
    {
      "_id": "7",
      "name": "Landsape",
      "internaluser" : "Internal User 1",
      "externaluser" : "External User 1"
    }
  ]


  products : any[] = [
    {
      "_id": "1",
      "bhk": "2 BHK",
      "no" : "100",
      "area" : "1250"
    },
    {
      "_id": "2",
      "bhk": "3 BHK",
      "no" : "140",
      "area" : "1265"
    },
    {
      "_id": "3",
      "bhk": "4 BHK",
      "no" : "198",
      "area" : "2045"
    },
    {
      "_id": "4",
      "bhk": "1 BHK",
      "no" : "133",
      "area" : "2036"
    }
  ]

  projectTypes : any[] =[
    {
      "_id": "1",
      "name": "Land Details",
    },
    {
      "_id": "2",
      "name": "Architecture",
    },
    {
      "_id": "3",
      "name": "Structural",
    },
    {
      "_id": "4",
      "name": "PHE",
    },
    {
      "_id": "5",
      "name": "Electrical",
    },
    {
      "_id": "6",
      "name": "Fire",
    },
    {
      "_id": "7",
      "name": "Interiors",
    },
    {
      "_id": "8",
      "name": "Landscape",
    },
    {
      "_id": "9",
      "name": "NOC",
    },
    {
      "_id": "10",
      "name": "RERA",
    },
    {
      "_id": "11",
      "name": "Area Statement",
    },
    {
      "_id": "12",
      "name": "Specifications",
    },
    {
      "_id": "13",
      "name": "Sales & Marketing",
    }

  ]
  
  projects : any[] = [
    {
      "_id": "1",
      "name": "Sunworth ",
      "address" : "Ulsoor Bangalore"
    },
    {
      "_id": "2",
      "name": "PURVA SKYDALE",
      "address" : "Ulsoor Bangalore"
    },
    {
      "_id": "3",
      "name": "Purva Seasons",
      "address" : "Ulsoor Bangalore"
    },
    {
      "_id": "4",
      "name": "Milestone",
      "address" : "Ulsoor Bangalore"
    },
  ]


  constructor() { }

  ngOnInit() {
  }

}
