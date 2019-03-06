import { Component, OnInit } from '@angular/core';
import { MatDialog ,MatDialogRef,MAT_DIALOG_DATA,MatSnackBar } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService} from '../../../../dashboard/user/user.service';
import { DepartmentService} from '../../../../../../services/department/department.service';

@Component({
  selector: 'app-user-select-dialog',
  templateUrl: './user-select-dialog.component.html',
  styleUrls: ['./user-select-dialog.component.scss']
})
export class UserSelectDialogComponent implements OnInit {
  	userForm: FormGroup;
	userFormErrors: any;
	depratmentLists : any;
	usersList : any;
	selectedDepartmentData : any;
	userDropdownEnable  = false
	orgID : any;
	selectedAssignedUserData : any;
  	constructor(private formBuilder: FormBuilder,
	    private router: Router,
       	private dialogRef : MatDialogRef<UserSelectDialogComponent>,
	    private userService: UserService,
	    private departService: DepartmentService,
	    private snackBar :MatSnackBar ) 
		{
			this.userFormErrors = {
				departmentName: {},
				assignedName : {}
			}
			let org = JSON.parse(window.localStorage.getItem('authUserOrganisation'));
			this.orgID = org._id
		}

  	ngOnInit() {
		this.userForm = this.formBuilder.group({
			departmentName: ['', Validators.required],
			assignedName : ['', Validators.required]
		});
		this.userForm.valueChanges.subscribe(() => {
			this.onuserFormValuesChanged();
		});
		this.getAllDepartment()
	}

	closeUserPopup() {
	    this.dialogRef.close();
  	}

  	selectedUser (event){
		this.selectedAssignedUserData = event;
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
				this.usersList = res;
			}, (error: any) => {
				console.error('error', error);
			});
		}
	}

	onuserFormValuesChanged() {
		for (const field in this.userFormErrors) {
		if (!this.userFormErrors.hasOwnProperty(field)) {
			continue;
		}
	    // Clear previous errors
	    this.userFormErrors[field] = {};
	    // Get the control
	    const control = this.userForm.get(field);
	    if (control && control.dirty && !control.valid) {
	    	this.userFormErrors[field] = control.errors;
	    }
	  }
	}

	onuserFormSubmit() {
		this.onuserFormValuesChanged()
		this.dialogRef.close(this.selectedAssignedUserData);
  	}

}
