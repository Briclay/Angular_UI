import { Component, OnInit, ViewChild } from '@angular/core';
import { IssueTrackerService } from './inter-department-tracker.service';
import { merge as observableMerge, Subject} from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { takeUntil} from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
declare var moment: any;

@Component({
  selector: 'app-issue-tracker',
  templateUrl: './inter-department-tracker.component.html',
  styleUrls: ['./inter-department-tracker.component.scss']
})
export class IssueTrackerComponent implements OnInit {
  @ViewChild('tabGroup') tabGroup;
  
  issueTrackerList: any;
  issueTrackerDataOptions = [];
  orgId: string;
  listSpinner: boolean;
  pageIndex : number = 0;
  pageSize : number = 5;
  getAnalytics :any;
  depId : string;
  userId : string;
  selectedDep : any;
  selectedUser : any;
  totalIssue : any;
  totalEfficiency : any;
  private unsubscribe: Subject<any> = new Subject();

  constructor(
    private formBuilder: FormBuilder,
    private issueTrackerService: IssueTrackerService,
    private router: Router,
    private route: ActivatedRoute) {

    let orgDetails= JSON.parse(window.localStorage.authUserOrganisation);
    this.orgId  = orgDetails._id;
    let department= JSON.parse(window.localStorage.authUserDepartment);
    this.depId  = department._id;
    let user= JSON.parse(window.localStorage.authUser);
    this.userId  = user._id;
   }

  ngOnInit() {
    this.getIssueTracker();
    this.getAllAnalytics();
  }

  public ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  dataPaginatorChange(event){
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
  }

  getAllAnalytics(){
    let filter;
    if(this.selectedDep){
     filter  = `filter[_organisationId]=${this.orgId}&filter[assignedTo]=${this.userId}&filter[_departmentId]=${this.selectedDep}`
    }else if(this.selectedUser){
     filter  = `filter[_organisationId]=${this.orgId}&filter[assignedTo]=${this.selectedUser}&filter[_departmentId]=${this.depId}`
    }else{
     filter  = `filter[_organisationId]=${this.orgId}&filter[assignedTo]=${this.userId}`
    }
    this.issueTrackerService.getIssueTrackerAnalytics(filter).pipe().subscribe(res => {
      this.getAnalytics = res;
      this.totalIssue = (this.getAnalytics.openCount + this.getAnalytics.closedCount);
      let eff = (this.getAnalytics.totalIssue / this.getAnalytics.closedCount) ;
      if(eff !== NaN){
        this.totalEfficiency = eff
      }
      console.log(this.getAnalytics, "getAnalytics")
      this.listSpinner = false;
    }, (error: any) => {
      console.error('error', error);
      this.listSpinner = false;
    });
  }

  getIssueTracker() {
   this.listSpinner = true;
    this.issueTrackerService.getAllIssueTracker().pipe().subscribe(res => {
      this.issueTrackerList = res;
      console.log(this.issueTrackerList, "issueTrackerList")
      this.listSpinner = false;
      this.issueTrackerDataOptions = [
      {
        title: 'User Name', type: 'list', list: [
        { title: 'Issue Code', key: 'issueCode',  hideTitle: true, type: 'label' },
        { title: 'Status', key: 'status', hideTitle: true, type: 'label', isStatus: true }
        ]
      },
      { title: 'Issue Type', key: 'type'},
      { title: 'Description', key: 'description', hideTitle: true, type: 'label' },
      { title: 'Creation date', key: '' },
      { title: 'Age', key: 'age' }
      ]
    }, (error: any) => {
      console.error('error', error);
      this.listSpinner = false;
    });
  }

  tabSwitch(tabReq) {
    this.tabGroup.selectedIndex = tabReq.index;
    this.getIssueTracker()
  }
}
