import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router , ActivatedRoute} from '@angular/router';
import { MatDialog,  MatSnackBar ,MAT_DIALOG_DATA } from '@angular/material';
import {merge as observableMerge, Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
	selector: 'app-issue-tracker-details',
	templateUrl: './issue-tracker-details.component.html',
	styleUrls: ['./issue-tracker-details.component.scss']
})
export class IssueTrackerDetailsComponent implements OnInit {
	@Input() data: any;
	@Input() formType: string;
	@Output() public tabSwitch: EventEmitter<any> = new EventEmitter<any>();

	issueTrackerDetailsForm: FormGroup;
	form: FormGroup;
	formErrors: any;
	projectFormErrors: any;

	private unsubscribe: Subject<any> = new Subject();
	
	constructor(
		private formBuilder : FormBuilder,
		private route: ActivatedRoute, 
		private router: Router) { 

		this.projectFormErrors = {
			_id: {},
			name: {},
			comments: {},
			remarks: {},
			assigned: {},
			issueType: {},
			department: {},
			updatedBy: {},
			createdBy: {},
			completionDate: {},
			status : {},
			ageing: {},
			updatedAt : {},
			createdAt : {},
		};
	}

	ngOnInit() {
		this.issueTrackerDetailsForm = this.formBuilder.group({
			_id: ['', Validators.required],
			name: ['', Validators.required],
			comments: ['', Validators.required],
			remarks: ['', Validators.required],
			assigned: ['', Validators.required],
			issueType: ['', Validators.required],
			department: ['', Validators.required],
			updatedBy: ['', Validators.required],
			createdBy: ['', Validators.required],
			completionDate: ['', Validators.required],
			status : ['', Validators.required],
			ageing: ['', Validators.required],
			updatedAt : ['', Validators.required],
			createdAt : ['' , Validators.required ]
		});
		this.issueTrackerDetailsForm.valueChanges.subscribe(() => {
			this.onProjectFormValuesChanges();
		})
		this.assignValuesToForm();
	}

	assignValuesToForm() {
		if(this.formType !== 'create') {
			this.issueTrackerDetailsForm.patchValue(this.data)
		}
	}

	onProjectFormValuesChanges() {
		for (const field in this.formErrors) {
			if (!this.formErrors.hasOwnProperty(field)) {
				continue;
			}
	      // Clear previous errors
	      this.formErrors[field] = {};
	      // Get the control
	      const control = this.form.get(field);

	      if (control && control.dirty && !control.valid) {
	      	this.formErrors[field] = control.errors;
	      }
	    }
	  }

	  onFormSubmit() {
	  	console.log(this.issueTrackerDetailsForm.value);
	  }
	}
