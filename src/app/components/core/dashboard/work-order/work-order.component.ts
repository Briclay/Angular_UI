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
  workOrder = [];
  workOrderDataOption: any;
  orgID: string;

  private unsubscribe: Subject<any> = new Subject();

  constructor(
    private workOrderService: WorkOrderService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    observableMerge(this.route.params, this.route.queryParams).pipe(
      	takeUntil(this.unsubscribe))
      	.subscribe((params) => this.loadRoute(params));
  }

   public ngOnDestroy(): void {
		this.unsubscribe.next();
		this.unsubscribe.complete();
	}

  loadRoute(params: any) {
		if('orgID' in params) {
			this.orgID = params['orgID'];
      this.getWorkOrder();
		}
	}

  organizationChanged(org) {
		this.router.navigate([], {queryParams: {orgID: org.value ? org.value._id : org._id} , queryParamsHandling: 'merge'});
	}

  getWorkOrder() {
    this.isLoading = true;
    this.workOrderService.getWorkOrder(`filter[_organisationId]=${this.orgID}`).pipe().subscribe(res => {
      this.workOrder = res;
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
