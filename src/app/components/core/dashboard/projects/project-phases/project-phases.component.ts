import { Component, OnInit, Inject, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import * as _ from 'lodash';

@Component({
  selector: 'app-project-phases',
  templateUrl: './project-phases.component.html',
  styleUrls: ['./project-phases.component.scss']
})
export class ProjectPhasesComponent implements OnInit {

  @Output() phasesFormData = new EventEmitter<string>();
  constructor(
    public dialogRef: MatDialogRef<ProjectPhasesComponent>
  ) {
   
  }

  ngOnInit() {
 
  }
}
