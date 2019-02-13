import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router , ActivatedRoute} from '@angular/router';
import { MatDialog,  MatSnackBar ,MAT_DIALOG_DATA } from '@angular/material';
import { merge as observableMerge, Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import { ProjectService } from '../../../dashboard/projects/project.service';
import { UserService} from '../../../dashboard/user/user.service';
import { DepartmentService} from "../../../../../services/department/department.service";

@Component({
	selector: 'app-issue-tracker-create',
	templateUrl: './issue-tracker-create.component.html',
	styleUrls: ['./issue-tracker-create.component.scss']
})
export class IssueTrackerCreateComponent implements OnInit {
	@Input() data: any;
	@Input() formType: string;
	@Output() public tabSwitch: EventEmitter<any> = new EventEmitter<any>();

	issueTrackerCreateForm: FormGroup;
	form: FormGroup;
	formErrors: any;
	projectFormErrors: any;
	projects = []
	users = []
	allprojects = [];
	loading : boolean;
	private unsubscribe: Subject<any> = new Subject();
	orgID : any;
	selectedUserDepartment : any;
	isDepratmentLoading : boolean;
	issueTypes  = [ 'issues1' , 'issues2' ,'issues3' ,'issues4' ];
	createdBy : any;
	constructor(
		private departService : DepartmentService,
		private projectService : ProjectService,
		private userService : UserService,
		private formBuilder : FormBuilder,
		private route: ActivatedRoute, 
		private router: Router) { 

		this.projectFormErrors = {
			project: {},
			IssuesID: {},
			issueType: {},
			department: {},
			description : {},
			assigned: {},
			createdAt : {},
			createdBy  : {},
			completionDate: {},
			remarks: {}
		};
		let org = JSON.parse(window.localStorage.getItem('authUserOrganisation'));
		this.orgID = org._id
		let user = JSON.parse(window.localStorage.getItem('authUser'));
		this.createdBy = user.username;
	}

	ngOnInit() {
		this.issueTrackerCreateForm = this.formBuilder.group({
			project: ['', Validators.required],
			IssuesID: ['', Validators.required],
			issueType: ['', Validators.required],
			department: ['', Validators.required],
			description : ['', Validators.required],
			assigned: ['', Validators.required],
			createdAt : [new Date(), Validators.required],
			createdBy : [this.createdBy, Validators.required],
			completionDate: ['', Validators.required],
			remarks: ['', Validators.required]
		});
		this.issueTrackerCreateForm.valueChanges.subscribe(() => {
			this.onProjectFormValuesChanges();
		})
		this.assignValuesToForm();
		this.getProjects()
		this.getUsers()
	}

	assignValuesToForm() {
		if(this.formType !== 'create') {
			this.issueTrackerCreateForm.patchValue(this.data)
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

  selectedUser (event){
  	this.isDepratmentLoading = true;
  	if(event._departmentId){
  		this.departService.getOne(event._departmentId).pipe().subscribe(res => {
  			this.isDepratmentLoading = false;
  			this.selectedUserDepartment = res.name;
  		}, (error: any) => {
  			console.error('error', error);
  			this.isDepratmentLoading = false;
  		});
  	}
  }

  getProjects() {
  	this.loading = true;
  	this.projectService.getProjects(this.orgID).pipe().subscribe(res => {
  		this.loading = false;
  		this.projects = res;
  	}, (error: any) => {
  		console.error('error', error);
  		this.loading = false;
  	});
  }

  getUsers() {
  	this.loading = true;
  	this.userService.getUser(this.orgID).pipe().subscribe(res => {
  		this.loading = false;
  		this.users = res;
  	}, (error: any) => {
  		console.error('error', error);
  		this.loading = false;
  	});
  }

  onFormSubmit() {
  	console.log(this.issueTrackerCreateForm.value, "issuesCraetedSubmittedValue");
  }
}

