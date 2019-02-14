import { Component, OnInit, ViewChild } from '@angular/core';
import { WorkRequestService } from './work-request.service';
import { RequestTrackerData } from './interface';
import { merge as observableMerge, Subject } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-work-request',
  templateUrl: './work-request.component.html',
  styleUrls: ['./work-request.component.scss']
})
export class WorkRequestComponent implements OnInit {
  @ViewChild('tabGroup') tabGroup;

  isLoading: boolean;
  workRequest: RequestTrackerData;
  workRequestDataOption: any;
  orgID: string;
  orgDetails: any;
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

  ngOnInit() {
    // tslint:disable-next-line:max-line-length
    //observableMerge(this.route.params, this.route.queryParams).pipe(takeUntil(this.unsubscribe)).subscribe((params) => this.loadRoute(params));
  }

  public ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  /*loadRoute(params: any) {
    if ('orgID' in params) {
      this.orgID = params['orgID'];
      this.getWorkRequest();
    }
  }*/

  /*organizationChanged(org) {
    this.router.navigate([], {queryParams: {orgID: org.value ? org.value._id : org._id} , queryParamsHandling: 'merge'});
  }
*/
  getWorkRequest() {
    this.isLoading = true;
    this.workRequestService.getWorkRequest('filter[_organisationId]=' + this.orgID).pipe().subscribe(res => {
      this.workRequest = res;
      this.isLoading = false;
      this.workRequestDataOption = [
        {
          title: 'Image', key: 'logoImageUrl', hideTitle: true, type: 'image'
        },
        {
          title: 'User Name', type: 'list', list: [
            { title: 'requestNumber', key: 'requestNumber', hideTitle: true, type: 'label' },
            { title: 'status', key: 'status', hideTitle: true, type: 'label', isStatus: true }
          ]
        },
        { title: 'Need By Date', key: 'needByDate', display: 'block', type: 'date' },
        { title: 'Assignee', key: '', display: 'block' },
        { title: 'Type of Work ', key: 'typeOfWork', display: 'block' },
        { title: 'Order Description ', key: 'workDescription', display: 'block' },
        { title: 'Initiated Date', key: 'initiatedDate', display: 'block', type: 'date' },
        { title: 'Work Category ', key: 'workCategory', display: 'block' },
      ];
    });
  }

  tabSwitch(index) {
    this.tabGroup.selectedIndex = index;
    this.getWorkRequest();
  }

}
