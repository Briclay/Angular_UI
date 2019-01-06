import { Component, OnInit } from '@angular/core';
import {WorkRequestService} from './work-request.service';
import {RequestTrackerData} from './interface';

@Component({
  selector: 'app-work-request',
  templateUrl: './work-request.component.html',
  styleUrls: ['./work-request.component.scss']
})
export class WorkRequestComponent implements OnInit {
  isLoading: boolean;
  workRequest: RequestTrackerData;
  workRequestDataOption: any;

  constructor(private workRequestService : WorkRequestService ) { }

  ngOnInit() {
    this.isLoading = true;
    this.workRequestService.getWorkRequest().pipe().subscribe(res => {
      this.workRequest = res;
      this.isLoading = false;
      this.workRequestDataOption = [
        {
          title: 'Image', key: 'logoImageUrl', hideTitle: true, type: 'image'
        },
        {
          title: 'User Name', type: 'list', list: [
            { title: 'requestNumber', key: 'requestNumber', hideTitle: true, type: 'label' },
            { title: 'Address', key: '_createdBy.username', hideTitle: true, type: 'label' },
            { title: 'status', key: 'status', hideTitle: true, type: 'label', isStatus: true }
          ]
        },
        { title: 'Need By Date', key: 'needByDate', display: 'block' },
        { title: 'Assignee', key: '_assignedId', display: 'block' },
        { title: 'Type of Work ', key: 'typeOfWork', display: 'block' },
        { title: 'Order Description ', key: 'workDescription', display: 'block' },
        { title: 'Initiated Date', key: 'initiatedDate', display: 'block' },
        { title: 'Work Category ', key: 'workCategory', display: 'block' },
      ]
    });
  }

}
