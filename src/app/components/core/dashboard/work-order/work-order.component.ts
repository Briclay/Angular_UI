import { Component, OnInit,ViewChild} from '@angular/core';
import {WorkOrderData} from './interface';
import {WorkOrderService} from './work-order.service';
import {merge as observableMerge, Subject} from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import {takeUntil} from 'rxjs/operators';
declare var moment: any;
import {UserService} from '../../../../components/core/dashboard/user/user.service';
import {WorkRequestService} from '../../../../components/core/dashboard/work-request/work-request.service';

@Component({
  selector: 'app-work-order',
  templateUrl: './work-order.component.html',
  styleUrls: ['./work-order.component.scss']
})
export class WorkOrderComponent implements OnInit {
  @ViewChild('tabGroup') tabGroup;

  isLoading: boolean;
  workOrders :any;
  workOrderDataOption: any;
  orgID: string;
  pageIndex : number = 0;
  pageSize : number = 5;
  orgDetails : any;
  enableInputON = false;
  enableInputWRD = false;
  enableInputID = false;
  enableInputTOW = false;
  enableInputDES = false;
  enableInputWC = false;
  enableInputNBD = false;
  enableInputAssign = false;
  allItems : any;
  workRequests : any;
  private unsubscribe: Subject<any> = new Subject();

  constructor(
    private workOrderService: WorkOrderService,
    private workRequestService: WorkRequestService,
    private router: Router,
    private userService : UserService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.orgDetails =  JSON.parse(window.localStorage.authUserOrganisation);
    this.orgID = this.orgDetails._id;
    this.getWorkOrder();
  }

   public ngOnDestroy(): void {
		this.unsubscribe.next();
		this.unsubscribe.complete();
	}

  dataPaginatorChange(event){
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
  }

  viewInputForFilterDataON(){
    this.enableInputON = true;
  }
  viewInputForFilterDataWRD(){
    this.enableInputWRD = true;
  }
  viewInputForFilterDataAssign(){
    this.enableInputAssign = true;
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
  
  assignCopy(){
    this.workOrders = Object.assign([], this.allItems);
  }

  filterItem(value){
    if(!value){
      this.assignCopy();
    } 
    this.workOrders = Object.assign([], this.allItems).filter(
      item => (item.requestNumber  && item.requestNumber.toLowerCase().indexOf(value.toLowerCase()) > -1)
      || (item.typeOfWork  && item.typeOfWork.toLowerCase().indexOf(value.toLowerCase()) > -1)
      || (item.orderNumber  && item.orderNumber.toLowerCase().indexOf(value.toLowerCase()) > -1)
      || (item.workOrderFullRefNumber  && item.workOrderFullRefNumber.toLowerCase().indexOf(value.toLowerCase()) > -1)
      || (item.workDescription  && item.workDescription.toLowerCase().indexOf(value.toLowerCase()) > -1)
      || (item.workRequestNumber  && item.workRequestNumber.toLowerCase().indexOf(value.toLowerCase()) > -1)
      || (item.assignedName  && item.assignedName.toLowerCase().indexOf(value.toLowerCase()) > -1)
    )  
    console.log(this.workOrders, 'this.workRequests')
  }

  getWorkOrder() {
    this.isLoading = true;
      this.workOrderService.getWorkOrder(`filter[_organisationId]=${this.orgID}`).pipe().subscribe(res => {
       res.length > 0 && res.forEach((list) => {
          this.workRequestService.getSingleWorkRequest(list._workRequestId).pipe().subscribe(resp => {
            list.assignedName = resp._assignedId;
            list.workRequestNumber = resp.requestNumber;
            list.workDescription = resp.workDescription;
            if(list.typeOfWork === null){
              list.typeOfWork = resp.typeOfWork;
            }
            this.userService.getSingleUser(resp._assignedId).pipe().subscribe(response => {
              list.assignedName = response.displayName;
              this.workOrders = res;
              this.allItems = res;
            })
          })
        })
      })
      console.log(this.workOrders, 'workOrdersworkOrders')
      this.isLoading = false;
      this.workOrderDataOption = [
        {
          title: 'User Name', type: 'list', list: [
            { title: 'Order Number', key: 'orderNumber', hideTitle: true, type: 'label' },
            { title: 'status', key: 'status', hideTitle: true, type: 'label', isStatus: true }
          ]
        },
        { title: 'Work Request ID', key: 'workRequestNumber', display: 'block' },
        { title: 'Assignee', key: 'assignedName', display: 'block' },
        { title: 'Type of Work ', key: 'typeOfWork',display: 'block' },
        { title: 'Package/Order Description', key: 'workDescription', display: 'block' },
        { title: 'WO Full RefNumber', key: 'workOrderFullRefNumber', display: 'block' },
      ]
    };

    tabSwitch(tabReq) {
      this.tabGroup.selectedIndex = tabReq.index;
      this.getWorkOrder();
    }
  }
 

