import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DepartmentService } from '../../../.././services/department/department.service';
import {RoleService} from '../../../.././components/core/dashboard/role/role.service';
import { MatDialog ,MatDialogRef,MAT_DIALOG_DATA,MatSnackBar } from '@angular/material';
import {merge as observableMerge, Subject} from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import {takeUntil} from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
	selector: 'app-new',
	templateUrl: './new.component.html',
	styleUrls: ['./new.component.scss']
})
export class NewComponent implements OnInit {
	@Input() data: any;
	@Input() formType: string;
	@Output() public tabSwitch: EventEmitter<any> = new EventEmitter<any>();
	@Output() public updateRefresh: EventEmitter<any> = new EventEmitter<any>();
	orgID: string;
	newForm: FormGroup;
	forgotPwdformErrors: any;
	userToken : any;

	departments : any;
	usersList:any;
	selectedDepartmentData : any;
	private unsubscribe: Subject<any> = new Subject();
	
	_roleId = ['Manager', 'Admin', 'User', 'Super Admin'];
	_departmentId: any;
	roles: any;
	isLoading: boolean;

	constructor(private formBuilder: FormBuilder,
		private router: Router,
		private route: ActivatedRoute,
		private snackBar: MatSnackBar,
		private roleService: RoleService,
		private departmentService: DepartmentService,
		private dialogRef : MatDialogRef<NewComponent>,
		private http: HttpClient) { 
		let org = JSON.parse(window.localStorage.getItem('authUserOrganisation'));
		this.orgID = org._id}

		ngOnInit() {
			this.newForm = this.formBuilder.group({
				_departmentId: ['', Validators.required],
				_roleId : ['', Validators.required]
			});
			this.getDepartments()
			this.getRoles()		
		}

		loadRoute(params: any) {
			if('orgID' in params) {
				this.orgID = params['orgID'];
				this.getDepartments();
				this.getRoles();
                //this.userDetailsForm = this.createFormGroup();
                this.assignValuesToForm();
            }
        }
        /*method to get department*/
        getDepartments() {
        	this.departmentService.getAll(this.orgID).pipe().subscribe(res => {
        		this.departments = res;
        		console.log(res,'dsddddddddddd')
        	}, (error: any) => {
        		console.error('error', error);
        	});
        }
         /*method to get Role*/
        getRoles() {
        	this.roleService.getData(this.orgID).pipe().subscribe(res => {
        		this.roles = res;
        		console.log(res,"dsfsdfsdfsf")
        	}, (error: any) => {
        		console.error('error', error);
        	});
        }
        //assigning values of form to data
        assignValuesToForm() {
        	if(this.formType !== 'create') {
        		this.newForm.patchValue(this.data)
        	}
        }

        onCancel() {
        	this.dialogRef.close();
        }

        onSubmit(){
        	console.log('submit')
        }

    }
