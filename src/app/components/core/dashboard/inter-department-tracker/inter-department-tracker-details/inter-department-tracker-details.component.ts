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
		enableAddComment = false;
		allIssuesForReferences: any;
		closeFlag  = false;
		dateFilter:any;
		todayDateFilter = new Date()
		newCreateFlag = false;
		selectedUserData : any;
		myFilter : any;
		userID : any;
		assignUserCheck = false;
		dateOfCompletionFilter :any;
		depratmentLists : any;
		usersList : any;
		selectedDepartmentData : any;
		userDropdownEnable  = false
		viewComment= false;
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
			/*issue tracker form*/
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
			/*comment form group*/
			this.commentformGroup = this.formBuilder.group({
				comments: ['' , Validators.required],
				completionDate: [''],
				_updatedBy: [this.user._id],
				updatedBy:[this.user.username],
				assignedTo: ['', Validators.required],
				assignedName: ['' , Validators.required],
				departmentName: ['' , Validators.required],
				updatedAt: [new Date()],
				subType: ['', Validators.required],
				status: ['' , Validators.required ],
				actualCompletionDate : ['' , Validators.required ],
			});
			/*create a comment form group*/
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
				departmentName: ['', Validators.required]
			})
			this.issueTrackerDetailsForm.valueChanges.subscribe(() => {
				this.onIssueTrackerFormValuesChanges();
			})
			this.assignValuesToForm();
			this.getUsers();
			this.getAllIssues();
			this.getAllDepartment();
		}
		
		selectedUser (event){
			this.selectedAssignedUserData = event;
		}
		/*method to get all department*/
		getAllDepartment(){
			this.departService.getAll(this.orgID).pipe().subscribe(res => {
				this.depratmentLists = res;
			}, (error: any) => {
				console.error('error', error);
			});
		}
		/*drop down to select Department*/
		selectDepartment(event){
			this.selectedDepartmentData = event;
			if(event && event._id){
				this.userService.getUserByDepId(event._id).pipe().subscribe(res => {
					this.usersList = res;
				}, (error: any) => {
					console.error('error', error);
				});
			}
		}

		reset(){
			this.createCommentformGroup.reset();
		}
	//assigning values of form to data
	assignValuesToForm() {										
		this.issueTrackerDetailsForm.patchValue(this.data)
		this.commentformGroup.patchValue(this.data.comments)
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

		addComments(){
			this.enableAddComment = true;
			this.commentsArray.push(this.createCommentformGroup.value);
		}
		
		deleteMsg(msg:string) {
			this.commentsArray.splice(this.commentsArray.indexOf(msg), 1);  
			this.createCommentformGroup.reset();
		}
		/*method to get all user*/
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
		}) 
		this.issueTrackerDetailsForm.value.comments.forEach(v => {
			v.actualCompletionDate = moment(v.actualCompletionDate).local().format("YYYY-MM-DD")
		}) 
		this.issueTrackerDetailsForm.value.dateOfCompletion = moment(this.issueTrackerDetailsForm.value.dateOfCompletion).local().format("YYYY-MM-DD")
		maxDate = allDates && allDates.reduce(function (a, b) { return a > b ? a : b; });
		let dateOfCompletion = moment(this.issueTrackerDetailsForm.value.dateOfCompletion).local().format("MM-DD-YYYY")
			let oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
			let firstDate = new Date(dateOfCompletion);
			let secondDate = new Date(maxDate);
			let diffDays = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime())/(oneDay)));
			this.issueTrackerDetailsForm.value.age = diffDays || 0;
			this.issueTrackerService.updateIssueTracker( this.issueTrackerDetailsForm.value.id, this.issueTrackerDetailsForm.value)
			.pipe().subscribe(response => {
				this.snackBar.open('Issue updated successfully', 'Issue-tracker', {
					duration: 2000,
				});
				this.updateRefresh.emit()
				this.updateLoading = false;
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
