import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
  userDetailsForm: FormGroup;
  _roleId = ['Manager', 'Admin', 'User', 'Super Admin'];

  departments = ['Finance', 'Construction'];
  constructor() { }

  ngOnInit() {
    this.userDetailsForm = this.createFormGroup();
  }

  createFormGroup() {
    return new FormGroup({
      name: new FormGroup({
        first: new FormControl('', [Validators.required]),
        last: new FormControl('', [Validators.required])
      }),
      address: new FormGroup({
        city: new FormControl('', [Validators.required]),
        flat: new FormControl('', [Validators.required])
      }),
      _departments: new FormControl('', [Validators.required]),
      _roleId: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      username: new FormControl('', [Validators.required]),
      userType: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required])
    });
  }

}
