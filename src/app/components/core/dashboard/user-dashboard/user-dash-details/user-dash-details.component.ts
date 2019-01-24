
import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-dash-details',
  templateUrl: './user-dash-details.component.html',
  styleUrls: ['./user-dash-details.component.scss']
})
export class UserDashDetailsComponent implements OnInit {
 	@Input() data: any;
  @Input() formType: string;

	userDashboardForm: FormGroup;
	constructor() { }

	ngOnInit() {
    this.userDashboardForm = this.createFormGroup();
	}

	createFormGroup() {
    return new FormGroup({
      workRequestID:new FormControl('', [Validators.required]),
      workOrderID :new FormControl('', [Validators.required]),
      typeOfWork :new FormControl('', [Validators.required]),
      project :new FormControl('', [Validators.required]),
      package :new FormControl('', [Validators.required]),
      needByDate :new FormControl('', [Validators.required]),
      workCategory: new FormControl('', [Validators.required]),
      supportRole: new FormControl('', [Validators.required]),
      assignee: new FormControl('', [Validators.required]),
      putintiateDate: new FormControl('', [Validators.required]),
      RFAPutDate: new FormControl('', [Validators.required]),
      WOPutDate: new FormControl('', [Validators.required]),
      approvalintiateDate: new FormControl('', [Validators.required]),
      RFAApprovalDate: new FormControl('', [Validators.required]),
      WOApprovalDate: new FormControl('', [Validators.required]),
      status: new FormControl('', [Validators.required]),
      documentStatus: new FormControl('', [Validators.required]),
      remarks: new FormControl('', [Validators.required])
    });
  }
}