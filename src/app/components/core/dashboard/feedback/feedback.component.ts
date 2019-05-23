import { Component, OnInit,Inject, Input, Output } from '@angular/core';
import { PlatformLocation } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import {HttpClientModule, HttpClient, HttpRequest, HttpResponse, HttpEventType} from '@angular/common/http';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { MatDialog, MatSnackBar, MatTableDataSource, } from '@angular/material';
import * as _ from 'lodash';
import { merge as observableMerge, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';;
import {   MatDialogRef} from '@angular/material';
import { MAT_DIALOG_DATA } from '@angular/material';
import {FeedbackService} from './feedback.service';

@Component({
	selector: 'app-feedback',
	templateUrl: './feedback.component.html',
	styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent implements OnInit {
	isLaoding = false;
	feedbackForm : FormGroup;
	favoriteSeason: string;
	orgID: any;
	depId : any;
	userId : any;
	seasons = [
	{value: 'veryGood', viewValue: 'Very Good'},
	{value: 'good', viewValue: 'Good'},
	{value: 'fair', viewValue: 'Fair'},
	{value: 'poor', viewValue: 'Poor'}
	];

	constructor(@Inject(MAT_DIALOG_DATA) public data: any,
		public dialogRef: MatDialogRef<FeedbackComponent>, 
		private dialog: MatDialog,
		private route: ActivatedRoute,
		private router: Router,
		private location: PlatformLocation,
		private http: HttpClient,
		private formBuilder: FormBuilder,
		private snackBar: MatSnackBar,
		private feedbackService: FeedbackService,
		) {

		var org = JSON.parse(window.localStorage.authUserOrganisation);
		this.orgID = org._id;
		let department= JSON.parse(window.localStorage.authUserDepartment);
		this.depId  = department._id;
		let user= JSON.parse(window.localStorage.authUser);
		this.userId  = user._id;


	}
	ngOnInit() {

		this.feedbackForm = this.formBuilder.group({
			_organisationId : [this.orgID],
			_departmentId : [this.depId], 
			userId : [this.userId],   
			overAllExperince: [''],   
			timelyResponse: [''], 
			ourSupport: [''], 
			overAllSatisfaction: [''], 
			comments: [''], 
		});
		this.getData();
	}

	getData(){

	}
	submitForm(v){
		if (this.feedbackForm.valid ) {
			console.log("Form Submitted!",this.feedbackForm);
			this.snackBar.open("Form Submitted", 'Feedback Form', {
				duration: 2000,
			});
			this.dialogRef.close();
		}
		else{
      //console.log(res,'ncm-create-res')
      this.snackBar.open("Please Fill The Form", 'Feedback Form', {
      	duration: 2000,
      });
      this.feedbackForm['_touched'] = false;
      
      this.isLaoding = false;
      (error: any) => {
      	console.error('error', error);
      	this.isLaoding = false;
      };
  }
}

}
