import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-project-dates',
  templateUrl: './project-dates.component.html',
  styleUrls: ['./project-dates.component.scss']
})
export class ProjectDatesComponent implements OnInit {
  form: FormGroup;
  formErrors: any;
  dateFormErrors: any;
  userAuth: any;
  dateForm: FormGroup;
  todayDate = new Date();
  beginDate: Date;
  beginDateFlag = true;
  constructor(
    public dialogRef: MatDialogRef<ProjectDatesComponent>,
    private formBuilder: FormBuilder
  ) {
    this.dateFormErrors = {
      beginDate: {},
      completionDate: {},

    };


    this.dateForm = this.formBuilder.group({
      beginDate: ['', Validators.required],
      completionDate: ['', Validators.required],
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
  onSubmit() {
    console.log('this.dateForm', this.dateForm.value);
  }
  beginDateSelected() {
    console.log('beginDateSelected', this.dateForm.value.beginDate);
    this.beginDateFlag = false;
    this.beginDate = this.dateForm.value.beginDate
  }

}
