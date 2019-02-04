import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from './../../../services/authentication/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog,  MatSnackBar ,MAT_DIALOG_DATA } from '@angular/material';
import { AuthService } from './../../../services/auth.service';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';
import { UserService } from '../dashboard/user/user.service';

@Component({
	selector: 'app-change-password',
	templateUrl: './change-password.component.html',
	styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
	changePasswordForm: FormGroup;
	changePasswordFormErrors: any;
	changePasswordFormSubmitted = false;
	isLoading: boolean;
	userId : any;
	userData : any;
	emailId :any;
	constructor(
		private route: ActivatedRoute,
		private formBuilder: FormBuilder,
		private router: Router,
		private authenticationService: AuthenticationService,
		private snackBar: MatSnackBar, 
		private dialog : MatDialog,
		private auth: AuthService,
		private usersService : UserService) 
	{
		this.changePasswordFormErrors = {
			email: {},
			newPassword: {},
			comfirmPassword : {}
		}

		this.route.params.subscribe(params => {
			this.userId = params['id'];   
		}); 
	}

	getUserbyId(){
		this.usersService.getSingleUser(this.userId)
		.pipe().subscribe(response =>  {
			this.emailId = response.email;
		});
	}
	ngOnInit() {
		this.getUserbyId();
		this.changePasswordForm = this.formBuilder.group({
			email: [this.emailId, Validators.required],
			newPassword: ['', Validators.required],
			comfirmPassword: ['', Validators.required]
		});
		this.changePasswordForm.valueChanges.subscribe(() => {
			this.onchangePasswordFormValuesChanged();
		});
	}

	onchangePasswordFormValuesChanged() {
		for (const field in this.changePasswordFormErrors) {
			if (!this.changePasswordFormErrors.hasOwnProperty(field)) {
				continue;
			}
	    // Clear previous errors
	    this.changePasswordFormErrors[field] = {};
	    // Get the control
	    const control = this.changePasswordForm.get(field);
	    if (control && control.dirty && !control.valid) {
	    	this.changePasswordFormErrors[field] = control.errors;
	    }
	  }
	}

	/*onchangeFormSubmit() {
    if (this.changePasswordForm.valid) {
      this.authenticationService.changePassword(this.userId ,  this.changePasswordForm.value)
		.pipe().subscribe(response =>  {
          console.log(response)
          this.changePasswordForm.reset();
          this.changePasswordForm['_touched'] = false;
          // redirect login
         this.router.navigateByUrl('/auth/login');
        }, (error: any) => {
          console.log(error, "error")
        });
    }
  }*/
}
