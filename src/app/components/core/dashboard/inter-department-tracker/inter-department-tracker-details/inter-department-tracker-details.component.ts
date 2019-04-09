import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup,FormArray, FormBuilder, Validators } from '@angular/forms';
import { Router , ActivatedRoute} from '@angular/router';
import { MatDialog,  MatSnackBar ,MAT_DIALOG_DATA } from '@angular/material';
import {merge as observableMerge, Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import { UserService} from '../../../dashboard/user/user.service';
import { DepartmentService} from '../../../../../services/department/department.service';
import * as _ from 'lodash';
import { IssueTrackerService } from '../inter-department-tracker.service';
declare var moment: any;
import { UserSelectDialogComponent } from './user-select-dialog/user-select-dialog.component';

@Component({
	selector: 'app-issue-tracker-details',
	templateUrl: './inter-department-tracker-details.component.html',
	styleUrls: ['./inter-department-tracker-details.component.scss']
})
export class IssueTrackerDetailsComponent implements OnInit {
	@Input() data: any;
	@Input() formType: string;
	@Output() public tabSwitch: EventEmitter<any> = new EventEmitter<any>();
	@Output() public updateRefresh: EventEmitter<any> = new EventEmitter<any>();

	issueTrackerDetailsForm : FormGroup;
	form: FormGroup;
	formErrors: any;
	updateLoading = false;
	users = []
	orgID : any;
	commentsArray = [];
	selectedAssignedUserData : any;
	commentformGroup : FormGroup;
	createCommentformGroup : FormGroup;
	user  :any;
	allIssuesType=[];
	allIssuesForReferences: any;
	closeFlag  = false;
	dateFilter:any;
	todayDateFilter = new Date()
	newCreateFlag = false;
	selectedUserData : any;
	myFilter : any;
	userID : any;
	dateOfCompletionFilter :any;
	private unsubscribe: Subject<any> = new Subject();
	constructor(
		private formBuilder : FormBuilder,
		private route: ActivatedRoute, 
		private router: Router,
   		private dialog : MatDialog,
		private snackBar : MatSnackBar,
		private userService : UserService,
		private departService : DepartmentService,
		private issueTrackerService: IssueTrackerService) { 

		let org = JSON.parse(window.localStorage.getItem('authUserOrganisation'));
		this.orgID = org._id
		this.user = JSON.parse(window.localStorage.getItem('authUser'));
		this.userID = this.user._id
	    let day = new Date();
	    this.dateOfCompletionFilter = new Date(day);
	    this.dateOfCompletionFilter.setDate(day.getDate()+1);
	    this.myFilter = day
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
			refId: ['' , Validators.required ],
			age : ['' , Validators.required ],
			comments : this.formBuilder.array([])
		});
		this.commentformGroup = this.formBuilder.group({
			comments: ['' , Validators.required],
			completionDate: [''],
			_updatedBy: [this.user._id],
			updatedBy:[this.user.username],
			assignedTo: ['', Validators.required],
			assignedName: ['' , Validators.required],
			updatedAt: [new Date()],
			subType: ['', Validators.required],
			status: ['' , Validators.required ],
			actualCompletionDate : ['' , Validators.required ],
		})
		this.createCommentformGroup = this.formBuilder.group({
			comments: ['' , Validators.required],
			completionDate: [''],
			_updatedBy: [this.user._id],
			updatedBy:[this.user.username],
			assignedTo: ['', Validators.required],
			assignedName: ['' , Validators.required],
			updatedAt: [new Date()],
			subType: [''],
			status: ['OPEN' , Validators.required ],
			actualCompletionDate : ['' , Validators.required ],
		})
		this.issueTrackerDetailsForm.valueChanges.subscribe(() => {
			this.onIssueTrackerFormValuesChanges();
		})
		this.assignValuesToForm();
		this.getUsers();
		this.getAllIssues();
	}

	assignValuesToForm() {										
		this.issueTrackerDetailsForm.patchValue(this.data)
		this.commentformGroup.patchValue(this.data.comments)
		console.log(this.commentformGroup, 'this.commentformGroup')
		console.log(this.issueTrackerDetailsForm, 'aftrpatchvalue')
		this.setCommentsCategories();
	}

	getAllIssues(){
		this.issueTrackerService.getAllIssueTracker().pipe().subscribe(res => {
			this.allIssuesForReferences = res;
			this.allIssuesForReferences.forEach(issue => {
				this.allIssuesType.push({'id':issue.id ,'name': issue.type })
			})
		}, (error: any) => {
			console.error('error', error);
		});
	}

	userSelectDialog(){
		const dialogRef = this.dialog.open(UserSelectDialogComponent, {
          width: '550px',
        });
        dialogRef.afterClosed().subscribe(result => {
           this.selectedUserData = result;
        });
	}

	setCommentsCategories(){
		let control = []
		this.data.comments.forEach(x => {
			control.push(this.formBuilder.group(x))
		})
		this.issueTrackerDetailsForm.setControl('comments', this.formBuilder.array(control));
	}
	onIssueTrackerFormValuesChanges() {
		for (const field in this.formErrors) {
			if (!this.formErrors.hasOwnProperty(field)) {
				continue;
			}
			// Clear previous errors
			this.formErrors[field] = {};
			// Get the control
			let control;
			if(this.issueTrackerDetailsForm.value){
			  control = this.issueTrackerDetailsForm.get(field);
			}
			 if (this.commentformGroup.value) {
			  control = this.commentformGroup.get(field);
			}
			 if (this.createCommentformGroup.value) {
			  control = this.createCommentformGroup.get(field);
			}

			if (control && control.dirty && !control.valid) {
				this.formErrors[field] = control.errors;
			}
	  	}
	}

	selectedUser (event){
		this.selectedAssignedUserData = event;
	}

	addComments(){
		this.commentsArray.push(this.createCommentformGroup.value);
		console.log(this.commentsArray, "comments-all")
	}

	getUsers() {
		this.userService.getUser(this.orgID).pipe().subscribe(res => {
			this.users = res;
		}, (error: any) => {
			console.error('error', error);
		});
	}

	closeTheIssueComment(comment){
		this.issueTrackerDetailsForm.value.comments.forEach(v => {
			if(v.id === comment.value.id){
				v.status = 'CLOSED'
				v.actualCompletionDate = new Date()
			}
		})
		this.onFormSubmit()
	}

	closeTheIssue(){
		this.issueTrackerDetailsForm.value.status = 'CLOSED';
		this.onFormSubmit()
	}

	onFormSubmit() {
		this.updateLoading = true;
		let allDates= [];
		let maxDate;
        if(this.newCreateFlag){
	    	this.issueTrackerDetailsForm.value.comments.push(this.createCommentformGroup.value)
        }
		this.issueTrackerDetailsForm.value.comments.forEach(v => {
			if(v.completionDate !== ""){
				allDates.push(moment(v.completionDate).local().format("MM-DD-YYYY"))
			}
			console.log(allDates, 'allDates')
		}) 
        this.issueTrackerDetailsForm.value.comments.forEach(v => {
			v.actualCompletionDate = moment(v.actualCompletionDate).local().format("YYYY-MM-DD")
		}) 
		this.issueTrackerDetailsForm.value.dateOfCompletion = moment(this.issueTrackerDetailsForm.value.dateOfCompletion).local().format("YYYY-MM-DD")
		
		maxDate = allDates && allDates.reduce(function (a, b) { return a > b ? a : b; });
		console.log(maxDate, 'maxDate')
		let dateOfCompletion = moment(this.issueTrackerDetailsForm.value.dateOfCompletion).local().format("MM-DD-YYYY")
		let oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
		let firstDate = new Date(dateOfCompletion);
		let secondDate = new Date(maxDate);
		let diffDays = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime())/(oneDay)));
        this.issueTrackerDetailsForm.value.age = diffDays || 0;
		console.log(this.issueTrackerDetailsForm.value, "issuesCraetedSubmittedValue");
		this.issueTrackerService.updateIssueTracker( this.issueTrackerDetailsForm.value.id, this.issueTrackerDetailsForm.value)
		.pipe().subscribe(response => {
			console.log(response, 'response.message')
			this.snackBar.open('Issue updated successfully', 'Issue-tracker', {
				duration: 2000,
			});
			this.updateRefresh.emit()
			this.updateLoading = false;
			/*const path = '/dashboard/issue-tracker';
			this.router.navigateByUrl(path);*/
			this.issueTrackerDetailsForm['_touched'] = false;
		}, (error: any) => {
			this.updateLoading = false;
			this.snackBar.open(error.message, 'Issue-tracker', {
				duration: 2000,
			});
			console.log(error , "error")
		});
	}
}
