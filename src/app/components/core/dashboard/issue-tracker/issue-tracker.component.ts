import { Component, OnInit, ViewChild } from '@angular/core';
import { IssueTrackerService } from './issue-tracker.service';
import { merge as observableMerge, Subject} from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { takeUntil} from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';

@Component({
  selector: 'app-issue-tracker',
  templateUrl: './issue-tracker.component.html',
  styleUrls: ['./issue-tracker.component.scss']
})
export class IssueTrackerComponent implements OnInit {
  @ViewChild('tabGroup') tabGroup;
  
  projectsList: any;
  projectsDataOptions = [];
  orgId: string;
  listSpinner: boolean;
  private unsubscribe: Subject<any> = new Subject();
  projectData = [
    {
      "id": 1,
      "_organisationId": "5c560b92fcd9a22fb225de04",
      "_projectId": "5c6227509348d81be897b23e",
      "type": "issue type",
      "issueCode": "I0001",
      "description": "assad asdsad ",
      "status": "OPEN",
      "remark": "asdsadas",
      "assignedTo": "5c560b93fcd9a22fb225de07",
      "assignedName": "mohit",
      "_createdBy": "5c548f8cf231a5447de94ef1",
      "createdAt": "2019-02-16T11:42:57.000Z",
      "dateOfCompletion": "2019-04-16T07:51:02.000Z",
      "dueDate": "2019-04-16T07:51:02.000Z",
      "deleteFlag": false,
      "_deletedBy": null,
      "deletedAt": null,
      "comments": [
      {
        "id": 1,
        "comments": "asdasdas asd asd asda",
        "completionDate": "2019-03-03T07:51:02.000Z",
        "_updatedBy": "5c548f8cf231a5447de94ef1",
        "updatedBy": "purvaadmin",
        "updatedAt": "2019-02-16T11:42:57.000Z"
      },
      {
        "id": 2,
        "comments": "asda 323",
        "completionDate": "2019-03-03T07:51:02.000Z",
        "_updatedBy": "5c548f8cf231a5447de94ef1",
        "updatedBy": "purvaadmin",
        "updatedAt": "2019-02-16T11:42:57.000Z"
      },
      {
        "id": 3,
        "comments": "asda testing",
        "completionDate": "2019-03-03T07:51:02.000Z",
        "_updatedBy": "5c548f8cf231a5447de94ef1",
        "updatedBy": "purvaadmin",
        "updatedAt": "2019-02-16T11:42:57.000Z"
      }
      ]
    },
    {
      "id": 2,
      "_organisationId": "5c560b92fcd9a22fb225de04",
      "_projectId": "5c6227509348d81be897b23e",
      "type": "issue type",
      "issueCode": "I0002",
      "description": "asdsad asdsad checking 3123 ",
      "status": "OPEN",
      "remark": "asdsadas",
      "assignedTo": "5c560b93fcd9a22fb225de07",
      "assignedName": "mohit",
      "_createdBy": "5c4ab8d3e7179a090e09c9ef",
      "createdAt": "2019-02-17T16:17:58.000Z",
      "dateOfCompletion": "2019-04-16T07:51:02.000Z",
      "dueDate": "2019-04-16T07:51:02.000Z",
      "deleteFlag": false,
      "_deletedBy": null,
      "deletedAt": null,
      "comments": [
      {
        "id": 4,
        "comments": "asdasdas asd asd asda",
        "completionDate": "2019-03-03T07:51:02.000Z",
        "_updatedBy": "5c4ab8d3e7179a090e09c9ef",
        "updatedBy": "briclayadmin",
        "updatedAt": "2019-02-17T16:17:59.000Z"
      },
      {
        "id": 5,
        "comments": "asda 323",
        "completionDate": "2019-03-03T07:51:02.000Z",
        "_updatedBy": "5c4ab8d3e7179a090e09c9ef",
        "updatedBy": "briclayadmin",
        "updatedAt": "2019-02-17T16:17:59.000Z"
      },
      {
        "id": 6,
        "comments": "asda testing",
        "completionDate": "2019-03-03T07:51:02.000Z",
        "_updatedBy": "5c4ab8d3e7179a090e09c9ef",
        "updatedBy": "briclayadmin",
        "updatedAt": "2019-02-17T16:17:59.000Z"
      },
      {
        "id": 7,
        "comments": "asdasdas asd asd asda",
        "completionDate": "2019-03-03T07:51:02.000Z",
        "_updatedBy": "5c4ab8d3e7179a090e09c9ef",
        "updatedBy": "briclayadmin",
        "updatedAt": "2019-02-17T16:20:35.000Z"
      },
      {
        "id": 8,
        "comments": "asda 323",
        "completionDate": "2019-03-03T07:51:02.000Z",
        "_updatedBy": "5c4ab8d3e7179a090e09c9ef",
        "updatedBy": "briclayadmin",
        "updatedAt": "2019-02-17T16:20:35.000Z"
      },
      {
        "id": 9,
        "comments": "asda testing",
        "completionDate": "2019-03-03T07:51:02.000Z",
        "_updatedBy": "5c4ab8d3e7179a090e09c9ef",
        "updatedBy": "briclayadmin",
        "updatedAt": "2019-02-17T16:20:35.000Z"
      },
      {
        "id": 10,
        "comments": "asda testing",
        "completionDate": "2019-03-16T07:51:02.000Z",
        "_updatedBy": "5c4ab8d3e7179a090e09c9ef",
        "updatedBy": "briclayadmin",
        "updatedAt": "2019-02-17T16:20:35.000Z"
      }
      ]
    }
  ]
  constructor(
    private formBuilder: FormBuilder,
    private issueTrackerService: IssueTrackerService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.getPojectsData();
  }

  public ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  /*loadRoute(params: any) {
    if('orgID' in params) {
      this.selectedOrgId = params['orgID'];
      this.getPojectsData();
    }
  }*/

  getPojectsData() {
   //this.listSpinner = true;
     this.projectsList = this.projectData;
     this.projectsDataOptions = [
      {
        title: 'User Name', type: 'list', list: [
        { title: 'Issue Code', key: 'issueCode',  hideTitle: true, type: 'label' },
        { title: 'Status', key: 'status', hideTitle: true, type: 'label', isStatus: true }
        ]
      },
      { title: 'Issue Type', key: 'type'},
      { title: 'Description', key: 'description', hideTitle: true, type: 'label' },
      { title: 'Assigned To ', key: 'assignedName'},
      { title: 'Creation date', key: 'createdAt' },
      //{ title: 'Age', key: 'ageing' }
      ]
   /* this.organisationService.getAllIssueTracker().pipe().subscribe(res => {
      this.projectsList = res;
      this.listSpinner = false;
      this.projectsDataOptions = [
      {
        title: 'User Name', type: 'list', list: [
        { title: 'Project Code', key: 'projectCode',  hideTitle: true, type: 'label' },
        { title: 'Name', key: 'name', hideTitle: true, type: 'label' },
        { title: 'Status', key: 'status', hideTitle: true, type: 'label', isStatus: true }
        ]
      },
      { title: 'Issue Type', key: 'issueType'},
      { title: 'Document', key: 'document', hideTitle: true, type: 'label' },
      { title: 'Assigned To ', key: 'assigned.name'},
      { title: 'Department', key: 'department', hideTitle: true, type: 'label'},
      { title: 'Creation date', key: 'createdAt' },
      { title: 'Age', key: 'ageing' }
      ]
    }, (error: any) => {
      console.error('error', error);
      this.listSpinner = false;
    });*/
  }

  tabSwitch(tabReq) {
    this.tabGroup.selectedIndex = tabReq.index;
    this.getPojectsData()
  }
}
