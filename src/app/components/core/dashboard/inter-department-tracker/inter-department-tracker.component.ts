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
  private unsubscribe: Subject<any> = new Subject();

  constructor(
    private formBuilder: FormBuilder,
    private issueTrackerService: IssueTrackerService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.getIssueTracker();
  }

  public ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
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
