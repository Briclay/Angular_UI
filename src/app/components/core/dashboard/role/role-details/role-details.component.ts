import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-role-details',
  templateUrl: './role-details.component.html',
  styleUrls: ['./role-details.component.scss']
})
export class RoleDetailsComponent implements OnInit {
  @Input() data: any;
  @Input() formType: string;

  roleDetailsForm: FormGroup;
  _roleId = ['Manager', 'Admin', 'User', 'Super Admin'];
  departments = ['Finance', 'Construction'];
  shifts = ['Regular' , 'Day' , 'Night']

  constructor() {
  }

  ngOnInit() {
    this.roleDetailsForm = this.createFormGroup();
    this.assignValuesToForm();
  }

  createFormGroup() {
    return new FormGroup({
      roleNane: new FormControl('', [Validators.required]),
      details: new FormGroup({
        department: new FormControl('', [Validators.required]),
        shift: new FormControl('', [Validators.required]),
        subrole: new FormControl('', [Validators.required]),
      }),
      features: new FormControl('', [Validators.required]),
      approvals: new FormControl('', [Validators.required])
    });
  }

  assignValuesToForm() {
    if(this.formType !== 'create') {
      this.roleDetailsForm.patchValue(this.data)
    }
  }

  onSubmit() {
    // Do useful stuff with the gathered data
    console.log(this.roleDetailsForm.value);
  }

}
