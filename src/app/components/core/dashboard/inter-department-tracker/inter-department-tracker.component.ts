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
  allItems : any;
  enableInputIC = false;
  enableInputStatus = false;
  enableInputIType = false;
  enableInputDes = false;
  enableInputCreD = false;
  enableInputAge = false;
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
    this.getIssueTracker();
  }


  viewInputForFilterDataIC(){
    this.enableInputIC = true;
  }
  viewInputForFilterDataStatus(){
    this.enableInputStatus = true;
  }
  viewInputForFilterDataIType(){
    this.enableInputIType = true;
  }
  viewInputForFilterDataDes(){
    this.enableInputDes = true;
  }
  viewInputForFilterDataCreD(){
    this.enableInputCreD = true;
  }
  viewInputForFilterDataAge(){
    this.enableInputAge = true;
  }
  
  assignCopy(){
    this.issueTrackerList = Object.assign([], this.allItems);
  }

  filterItem(value){
    if(!value){
      this.assignCopy();
    } 
    this.issueTrackerList = Object.assign([], this.allItems).filter(
      item => (item.issueCode  && item.issueCode.toLowerCase().indexOf(value.toLowerCase()) > -1)
      || (item.status  && item.status.toLowerCase().indexOf(value.toLowerCase()) > -1)
      || (item.type  && item.type.toLowerCase().indexOf(value.toLowerCase()) > -1)
      || (item.description  && item.description.toLowerCase().indexOf(value.toLowerCase()) > -1)
      || (item.createdAtDummy  && item.createdAtDummy.toLowerCase().indexOf(value.toLowerCase()) > -1)
      || (item.age  && item.age.toLowerCase().indexOf(value.toLowerCase()) > -1)
    )  
    console.log(this.issueTrackerList, 'this.issueTrackerList')
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
        res.length > 0 && res.forEach((list) => {
          list.createdAtDummy = moment(list.createdAt).local().format("MM-DD-YYYY")
        })
      this.issueTrackerList = res;
      this.allItems = res;
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
      { title: 'Description', key: 'description' },
      { title: 'Creation date', key: 'createdAtDummy' },
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
