import { Component, OnInit,Output, Input, ViewChild,EventEmitter } from '@angular/core';
import { MatDialog,MatPaginator } from '@angular/material';
import { merge as observableMerge, Subject } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { ProjectService } from '../.././dashboard/projects/project.service';


@Component({
  selector: 'app-contract-management-dashboard',
  templateUrl: './contract-management-dashboard.component.html',
  styleUrls: ['./contract-management-dashboard.component.scss']
})
export class ContractManagementDashboardComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @Input() data: any;
  enableOrders = false;
  selecetedProjectData : any;
  projects = []
  orgID : any;
  pageIndex : number = 0;
  pageSize : number = 5;
  loading : boolean;
  clickedProjectName : any;
  projectDataOptions = [];
  projectLoading = false;
  displayedColumns: string[] = ['name', 'status', 'budget', 'unitNumber'];
  private unsubscribe: Subject<any> = new Subject();
  list = []
  dummyArray=[ 
  {
    "name" : "Contract Order",
    "values": 
    { "open":22,
    "hold":22,
    "complete":38
  },
  "table":[
  { "nameOfOrder": "Contract Order",
  "category": "A",
  "recieved" : 20,
  "complete" : 15,
  "pending" : 5
} 
]
},
{
 "name" : "Variation Order",
 "values" : { "open":154,
 "hold":120,
 "complete":34
} ,
"table":[
{ "nameOfOrder": "Variation Order",
"category": "A",
"recieved" : 20,
"complete" : 15,
"pending" : 5
}  
]
},
{
  "name" : "Consultant Order",
  "values": { "open":11,
  "hold":7,
  "complete":20
},

"table":[
{ "nameOfOrder": "Consultant Order",
"category": "A",
"recieved" : 20,
"complete" : 15,
"pending" : 5
} 
]
}

]

constructor(private projectService : ProjectService,
  ) {


  let org = JSON.parse(window.localStorage.getItem('authUserOrganisation'));
  this.orgID = org._id

}



ngOnInit() {
  this.getProjects()
}
public ngOnDestroy(): void {
  this.unsubscribe.next();
  this.unsubscribe.complete();
}
dataPaginatorChange(event){
  this.pageIndex = event.pageIndex;
  this.pageSize = event.pageSize;
}

orderView (v){
  this.list=v.table
this.clickedProjectName = v.name;
  this.enableOrders = true;
}

//Drop Down of select a Project
selectProject(event){
  this.projectService.getSingleProjects(event._id).pipe().subscribe(res => {
    this.selecetedProjectData = res;
    this.clickedProjectName = res.name;
  }, (error: any) => {
    console.error('error', error);
  });
}

 selectSingleProject(proj){
  }

 //To get all project
getProjects() {
  this.projectLoading = true;
  this.projectService.getProjects(this.orgID).pipe().subscribe(res => {
    this.projectLoading = false;
    res.forEach((list) => {
      list.displayLogo = list.imageUrls[0];
      list.unitNumber = list.units.reduce((accumulator, currentValue) => {
        return accumulator + currentValue.count;
      }, 0);
    })
    this.projects = res;
    this.projectDataOptions = [
    {
      title: 'Image', key: 'displayLogo', hideTitle: true, type: 'image'
    },
    {
      title: 'User Name', type: 'list', list: [
      { title: 'UserName', key: 'name', hideTitle: true, type: 'label' },
      { title: 'Address', key: 'projectDetails.location', hideTitle: true, type: 'label' },
      { title: 'Address', key: 'projectDetails.blocks', hideTitle: true, type: 'label' },
      { title: 'Status', key: 'status', hideTitle: true, type: 'label', isStatus: true }
      ]
    },
    { title: 'Status', key: 'status' },
    { title: 'Total Units', key: 'unitNumber' },
    { title: 'Budget', key: 'projectDetails.unitNumber' }]

  }, (error: any) => {
    console.error('error', error);
    this.projectLoading = false;
  });
}


}
