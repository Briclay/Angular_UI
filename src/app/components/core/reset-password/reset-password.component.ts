import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from './../../../services/authentication/authentication.service';
import { Router } from '@angular/router';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component'
import { AuthService } from './../../../services/auth.service';
import { MatDialog,  MatSnackBar ,MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  	resetPwdform: FormGroup;
	resetPwdformErrors: any;
    userToken : any;
  	constructor(private formBuilder: FormBuilder,
	    private router: Router,
	    private auth: AuthService,
	    private authenticationService: AuthenticationService,
	    private snackBar :MatSnackBar ) 
		{
			this.resetPwdformErrors = {
				password: {},
				confirmPassword : {}
			}
			this.userToken = JSON.parse(window.localStorage.getItem('authToken'));
		}

  	ngOnInit() {
		this.resetPwdform = this.formBuilder.group({
			password: ['', Validators.required],
			confirmPassword : ['', Validators.required]

		});
		this.resetPwdform.valueChanges.subscribe(() => {
			this.onresetPwdformValuesChanged();
		});
	}
    
  	onresetPwdformValuesChanged() {
		for (const field in this.resetPwdformErrors) {
		if (!this.resetPwdformErrors.hasOwnProperty(field)) {
			continue;
		}
	    // Clear previous errors
	    this.resetPwdformErrors[field] = {};
	    // Get the control
	    const control = this.resetPwdform.get(field);
	    if (control && control.dirty && !control.valid) {
	    	this.resetPwdformErrors[field] = control.errors;
	    }
	  }
	}

	onresetPwdformSubmit() {
		this.onresetPwdformValuesChanged()
		if (this.resetPwdform.valid) {
			this.authenticationService.resetPwd(this.resetPwdform.value, this.userToken)
			.pipe().subscribe(response =>  {
                //this.auth.set(response);
				console.log(response, "resetPwdformResponse")
				this.resetPwdform.reset();
				this.resetPwdform['_touched'] = false;
				//const path = '/dashboard';
				//this.router.navigateByUrl(path);
			}, (error: any) => {
				this.snackBar.open("Invalid username or password", 'Reset Password', {
			      duration: 2000,
			    });
				console.log(error , 'err')
			});
		}
  	}

}
