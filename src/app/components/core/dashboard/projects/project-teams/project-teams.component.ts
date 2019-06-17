  import { Component, OnInit } from '@angular/core';
  import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
  import { MatDialogRef } from '@angular/material';
  import { DepartmentService } from '../../department/department.service';
  import { UserService } from '../../user/user.service';
  import { RoleService } from '../../role/role.service'
  import * as _ from 'lodash';

  @Component({
    selector: 'app-project-teams',
    templateUrl: './project-teams.component.html',
    styleUrls: ['./project-teams.component.scss']
  })
  export class ProjectTeamsComponent implements OnInit {
    deptList: any;
    userList: any;
    form: FormGroup;
    formErrors: any;
    teamFormErrors: any;
    userAuth: any;
    teamForm: FormGroup;
    userArray = [];
    tempOrg: string;
    selectedUser: any;
    userFromArray = [];
    constructor(
      public dialogRef: MatDialogRef<ProjectTeamsComponent>,
      private formBuilder: FormBuilder,
      private departmentService: DepartmentService,
      private userService: UserService,
      private roleService: RoleService,
    ) {
      this.teamFormErrors = {
        _teamMembers: {}
      };
      this.teamForm = this.formBuilder.group({
        _teamMembers: ['', Validators.required]
      });
      var org=JSON.parse(window.localStorage.authUserOrganisation);
      this.tempOrg = org._id;
      this.getAllDepartment();
    }

    ngOnInit() {

    }
    onFormValuesChanged() {
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
    /*method to get all department*/
    getAllDepartment() {
      this.departmentService.getAllDept(this.tempOrg)
        .pipe().subscribe(res => {
          console.log('department res' + JSON.stringify(res));
          this.deptList = res;
        }, (error: any) => {
          console.error('error', error);
        })
    }
    getAllRole() {

    }
    /*method to get all user*/
    getAllUsers(deptId: string) {
      this.userService.getUser(this.tempOrg + '&filter[_departmentId]=' + deptId)
        .pipe().subscribe(res => {
          //console.log('user nres', res);
          this.userList = res;
        }, (error: any) => {
          console.error('error', error);
        })
    }
    onSelectDept(event: any) {
      console.log('evnet.vaue' + JSON.stringify(event.value));
      this.getAllUsers(event.value._id);
    }
    onSelectUser(event: any) {
      console.log('evnet.vaue' + JSON.stringify(event.value));
      this.selectedUser = event.value;
    }
    addUser() {
      if (this.selectedUser) {
        var obj = {
          _userId: this.selectedUser._id,
          _roleId: this.selectedUser._roleId
        }
        this.userArray.push(this.selectedUser);
        this.userFromArray.push(obj);
      }
    }
    deleteUser(index) {
      this.userArray.splice(index, 1);
      this.userFromArray.splice(index, 1);
    }
    onSubmit() {
      this.teamForm.value._teamMembers = this.userFromArray;
      this.dialogRef.close(this.teamForm.value);
    }
  }
