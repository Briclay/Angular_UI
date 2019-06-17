  import { Component, OnInit, ViewChild } from '@angular/core';
  import { WorkRequestService } from './work-request.service';
  import { RequestTrackerData } from './interface';
  import { merge as observableMerge, Subject } from 'rxjs';
  import { Router, ActivatedRoute } from '@angular/router';
  import { takeUntil } from 'rxjs/operators';
  declare var moment: any;
  import {UserService} from '../../../../components/core/dashboard/user/user.service';

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
    statusValueFromParams : string;
    getAnalytics : any;
    resFlag = false;
    resFlagInit = false;
    enableInputWR = false;
    enableInputNBD = false;
    enableInputID = false;
    enableInputTOW = false;
    enableInputDES = false;
    enableInputWC = false;
    enableInputAssign = false;
    allItems : any;
    private unsubscribe: Subject<any> = new Subject();

    constructor(
      private workRequestService: WorkRequestService,
      private router: Router,
      private route: ActivatedRoute,
      private userService : UserService
    ) {
      this.orgDetails =  JSON.parse(window.localStorage.authUserOrganisation);
      this.orgID = this.orgDetails._id;
    }

    ngOnInit() {
      observableMerge(this.route.params, this.route.queryParams).pipe(
      takeUntil(this.unsubscribe))
      .subscribe((queryParams) => this.loadRoute(queryParams));
    }

    loadRoute(queryParams: any) {
      if('filter[status]' in queryParams) {
        this.statusValueFromParams = queryParams['filter[status]'];
        this.getWorkRequest();
      }
      else{
        this.getWorkRequest();
      }
    }

    public ngOnDestroy(): void {
      this.unsubscribe.next();
      this.unsubscribe.complete();
    }

    dataPaginatorChange(event){
      this.pageIndex = event.pageIndex;
      this.pageSize = event.pageSize;
    }

    viewInputForFilterDataWR(){
      this.enableInputWR = true;
    }
    viewInputForFilterDataID(){
      this.enableInputID = true;
    }
    viewInputForFilterDataTOW(){
      this.enableInputTOW = true;
    }
    viewInputForFilterDataDES(){
      this.enableInputDES = true;
    }
    viewInputForFilterDataNBD(){
      this.enableInputNBD = true;
    }
    viewInputForFilterDataWC(){
      this.enableInputWC = true;
    }
    viewInputForFilterDataAssign(){
      this.enableInputAssign = true;
    }
    
    assignCopy(){
      this.workRequests = Object.assign([], this.allItems);
    }

    filterItem(value){
      if(!value){
        this.assignCopy();
      } 
      this.workRequests = Object.assign([], this.allItems).filter(
        item => (item.requestNumber  && item.requestNumber.toLowerCase().indexOf(value.toLowerCase()) > -1)
        || (item.typeOfWork  && item.typeOfWork.toLowerCase().indexOf(value.toLowerCase()) > -1)
        || (item.initiatedDate  && item.initiatedDate.toLowerCase().indexOf(value.toLowerCase()) > -1)
        || (item.needByDate  && item.needByDate.toLowerCase().indexOf(value.toLowerCase()) > -1)
        || (item.workDescription  && item.workDescription.toLowerCase().indexOf(value.toLowerCase()) > -1)
        || (item.workCategory  && item.workCategory.toLowerCase().indexOf(value.toLowerCase()) > -1)
        || (item.assignedName  && item.assignedName.toLowerCase().indexOf(value.toLowerCase()) > -1)
      )  
    }

    getWorkRequest() {  
      this.isLoading = true;
      let filter;
      if(this.statusValueFromParams){
        this.resFlag = true;
        this.resFlagInit = false;;
        filter = `filter[_organisationId]=${this.orgID}&filter[status]=${this.statusValueFromParams}`
      }
      else{
        this.resFlagInit = true;
        filter = `filter[_organisationId]=${this.orgID}`
      }
      this.workRequestService.getWorkRequest(filter).pipe().subscribe(res => {
        res.length > 0 && res.forEach((list) => {
          list.needByDateDummy = moment(list.needByDate).local().format("MM-DD-YYYY")
          list.initiatedDateDummy = moment(list.initiatedDate).local().format("MM-DD-YYYY")
            this.userService.getSingleUser(list._assignedId).pipe().subscribe(resp => {
              list.assignedName = resp.username;
            })
        })
        if(this.resFlag){
          this.workRequests = res;
          this.allItems = res;
          this.resFlag = false;
        }
        else if(this.resFlag){
          this.workRequests = res;
          this.allItems = res;
        }
        else if(this.resFlagInit) {
          this.workRequests = res;
          this.allItems = res;
        }
        this.isLoading = false;
        this.workRequestDataOption = [
          {
            title: 'User Name', type: 'list', list: [
              { title: 'requestNumber', key: 'requestNumber', hideTitle: true, type: 'label' },
              { title: 'status', key: 'status', hideTitle: true, type: 'label', isStatus: true }
            ]
          },
          { title: 'Need By Date', key: 'needByDateDummy', display: 'block', type: 'date' },
          { title: 'Assignee', key: 'assignedName', display: 'block' },
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
