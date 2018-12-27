import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
  @Input() data: any;
  @Input() formType: string;

  userDetailsForm: FormGroup;
  userType = ['Manager', 'Admin', 'User', 'Super Admin'];
  _roleId = ['Manager', 'Admin', 'User', 'Super Admin'];
  departments = ['Finance', 'Construction'];
  constructor() {
  }

  ngOnInit() {
    this.userDetailsForm = this.createFormGroup();
    this.assignValuesToForm();
  }

  createFormGroup() {
    return new FormGroup({
      name: new FormGroup({
        first: new FormControl('', [Validators.required]),
        last: new FormControl('', [Validators.required])
      }),
      address: new FormGroup({
        city: new FormControl('', [Validators.required]),
        area: new FormControl('', [Validators.required]),
      }),
      email: new FormControl('', [Validators.required]),
      username: new FormControl('', [Validators.required]),
      userType: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required])
    });
    
  }

  assignValuesToForm() {
    if(this.formType !== 'create') {
      this.userDetailsForm.patchValue(this.data)
    }
  }

  onSubmit() {

    // Do useful stuff with the gathered data
    console.log(this.userDetailsForm.value);
  }

}
