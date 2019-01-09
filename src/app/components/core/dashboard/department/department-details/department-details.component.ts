import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-department-details',
  templateUrl: './department-details.component.html',
  styleUrls: ['./department-details.component.scss']
})
export class DepartmentDetailsComponent implements OnInit {
  @Input() data: any;
  @Input() formType: string;

  departmentDetailsForm: FormGroup;
  departments: string[] = ['Finance', 'Construction'];
  constructor() {
  }

  ngOnInit() {
    this.departmentDetailsForm = this.createFormGroup();
    this.assignValuesToForm();
  }

  createFormGroup() {
    return new FormGroup({
  		departmentName: new FormControl('', [Validators.required]),
  		details: new FormGroup({
  			description: new FormControl('', [Validators.required]),
  		}),
  		features: new FormControl('', [Validators.required])
    });
  }

  assignValuesToForm() {
    if(this.formType !== 'create') {
      this.departmentDetailsForm.patchValue(this.data)
    }
  }

  onSubmit() {
    // Do useful stuff with the gathered data
    console.log(this.departmentDetailsForm.value);
  }

}
