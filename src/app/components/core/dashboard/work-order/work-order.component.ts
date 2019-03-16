import { Component, OnInit } from '@angular/core';
import {WorkOrderData} from './interface';
import {WorkOrderService} from './work-order.service';
import {merge as observableMerge, Subject} from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-work-order',
  templateUrl: './work-order.component.html',
  styleUrls: ['./work-order.component.scss']
})
export class WorkOrderComponent implements OnInit {
  isLoading: boolean;
  workOrders :any;
  workOrderDataOption: any;
  orgID: string;
  pageIndex : number = 0;
  pageSize : number = 5;
  orgDetails : any;
  private unsubscribe: Subject<any> = new Subject();

  constructor(
    private workOrderService: WorkOrderService,
    private router: Router,
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

  getWorkOrder() {
    this.isLoading = true;
    this.workOrderService.getWorkOrder(`filter[_organisationId]=${this.orgID}`).pipe().subscribe(res => {
      this.workOrders = res;
      this.isLoading = false;
      this.workOrderDataOption = [
        {
          title: 'Image', key: 'logoImageUrl', hideTitle: true, type: 'image'
        },
        {
          title: 'User Name', type: 'list', list: [
            { title: 'Order Number', key: 'orderNumber', hideTitle: true, type: 'label' },
            { title: 'status', key: '_workRequestId.status', hideTitle: true, type: 'label', isStatus: true }
          ]
        },
        { title: 'Work Order ID', key: '_workRequestId.requestNumber', display: 'block' },
        { title: 'Assignee', key: '_workRequestId._assignedId', display: 'block' },
        { title: 'Type of Work ', key: '_workRequestId.typeOfWork', display: 'block' },
        { title: 'Order Description ', key: '_workRequestId.workDescription', display: 'block' },
      ]
    });
  }

}
