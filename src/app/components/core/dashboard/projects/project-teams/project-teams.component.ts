import { User } from './../../../../../interfaces/interfaces';
import { Component, OnInit, Input, Inject, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import * as _ from 'lodash';

@Component({
  selector: 'app-project-teams',
  templateUrl: './project-teams.component.html',
  styleUrls: ['./project-teams.component.scss']
})
export class ProjectTeamsComponent implements OnInit {
  foods = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'}
  ];
  form: FormGroup;
  formErrors: any;
  teamFormErrors: any;
  userAuth: any;
  teamForm: FormGroup;
  userArray = [];
  constructor(
    public dialogRef: MatDialogRef<ProjectTeamsComponent>,
    private formBuilder: FormBuilder
    ) {
      this.teamFormErrors = {
        _teamMembers: {}
      };
      this.teamForm = this.formBuilder.group({
        _teamMembers : ['', Validators.required]
      });
  }

  ngOnInit() {
    
  }

}
