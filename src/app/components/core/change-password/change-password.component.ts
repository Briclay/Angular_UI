
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from './../../../services/authentication/authentication.service';
import { Router } from '@angular/router';
import { MatDialog,  MatSnackBar ,MAT_DIALOG_DATA } from '@angular/material';
import { AuthService } from './../../../services/auth.service';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';

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

	constructor(
	    private formBuilder: FormBuilder,
	    private router: Router,
	    private authenticationService: AuthenticationService,
	    private snackBar: MatSnackBar, 
       	private dialog : MatDialog,
       	private auth: AuthService) 
		{
			this.changePasswordFormErrors = {
				email: {},
				password: {},
				newPassword : {}
			}
		}

	ngOnInit() {
		this.changePasswordForm = this.formBuilder.group({
			email: ['', Validators.required],
			password: ['', Validators.required],
			newPassword: ['', Validators.required]
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

	/*onchangePasswordFormSubmit() {
		this.onchangePasswordFormValuesChanged()
		this.isLoading = true;
		if (this.changePasswordForm.valid) {
			this.authenticationService.changePassword(this.changePasswordForm.value)
			.pipe().subscribe(response =>  {
                this.auth.set(response);
				console.log(response, "changePasswordResponse")
				this.changePasswordForm.reset();
				this.changePasswordForm['_touched'] = false;
				const path = '/dashboard';
				this.router.navigateByUrl(path);
			}, (error: any) => {
				this.snackBar.open("Invalid password", 'Change password', {
			      duration: 2000,
			    });
				console.log(error , 'err')
			});
		}
  	}*/
}
