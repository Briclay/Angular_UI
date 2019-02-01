import { Component, OnInit, Inject, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ProjectService } from '../project.service';
import * as _ from 'lodash';
import { merge as observableMerge, Subject } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss']
})
export class ProjectDetailsComponent implements OnInit {
  form: FormGroup;
  formErrors: any;
  detailsFormErrors: any;
  userAuth: any;
  detailsForm: FormGroup;
  uniteArray = [];
  parkingArray =[]
  projectType = ['RESIDENTIAL', 'COMMERCIAL', 'MIXED DEVELOPMENT', 'VILLA PROJECTS'];
  constructor(
    public dialogRef: MatDialogRef<ProjectDetailsComponent>,
    private formBuilder: FormBuilder
  ) {
    this.detailsFormErrors = {
      type: {},
      landArea: {},
      units:{},
      carParkingArea:{},
      dummyCarParkingArea:{},
      dummyUnits:{}
    };

    this.detailsForm = this.formBuilder.group({
      type: ['', Validators.required],
      landArea: ['', Validators.required],
      units: [''],
      carParkingArea: [''],
      dummyCarParkingArea: this.formBuilder.group({
        area: ['', Validators.required],
        count: ['', Validators.required]
      }),
      dummyUnits: this.formBuilder.group({
        bhk: ['', Validators.required],
        count: ['', Validators.required],
        area: ['', Validators.required]
      })
    });

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
  ngOnInit() {
  }
  onSubmit(){
    console.log('this.detailsForm',this.detailsForm.value);
    this.detailsForm.value.carParkingArea =this.parkingArray;
    this.detailsForm.value.units = this.uniteArray;
    console.log(' finaly send to this.detailsForm',this.detailsForm.value);
    this.dialogRef.close(this.detailsForm.value);
  }
  addUnits(){
    this.uniteArray.push(this.detailsForm.value.dummyUnits);
  }
  deleteUnit(index){
    this.uniteArray.splice(index, 1);
  }
  addParking(){
    this.parkingArray.push(this.detailsForm.value.dummyCarParkingArea);
  }
  deleteParking(index){
    this.parkingArray.splice(index, 1);
  }
}
