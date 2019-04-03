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
import { UserSelectDialogComponent } from '../inter-department-tracker-details/user-select-dialog/user-select-dialog.component';

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
	loading : boolean;
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
		// moment(v.completionDate).local().format("YYYY-MM-DD")
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
			remark: [''],
			_createdBy: [this.user._id , Validators.required ],
			createdBy : [this.user.username , Validators.required ],
			createdAt: [new Date(), Validators.required ],
			dateOfCompletion: ['' , Validators.required ],
			age : [0 , Validators.required ],
			refId: [''],
			comments : this.formBuilder.array([])
		});
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
	addComments(){
		this.newCreateFlag = true;
		this.commentsArray.push(this.commentformGroup.value);
		console.log(this.commentsArray, "INITcommentsArray")

		if(this.issueTrackerCreateForm.value.comments.length === 0){
			this.issueTrackerCreateForm.value.comments.push(this.commentformGroup.value);
			console.log(this.commentsArray, "firsttymcommentscomments")
		}
		else{
			/*this.selectedUserData = {};
			if(Object.keys(this.selectedUserData).length === 0;){
				this.assignUserFlag = false
			} */
			this.issueTrackerCreateForm.value.comments.push(this.commentsArray[0]);
			console.log(this.issueTrackerCreateForm.value.comments, "f2ndcommentscomments")
		}
		/*(this.issueTrackerCreateForm.get('comments') as FormArray).push(this.commentformGroup.value)*/
		console.log(this.issueTrackerCreateForm.value.comments, "comments-all")
	}

 //    userSelectDialog(){
	// 	const dialogRef = this.dialog.open(UserSelectDialogComponent, {
 //          width: '550px',
 //        });
 //        dialogRef.afterClosed().subscribe(result => {
 //        	if(result){
	//            this.selectedUserData = result;
	//            this.selectedName = this.selectedUserData.userName.first + " "+this.selectedUserData.userName.last
	//            this.commentformGroup.value.assignedName  = this.selectedName
	//            console.log(this.commentformGroup.value)
	//            console.log(this.selectedUserData)
	//            this.assignUserFlag = true;
 //        	}
 //        });
	// }

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
		this.issueTrackerCreateForm.value._departmentId = this.selectedDepartmentData._id;
		this.issueTrackerCreateForm.value.departmentName = this.selectedDepartmentData.name;
		this.commentformGroup.value.status = 'OPEN'
		//this.issueTrackerCreateForm.value.comments = this.array;
       	//this.issueTrackerCreateForm.value.comments = [this.commentformGroup.value];
        this.issueTrackerCreateForm.value.comments.shift()
        this.issueTrackerCreateForm.value.comments.forEach(v => {
			delete v.departmentName
		}) 
       	this.issueTrackerCreateForm.value.comments.forEach(v => {
			v.completionDate = moment(v.completionDate).local().format("YYYY-MM-DD")
			v.actualCompletionDate = moment(v.actualCompletionDate).local().format("YYYY-MM-DD")
			if(v.assignedTo !== ""){
				this.userService.getSingleUser(v.assignedTo).pipe().subscribe(res => {
	       			if(res){
	       				debugger;
						v.assignedName = res.name.first + " "+ res.name.last;
	       			}
				}, (error: any) => {
					console.error('error', error);
					this.loading = false;
				});
			}
		}) 
		this.issueTrackerService.createIssueTracker(this.issueTrackerCreateForm.value)
		.pipe(delay(10000)).subscribe(response => {
			debugger;
			console.log(response, 'response.message')
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

