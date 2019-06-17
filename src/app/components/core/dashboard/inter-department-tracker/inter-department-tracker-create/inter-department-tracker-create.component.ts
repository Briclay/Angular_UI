	import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
	import { FormControl, FormGroup,FormArray, FormBuilder, Validators } from '@angular/forms';
	import { Router , ActivatedRoute} from '@angular/router';
	import { MatDialog,  MatSnackBar ,MAT_DIALOG_DATA } from '@angular/material';
	import { merge as observableMerge, Subject ,  Observable, of,interval} from 'rxjs';
	import {takeUntil,flatMap,map,delay} from 'rxjs/operators';
	import { ProjectService } from '../../../dashboard/projects/project.service';
	import { UserService} from '../../../dashboard/user/user.service';
	import { DepartmentService} from "../../../../../services/department/department.service";
	import { IssueTrackerService } from '../inter-department-tracker.service';
	import * as _ from 'lodash';
	declare var moment: any;

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
		createCommentformGroup: FormGroup;
		form: FormGroup;
		formErrors: any;
		projects = []
		users = []
		issueTrackerList: any;
		allIssuesForReferences = [];
		allIssuesCodes =[];
		allIssuesType = [];
		newCreateFlag = false;
		loading = false;
		private unsubscribe: Subject<any> = new Subject();
		orgID : any;
		selectedUserDepartment : any;
		selecetedProjectData : any;
		selectedDepartmentData : any;
		selectedAssignedUserData : any;
		isDepratmentLoading : boolean;
		createdBy : any;
		commentsArray  =[]
		assignUserFlag = false;
		user :any;
		depratmentLists : any;
		userDropdownEnable = false;
		validatedAge = 0;
		issueCodeValue : any;
		dateOfCompletionFilter :any;
		comments: FormArray;
		commentformGroup: FormGroup;
		addForm : FormGroup;
		selectedSubType : any;
		assignUserCheck = false
		selectedUserData : any;
		myFilter : any;
		selectedName : any;
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
			this.myFilter = day
		}

		ngOnInit() {
			/*issue tracker Form*/
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
				remark: [''],
				_createdBy: [this.user._id , Validators.required ],
				createdBy : [this.user.username , Validators.required ],
				createdAt: [new Date(), Validators.required ],
				dateOfCompletion: ['' , Validators.required ],
				age : [0 , Validators.required ],
				refId: [''],
				comments : this.formBuilder.array([])
			});
			/*comment form group*/
			this.commentformGroup = this.formBuilder.group({
				departmentName : [''],
				comments: [''],
				completionDate: [''],
				_updatedBy: [this.user._id],
				updatedBy:[this.user.username],
				assignedTo: ['', Validators.required],
				assignedName: ['' , Validators.required],
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
			})
			this.issueTrackerCreateForm.valueChanges.subscribe(() => {
				this.onProjectFormValuesChanges();
			})
			this.assignValuesToForm();
			this.getProjects()
			this.getAllDepartment()
			this.getAllIssues()
		}
		//assigning values of form to data
		assignValuesToForm() {
			if(this.formType !== 'create') {
				this.issueTrackerCreateForm.patchValue(this.data)
			}
		}
		addComments(){
			this.newCreateFlag = true;
			this.commentsArray.push(this.commentformGroup.value);
			if(this.issueTrackerCreateForm.value.comments.length === 0){
				this.issueTrackerCreateForm.value.comments.push(this.commentformGroup.value);
			}
			else{
				this.issueTrackerCreateForm.value.comments.push(this.commentsArray[0]);
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
			let control;
				if(this.issueTrackerCreateForm.value){
				control = this.issueTrackerCreateForm.get(field);
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
		//Drop Down of select a project
		selectProject(event){
			this.projectService.getSingleProjects(event._id).pipe().subscribe(res => {
				this.selecetedProjectData = res;
			}, (error: any) => {
				console.error('error', error);
			});
		}
		/*method to get all department*/
		getAllDepartment(){
			this.departService.getAll(this.orgID).pipe().subscribe(res => {
				this.depratmentLists = res;
			}, (error: any) => {
				console.error('error', error);
			});
		}
		//Drop Down of select a Department
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
		checkDep(event){
			if(!this.userDropdownEnable){
				this.snackBar.open('Please select the department first', 'inter-department-tracker', {
					duration: 2000,
				});
			}
			else{
				this.selectedUser(event)
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
		/*method to get all project*/
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

		onFormCancel(){
			this.issueTrackerCreateForm.reset()
			this.commentformGroup.reset()
			this.ngOnInit()
		}

		onFormSubmit() {
			let flag = false
			if(this.newCreateFlag){
				this.issueTrackerCreateForm.value.comments.push(this.commentformGroup.value)
			}
			this.issueTrackerCreateForm.value.dateOfCompletion = moment(this.issueTrackerCreateForm.value.dateOfCompletion).local().format("YYYY-MM-DD")
			this.issueTrackerCreateForm.value._projectId = this.selecetedProjectData && this.selecetedProjectData._id;
			this.issueTrackerCreateForm.value.projectName = this.selecetedProjectData && this.selecetedProjectData.name;
			if(this.selectedDepartmentData){
				this.issueTrackerCreateForm.value._departmentId = this.selectedDepartmentData._id;
				this.issueTrackerCreateForm.value.departmentName = this.selectedDepartmentData.name;
			} 
			this.commentformGroup.value.status = 'OPEN'
			this.issueTrackerCreateForm.value.comments.shift()
			this.issueTrackerCreateForm.value.comments.forEach(v => {
				delete v.departmentName
			}) 
			this.issueTrackerCreateForm.value.comments.forEach(v => {
				v.completionDate = moment(v.completionDate).local().format("YYYY-MM-DD")
				v.actualCompletionDate = moment(v.actualCompletionDate).local().format("YYYY-MM-DD")
				if(v.assignedTo !== ""){
					this.loading = true;
					_.forEach(this.users, function(user) {
						if(user._id === v.assignedTo){
							v.assignedName = user.name.first + " "+ user.name.last;
						}
					})
				}
			}) 
			this.issueTrackerService.createIssueTracker(this.issueTrackerCreateForm.value)
			.pipe(delay(10000)).subscribe(response => {
				this.loading = false;
				this.snackBar.open('inter-department-tracker created successfully', 'inter-department-tracker', {
					duration: 2000,
				});
				this.issueTrackerCreateForm.reset();
				let tabReq = {index: 0}
				this.tabSwitch.emit(tabReq);
			}, (error: any) => {
				this.snackBar.open(error.message, 'inter-department-tracker', {
					duration: 2000,
				});
				console.log(error , "error")
			});
		}
	}

