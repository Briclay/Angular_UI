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

	issueTrackerDetailsForm : FormGroup;
	form: FormGroup;
	formErrors: any;
	issueTrackerDetailsFormErrors: any;

	private unsubscribe: Subject<any> = new Subject();
	
	constructor(
		private formBuilder : FormBuilder,
		private route: ActivatedRoute, 
		private router: Router) { 

		this.issueTrackerDetailsFormErrors = {
			id: {},
			_organisationId: {},
			_projectId: {},
			type: {},
			issueCode: {},
			description: {},
			status: {},
			remark: {},
			assignedTo: {},
			assignedName: {},
			_createdBy: {},
			createdAt: {},
			dateOfCompletion: {},
			dueDate: {},
			comments : {
				comments: {},
				completionDate: {},
				_updatedBy: {},
				updatedBy:{},
				updatedAt: {}
			}
		}
	}

	ngOnInit() {
		this.issueTrackerDetailsForm = this.formBuilder.group({
			id: ['' , Validators.required ],
			_organisationId: ['' , Validators.required ],
			_projectId: ['' , Validators.required ],
			type: ['' , Validators.required ],
			issueCode: ['' , Validators.required ],
			description: ['' , Validators.required ],
			status: ['' , Validators.required ],
			remark: ['' , Validators.required ],
			assignedTo: ['' , Validators.required ],
			assignedName: ['' , Validators.required ],
			_createdBy: ['' , Validators.required ],
			createdAt: ['' , Validators.required ],
			dateOfCompletion: ['' , Validators.required ],
			dueDate: ['' , Validators.required ],
			comments : this.formBuilder.group({
				comments: ['' , Validators.required ],
				completionDate: ['' , Validators.required ],
				_updatedBy: ['' , Validators.required ],
				updatedBy:['' , Validators.required ],
				updatedAt: ['' , Validators.required ],
			})
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
