import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup,FormArray, FormBuilder, Validators } from '@angular/forms';
import { Router , ActivatedRoute} from '@angular/router';
import { MatDialog,  MatSnackBar ,MAT_DIALOG_DATA } from '@angular/material';
import {merge as observableMerge, Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import { UserService} from '../../../dashboard/user/user.service';
import { DepartmentService} from '../../../../../services/department/department.service';
import * as _ from 'lodash';
import { IssueTrackerService } from '../issue-tracker.service';

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
	users = []
	orgID : any;
	commentsArray = [];
	commentformGroup : FormGroup;
	private unsubscribe: Subject<any> = new Subject();
	constructor(
		private formBuilder : FormBuilder,
		private route: ActivatedRoute, 
		private router: Router,
		private snackBar : MatSnackBar,
		private userService : UserService,
		private departService : DepartmentService,
		private issueTrackerService: IssueTrackerService,) { 

		let org = JSON.parse(window.localStorage.getItem('authUserOrganisation'));
		this.orgID = org._id
		let user = JSON.parse(window.localStorage.getItem('authUser'));
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
			_createdBy: ['' , Validators.required ],
			createdBy : ['' , Validators.required ],
			createdAt: ['' , Validators.required ],
			dateOfCompletion: ['' , Validators.required ],
			dueDate: ['' , Validators.required ],
			age : ['' , Validators.required ],
			comments : this.formBuilder.array([
				
			])
			
		});
		this.commentformGroup = this.formBuilder.group({
			comments: ['Initial comment' , Validators.required ],
			completionDate: [''],
			_updatedBy: ['' ],
			updatedBy:['' ],
			assignedTo: ['', Validators.required ],
			assignedName: ['' , Validators.required ],
			updatedAt: [''],
			subType: ['' ],
			status: ['OPEN' , Validators.required ],
		})
		this.issueTrackerDetailsForm.valueChanges.subscribe(() => {
			this.onProjectFormValuesChanges();
		})
		this.assignValuesToForm();
		this.getUsers()
	}

	assignValuesToForm() {										
		this.issueTrackerDetailsForm.patchValue(this.data)
		this.commentformGroup.patchValue(this.data.comments)
		console.log(this.issueTrackerDetailsForm, 'aftrpatchvalue')
  		this.setCommentsCategories()
	}

	setCommentsCategories(){
	  let control = []
	  this.data.comments.forEach(x => {
	    control.push(this.formBuilder.group(x))
	  })
	  this.issueTrackerDetailsForm.setControl('comments', this.formBuilder.array(control));
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

  addComments(){
  	if(this.issueTrackerDetailsForm.value.comments.length > 0){
    	this.commentsArray.push(this.issueTrackerDetailsForm.value.comments);
  	}
  	else{
    	this.commentsArray.push(this.commentformGroup.value);
  	}
    console.log(this.commentsArray, "comments-all")
  }

  getUsers() {
  	this.userService.getUser(this.orgID).pipe().subscribe(res => {
  		this.users = res;
  	}, (error: any) => {
  		console.error('error', error);
  	});
  }

  onFormSubmit() {
  	this.commentsArray.forEach(v => {
    	this.issueTrackerDetailsForm.value.comments.push(v)
  	}) 
	console.log(this.issueTrackerDetailsForm.value, "issuesCraetedSubmittedValue");

	this.issueTrackerService.updateIssueTracker( this.issueTrackerDetailsForm.value.id, this.issueTrackerDetailsForm.value)
	.pipe().subscribe(response => {
		console.log(response, 'response.message')
		this.snackBar.open('Issue updated successfully', 'Issue-tracker', {
			duration: 2000,
		});
		this.issueTrackerDetailsForm['_touched'] = false;
	}, (error: any) => {
		this.snackBar.open(error.message, 'Issue-tracker', {
			duration: 2000,
		});
		console.log(error , "error")
	});
  }
}
