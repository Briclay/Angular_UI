import { Component, OnInit, Input, Inject, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MAT_SELECT_SCROLL_STRATEGY, MatSelect } from '@angular/material';
import * as _ from 'lodash';

@Component({
  selector: 'app-project-teams',
  templateUrl: './project-teams.component.html',
  styleUrls: ['./project-teams.component.scss']
})
export class ProjectTeamsComponent implements OnInit {

  form: FormGroup;
  formErrors: any;
  projectTeamForm: FormGroup;
  contractorsForm: FormGroup;
  combineBothData: FormGroup;
  projectTeamError: any;
  userList: any;
  usercontractList: any;
  userAuth: any;
  userListBackup: any;
  userListContractBackup: any;
  porjectTeamArray: any;
  contractorArray: any;
  @Output() projectTeamFormData = new EventEmitter < string > ();
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, 
    private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.porjectTeamArray = [];
    this.contractorArray = [];
    this.projectTeamForm = this.formBuilder.group({
      users: [''],
      email: [''],
      role: ['']
    });
    this.contractorsForm = this.formBuilder.group({
      users: [''],
      email: [''],
      role: ['']
    });
    this.combineBothData = this.formBuilder.group({
      _teamMembers: [''],
      _contractors: ['']
    });

  }

  projectUserSelected() {
    this.projectTeamForm.controls['email'].setValue(this.projectTeamForm.value.users.email);
    this.projectTeamForm.controls['role'].setValue(this.projectTeamForm.value.users._roleId.name);
  }
  addPorjectMember() {
    this.porjectTeamArray.push({
      name: this.projectTeamForm.value.users.username,
      email: this.projectTeamForm.value.users.email,
      role: this.projectTeamForm.value.users._roleId.name,
      _userId: this.projectTeamForm.value.users._id,
      _roleId: this.projectTeamForm.value.users._roleId._id
    });
    var name = this.projectTeamForm.value.users.username;
    var indexof = _.findIndex(this.userList, function(num) {
      return num.username == name;
    });
    if (indexof > -1) {
      this.userList.splice(indexof, 1);
    }
    this.projectTeamForm.reset();
    this.onNextClick();
  }
  deleteProjctTeamMember(index) {
    if (index > -1) {
      var name = this.porjectTeamArray[index].name;
      var indexof = _.findIndex(this.userListBackup, function(num) {
        return num.username == name;
      });
      if (indexof > -1) {
        this.userList.push(this.userListBackup[indexof]);
      }
      this.porjectTeamArray.splice(index, 1);
      this.onNextClick();
    }
  }
  contractUserSelected() {
    this.contractorsForm.controls['email'].setValue(this.contractorsForm.value.users.email);
    this.contractorsForm.controls['role'].setValue(this.contractorsForm.value.users._roleId.name);
  }
  addContractMember() {
    this.contractorArray.push({
      name: this.contractorsForm.value.users.username,
      email: this.contractorsForm.value.users.email,
      role: this.contractorsForm.value.users._roleId.name,
      _userId: this.contractorsForm.value.users._id,
      _roleId: this.contractorsForm.value.users._roleId._id
    });
    var name = this.contractorsForm.value.users.username;
    var indexof = _.findIndex(this.usercontractList, function(num) {
      return num.username == name;
    });
    if (indexof > -1) {
      this.usercontractList.splice(indexof, 1);
    }
    this.contractorsForm.reset();
    this.onNextClick();
  }
  deleteContractTeamMember(index) {
    if (index > -1) {
      var name = this.contractorArray[index].name;
      var indexof = _.findIndex(this.userListContractBackup, function(num) {
        return num.username == name;
      });
      if (indexof > -1) {
        this.usercontractList.push(this.userListContractBackup[indexof]);
      }
      this.contractorArray.splice(index, 1);
      this.onNextClick();
    }
  }
  onNextClick() {
    this.combineBothData.controls['_teamMembers'].setValue(this.porjectTeamArray);
    this.combineBothData.controls['_contractors'].setValue(this.contractorArray);
    this.projectTeamFormData.emit(this.combineBothData.value);
  }
  ngOnChanges(changes) {
    this.projectTeamFormData.emit(this.projectTeamForm.value);
  }

}
