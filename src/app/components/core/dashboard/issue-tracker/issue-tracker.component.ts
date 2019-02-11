import { Component, OnInit ,ViewChild} from '@angular/core';
import { IssueTrackerService } from './issue-tracker.service';
import { merge as observableMerge, Subject} from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-issue-tracker',
  templateUrl: './issue-tracker.component.html',
  styleUrls: ['./issue-tracker.component.scss']
})
export class IssueTrackerComponent implements OnInit {
  @ViewChild('tabGroup') tabGroup;
  
  projectsList: any;
  projectsDataOptions = [];
  selectedOrgId: string;
  listSpinner: boolean;
  private unsubscribe: Subject<any> = new Subject();
  projectData = [
    {
      "remarks": "Issue related to availability of the design document for the opration team",
      "comments" : "Comment for issues",
      "assigned" : { 
        "name" : "Srinivas N"
      },
      "document" : "Design Documennt not ready",
      "issueType" : null,
      "department" : "Design",
      "createdBy" : "Naruns srinivas",
      "updatedBy" : "Srinivas",
      "deleteFlag": false,
      "_id": "5c60f4713bd1ce122a0f95d0",
      "_organisationId": "5c548f8bf231a5447de94eee",
      "name": "PURVA SKYDALE",
      "projectCode": "PS-2",
      "status": "OPEN",
      "type": "RESIDENTIAL",
      "beginDate": null,
      "completionDate": "2019-03-11",
      "createdAt": "2019-02-11",
      "updatedAt": "2019-02-15",
      "ageing" : "100",
      "__v": 0
    },
    {
      "remarks": "Issue related to availability of the design document for the opration team ",
      "comments" : "Comment for issues",
      "assigned" : { 
        "name" : "Srinivas N"
      },
      "document" : "Design Documennt not ready",
      "issueType" : null,
      "department" : "Design",
      "createdBy" : "Naruns srinivas",
      "updatedBy" : "Srinivas",
      "deleteFlag": false,
      "_id": "5c60f4713bd1ce122a0f95d0",
      "_organisationId": "5c548f8bf231a5447de94eee",
      "name": "PURVA SKYWOOD",
      "projectCode": "PS-3",
      "status": "OPEN",
      "type": "RESIDENTIAL",
      "beginDate": null,
      "completionDate": "2019-03-11",
      "createdAt": "2019-02-11",
      "updatedAt": "2019-02-11",
      "ageing" : "150",
      "__v": 0
    }
  ]
  constructor(private issueTrackerService: IssueTrackerService,
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
  }

	tabSwitch(tabReq) {
		this.tabGroup.selectedIndex = tabReq.index;
		this.getPojectsData()
	}
}
