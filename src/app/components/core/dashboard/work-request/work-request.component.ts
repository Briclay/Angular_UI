import { Component, OnInit, ViewChild } from '@angular/core';
import { WorkRequestService } from './work-request.service';
import { RequestTrackerData } from './interface';
import { merge as observableMerge, Subject } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
declare var moment: any;

@Component({
  selector: 'app-work-request',
  templateUrl: './work-request.component.html',
  styleUrls: ['./work-request.component.scss']
})
export class WorkRequestComponent implements OnInit {
  @ViewChild('tabGroup') tabGroup;

  isLoading: boolean;
  workRequests: any;
  workRequestDataOption: any;
  orgID: string;
  orgDetails: any;
  pageIndex : number = 0;
  pageSize : number = 5;
  private unsubscribe: Subject<any> = new Subject();

  constructor(
    private workRequestService: WorkRequestService,
    private router: Router,
    private route: ActivatedRoute,
   ) {
    this.orgDetails =  JSON.parse(window.localStorage.authUserOrganisation);
    this.orgID = this.orgDetails._id;
    console.log('this.orgId' + JSON.stringify(this.orgDetails));
    this.getWorkRequest();
   }

  ngOnInit() {}

  public ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  dataPaginatorChange(event){
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
  }

  getWorkRequest() {  
    this.isLoading = true;
    this.workRequestService.getWorkRequest('filter[_organisationId]=' + this.orgID).pipe().subscribe(res => {
      res.length > 0 && res.forEach((list) => {
        list.needByDateDummy = moment(list.needByDate).local().format("MM-DD-YYYY")
        list.initiatedDateDummy = moment(list.initiatedDate).local().format("MM-DD-YYYY")
      })
      this.workRequests = res;
      this.isLoading = false;
      this.workRequestDataOption = [
        {
          title: 'User Name', type: 'list', list: [
            { title: 'requestNumber', key: 'requestNumber', hideTitle: true, type: 'label' },
            { title: 'status', key: 'status', hideTitle: true, type: 'label', isStatus: true }
          ]
        },
        { title: 'Need By Date', key: 'needByDateDummy', display: 'block', type: 'date' },
        { title: 'Assignee', key: '', display: 'block' },
        { title: 'Type of Work ', key: 'typeOfWork', display: 'block' },
        { title: 'Order Description ', key: 'workDescription', display: 'block' },
        { title: 'Initiated Date', key: 'initiatedDateDummy', display: 'block', type: 'date' },
        { title: 'Work Category ', key: 'workCategory', display: 'block' },
      ];
    });
  }

  tabSwitch(tabReq) {
    this.tabGroup.selectedIndex = tabReq.index;
    this.getWorkRequest();
  }
}
