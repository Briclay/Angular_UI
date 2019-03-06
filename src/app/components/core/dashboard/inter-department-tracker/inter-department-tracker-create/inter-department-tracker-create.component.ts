import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup,FormArray, FormBuilder, Validators } from '@angular/forms';
import { Router , ActivatedRoute} from '@angular/router';
import { MatDialog,  MatSnackBar ,MAT_DIALOG_DATA } from '@angular/material';
import { merge as observableMerge, Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import { ProjectService } from '../../../dashboard/projects/project.service';
import { UserService} from '../../../dashboard/user/user.service';
import { DepartmentService} from "../../../../../services/department/department.service";
import { IssueTrackerService } from '../inter-department-tracker.service';
import * as _ from 'lodash';

@Component({
	selector: 'app-issue-tracker-create',
	templateUrl: './inter-department-tracker-create.component.html',
	styleUrls: ['./inter-department-tracker-create.component.scss']
})
export class IssueTrackerCreateComponent implements OnInit {
	@Input() data: any;
	@Input() formType: string;
	@Output() public tabSwitch: EventEmitter<any> = new EventEmitter<any>();

	issueTrackerCreateForm: FormGroup;
	form: FormGroup;
	formErrors: any;
	projects = []
	users = []
	issueTrackerList: any;
	allIssuesForReferences = [];
	allIssuesCodes =[];
	allIssuesType = [];
	loading : boolean;
	private unsubscribe: Subject<any> = new Subject();
	orgID : any;
	selectedUserDepartment : any;
	selecetedProjectData : any;
	selectedDepartmentData : any;
	selectedAssignedUserData : any;
	isDepratmentLoading : boolean;
	createdBy : any;
	user :any;
	depratmentLists : any;
	userDropdownEnable = false;
	validatedAge = 0;
	issueCodeValue : any;
	dateOfCompletionFilter :any;
	comments: FormArray;
	commentformGroup: FormGroup;
	selectedSubType : any;
	dep = [ 'aa', 'aa','aa', 'aa']
	constructor(
    	private dialog: MatDialog,
		private departService : DepartmentService,
		private projectService : ProjectService,
		private issueTrackerService: IssueTrackerService,
		private userService : UserService,
		private formBuilder : FormBuilder,
		private snackBar : MatSnackBar,
		private route: ActivatedRoute, 
		private router: Router) { 
		
		let org = JSON.parse(window.localStorage.getItem('authUserOrganisation'));
		this.orgID = org._id
		this.user = JSON.parse(window.localStorage.getItem('authUser'));
         
        let day = new Date();
		this.dateOfCompletionFilter = new Date(day);
		this.dateOfCompletionFilter.setDate(day.getDate()+1);
	}

	ngOnInit() {
		this.issueTrackerCreateForm = this.formBuilder.group({
			_organisationId: [this.orgID , Validators.required ],
			_projectId: ['' , Validators.required ],
			projectName:['' , Validators.required ],
			_departmentId:['' , Validators.required ],
			departmentName:['' , Validators.required ],
			type: ['', Validators.required ],
			issueCode: ['' , Validators.required ],
			description: ['' , Validators.required ],
			status: ['OPEN' , Validators.required ],
			remark: ['' , Validators.required ],
			_createdBy: [this.user._id , Validators.required ],
			createdBy : [this.user.username , Validators.required ],
			createdAt: [new Date(), Validators.required ],
			dateOfCompletion: ['' , Validators.required ],
			age : [0 , Validators.required ],
			refId: [''],
			comments : this.formBuilder.array([])
		});
		this.commentformGroup = this.formBuilder.group({
			comments: ['' , Validators.required ],
			completionDate: [''],
			_updatedBy: [''],
			updatedBy:['' ],
			assignedTo: ['', Validators.required ],
			assignedName: ['' , Validators.required ],
			updatedAt: [''],
			subType: [''],
			status: ['OPEN' , Validators.required ],
		})
		this.issueTrackerCreateForm.valueChanges.subscribe(() => {
			this.onProjectFormValuesChanges();
		})
		this.assignValuesToForm();
		this.getProjects()
		this.getAllDepartment()
		this.getAllIssues()
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

	selectProject(event){
		this.projectService.getSingleProjects(event._id).pipe().subscribe(res => {
			this.selecetedProjectData = res;
		}, (error: any) => {
			console.error('error', error);
		});
	}

	getAllDepartment(){
		this.departService.getAll(this.orgID).pipe().subscribe(res => {
			this.depratmentLists = res;
		}, (error: any) => {
			console.error('error', error);
		});
	}

	selectDepartment(event){
		this.selectedDepartmentData = event;
		if(event && event._id){
			this.userService.getUserByDepId(event._id).pipe().subscribe(res => {
				this.userDropdownEnable = true;
				this.users = res;
			}, (error: any) => {
				console.error('error', error);
				this.loading = false;
			});
		}
	}

	selectedUser (event){
		this.selectedAssignedUserData = event;
	}

	getAllIssues(){
		this.issueTrackerService.getAllIssueTracker().pipe().subscribe(res => {
			this.allIssuesForReferences = res;
        	this.issueTrackerCreateForm.controls['issueCode'].setValue('ID' + this.createIssueId(res.length + 1));
			this.allIssuesForReferences.forEach(issue => {
				this.allIssuesCodes.push({'id':issue.id ,'name': issue.issueCode })
				this.allIssuesType.push({'id':issue.id ,'name': issue.type })
			})
		}, (error: any) => {
			console.error('error', error);
		});
	}

	createIssueId(number) {
	    let str = '' + number;
	    let count = 0;
	    const padArray = [{ len: 1, size: 3 }, { len: 2, size: 2 }, { len: 3, size: 1 }, { len: 4, size: 0 }];
	    const findSize = _.find(padArray, function (item) {
	      return item.len === str.length;
	    });
	    while (count < findSize.size) {
	      str = '0' + str;
	      count++;
	    }
	    return str;
	}

	getProjects() {
		this.loading = true;
		this.projectService.getProjects(this.orgID).pipe().subscribe(res => {
			this.loading = false;
			this.projects = res;
			this.issueCodeValue = this.issueTrackerCreateForm.value.issueCode;
		}, (error: any) => {
			console.error('error', error);
			this.loading = false;
		});
	}

	onFormSubmit() {
		this.issueTrackerCreateForm.value._projectId = this.selecetedProjectData._id;
		this.issueTrackerCreateForm.value.projectName = this.selecetedProjectData.name;
		this.issueTrackerCreateForm.value._departmentId = this.selectedDepartmentData._id;
		this.issueTrackerCreateForm.value.departmentName = this.selectedDepartmentData.name;
        let assignedUserName = this.selectedAssignedUserData.name.first +" " + this.selectedAssignedUserData.name.last;
		this.commentformGroup.value.assignedTo = this.selectedAssignedUserData._id
		this.commentformGroup.value.assignedName = assignedUserName
		this.commentformGroup.value.status = 'INPROGRESS'
       	this.issueTrackerCreateForm.value.comments = [this.commentformGroup.value];
		console.log(this.issueTrackerCreateForm.value, "issuesCraetedSubmittedValue");
		this.issueTrackerService.createIssueTracker(this.issueTrackerCreateForm.value)
		.pipe().subscribe(response => {
			console.log(response, 'response.message')
			this.snackBar.open('Issue created successfully', 'Issue-tracker', {
				duration: 2000,
			});
			this.issueTrackerCreateForm['_touched'] = false;
			let tabReq = {index: 0}
          	this.tabSwitch.emit(tabReq);
		}, (error: any) => {
			this.snackBar.open(error.message, 'Issue-tracker', {
				duration: 2000,
			});
			console.log(error , "error")
		});
	}
}

