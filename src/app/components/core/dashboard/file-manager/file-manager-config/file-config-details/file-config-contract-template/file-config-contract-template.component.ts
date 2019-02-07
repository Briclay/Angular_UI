import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { WorkRequestService } from '../../../../work-request/work-request.service';

@Component({
  selector: 'app-file-config-contract-template',
  templateUrl: './file-config-contract-template.component.html',
  styleUrls: ['./file-config-contract-template.component.scss']
})
export class FileConfigContractTemplateComponent implements OnInit {
  @Input()
  public folderDetailsContractDataOption: any;
  @Output() public workRequestData: EventEmitter<any> = new EventEmitter<any>();

  logsData: any;
  orgId: string;
  org: any;
  workRequest = [];
  selectedRequestNumber = {
    requestNumber: '',
    workDescription: '',
    typeOfWork: '',
    needByDate: '',
    initiatedDate: '',
    RFAPutUpDate: '',
    RFAapprovalDate: '',
    status: '',
    workOrderPutDate: '',
    workOrderApprovalDate: '',
    awardedDate: ''
  };
  constructor(private workRequestService: WorkRequestService) {
    this.org = JSON.parse(window.localStorage.authUserOrganisation);
    this.orgId = this.org._id;
  }

  ngOnInit() {
    this.getRequestNumber();
  }
  getRequestNumber() {
    this.workRequestService.getWorkRequest('filter[_organisationId]=' + this.orgId).pipe().subscribe(res => {
      this.workRequest = res;
    });
  }
  onChangedRequest(event) {
    this.selectedRequestNumber = event.value;
    this.workRequestData.emit(this.selectedRequestNumber);
  }
}
