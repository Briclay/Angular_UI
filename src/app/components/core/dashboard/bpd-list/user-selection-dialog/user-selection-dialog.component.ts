  import { Component,Inject, OnInit } from '@angular/core';
  import { MatDialog ,MatDialogRef,MAT_DIALOG_DATA,MatSnackBar } from '@angular/material';
  import { FormBuilder, FormGroup, Validators } from '@angular/forms';
  import { Router } from '@angular/router';
  import { UserService} from '../../../dashboard/user/user.service';
  import { DepartmentService} from '../../../../../services/department/department.service';

  @Component({
    selector: 'app-user-selection-dialog',
    templateUrl: './user-selection-dialog.component.html',
    styleUrls: ['./user-selection-dialog.component.scss']
  })
  export class UserSelectionDialogComponent implements OnInit {
    userForm: FormGroup;
    userFormErrors: any;
    departmentLists : any;
    usersList:any;
    selectedDepartmentData : any;
    userDropdownEnable  = false
    orgID : any;
    selectedAssignedUserData : any;

    constructor(@Inject(MAT_DIALOG_DATA) private data: any, 
      private dialogRef : MatDialogRef<UserSelectionDialogComponent>,
      private formBuilder: FormBuilder,
      private router: Router,
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
        });
      this.getAllDepartment()
    }
    selectedUser (event){
      this.selectedAssignedUserData = event;
    }
      //To Get All Department
    getAllDepartment(){
      this.departService.getAll(this.orgID).pipe().subscribe(res => {
        this.departmentLists = res;
      }, (error: any) => {
        console.error('error', error);
      });
    }
    
    //Drop down for Department selection
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
    onCancel() {
      this.dialogRef.close();
    }

    onSubmit(){
      let obj = {};
      if(this.data === 'pointOfContact'){
        obj = {
          "depName" : this.selectedDepartmentData.name,
          "pointOfContact" : {
            "_id" :this.selectedAssignedUserData._id,
            "name" : this.selectedAssignedUserData.username,
            "email" : this.selectedAssignedUserData.email,
          }
        }
      }
      if(this.data === 'processOwner'){
        obj = {
          "depName" : this.selectedDepartmentData.name,
          "processOwner" : {
            "_id" :this.selectedAssignedUserData._id,
            "name" : this.selectedAssignedUserData.username,
            "email" : this.selectedAssignedUserData.email,
          }
        }
      }
      this.data = ""
      this.dialogRef.close(obj);
    }
  }