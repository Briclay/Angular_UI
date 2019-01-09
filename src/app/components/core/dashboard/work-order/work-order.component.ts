import { Component, OnInit } from '@angular/core';
import {WorkOrderData} from './interface';
import {WorkOrderService} from './work-order.service';

@Component({
  selector: 'app-work-order',
  templateUrl: './work-order.component.html',
  styleUrls: ['./work-order.component.scss']
})
export class WorkOrderComponent implements OnInit {
  isLoading: boolean;
  workOrder: WorkOrderData;
  workOrderDataOption: any;

  constructor(private workOrderService: WorkOrderService) { }

  ngOnInit() {
    this.isLoading = true;
    this.workOrderService.getWorkOrder().pipe().subscribe(res => {
      console.log('res', res)
      this.workOrder = res;
      this.isLoading = false;
      this.workOrderDataOption = [
        {
          title: 'Image', key: 'logoImageUrl', hideTitle: true, type: 'image'
        },
        {
          title: 'User Name', type: 'list', list: [
            { title: 'requestNumber', key: '_workRequestId.requestNumber', hideTitle: true, type: 'label' },
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
