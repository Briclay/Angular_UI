
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { merge as observableMerge, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-user-dash-details',
  templateUrl: './user-dash-details.component.html',
  styleUrls: ['./user-dash-details.component.scss']
})
export class UserDashDetailsComponent implements OnInit {
 	@Input() data: any;
  @Input() formType: string;
  @Output() public updateRefresh: EventEmitter<any> = new EventEmitter<any>();
  private unsubscribe: Subject<any> = new Subject();

	userDashboardForm: FormGroup;
	constructor() { }

	ngOnInit() {
    this.userDashboardForm = this.createFormGroup();
    this.assignValuesToForm()
	}
  
  assignValuesToForm() {
    console.log(this.data, 'userDashboardForm')
    this.userDashboardForm.patchValue(this.data);
  }

	createFormGroup() {
    return new FormGroup({
    documentStatus: new FormControl('', [Validators.required]),
    todayDate: new FormControl('', [Validators.required]),
    status: new FormControl('', [Validators.required]),
    deleteFlag: new FormControl('', [Validators.required]),
    requestNumber: new FormControl('', [Validators.required]),
    _assignedId: new FormControl('', [Validators.required]),
    workDescription: new FormControl('', [Validators.required]),
    typeOfWork: new FormControl('', [Validators.required]),
    leadTimeRequire: new FormControl('', [Validators.required]),
    needByDate: new FormControl('', [Validators.required]),
    leadDaysToComplete: new FormControl('', [Validators.required]),
    supportRole: new FormControl('', [Validators.required]),
    awardedDate: new FormControl('', [Validators.required]),
    initiatedDate: new FormControl('', [Validators.required]),
    RFAPutUpDate: new FormControl('', [Validators.required]),
    timeToComplete:new FormControl('', [Validators.required]),
    RFAapprovalDate:new FormControl('', [Validators.required]),
    remark:new FormControl('', [Validators.required]),
    workOrderPutDate: new FormControl('', [Validators.required]),
    workOrderApprovalDate: new FormControl('', [Validators.required]),
    typeOfConsultant: new FormControl('', [Validators.required]),
    _createdBy: new FormControl('', [Validators.required]),
    createdAt: new FormControl('', [Validators.required]),
    updatedAt: new FormControl('', [Validators.required])
    });
  }
}