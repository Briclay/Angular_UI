import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from './../../../services/authentication/authentication.service';
import { Router } from '@angular/router';
import { MatDialog,  MatSnackBar ,MAT_DIALOG_DATA } from '@angular/material';
import { AuthService } from './../../../services/auth.service';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
	loginForm: FormGroup;
	loginFormErrors: any;
	loginFormSubmitted = false;
	isLoading: boolean;

	constructor(
	    private formBuilder: FormBuilder,
	    private router: Router,
	    private authenticationService: AuthenticationService,
	    private snackBar: MatSnackBar, 
       	private dialog : MatDialog,
       	private auth: AuthService) 
		{
			this.loginFormErrors = {
				email: {},
				password: {},
			    ipAddress: "203.192.251.76"
			}
		}

	ngOnInit() {
		this.loginForm = this.formBuilder.group({
			email: ['', Validators.required],
			password: ['', Validators.required],
			ipAddress: ['203.192.251.76', Validators.required]
		});
		this.loginForm.valueChanges.subscribe(() => {
			this.onLoginFormValuesChanged();
		});
	}

	openForgotPwdPopup() {
	    const dialogRef = this.dialog.open(ForgotPasswordComponent, {
	      width: '700px',
	      height : 'auto'
	    });
	    dialogRef.afterClosed().subscribe(result => {
	      // TODO closed event
	    });
  	}

	onLoginFormValuesChanged() {
		for (const field in this.loginFormErrors) {
		if (!this.loginFormErrors.hasOwnProperty(field)) {
			continue;
		}
	    // Clear previous errors
	    this.loginFormErrors[field] = {};
	    // Get the control
	    const control = this.loginForm.get(field);
	    if (control && control.dirty && !control.valid) {
	    	this.loginFormErrors[field] = control.errors;
	    }
	  }
	}

	openRegisterForm (){
		const path = '/register'
	    this.router.navigate([path]);
	}

	onLoginFormSubmit() {
		this.onLoginFormValuesChanged()
		if (this.loginForm.valid) {
			this.isLoading = true;
			this.authenticationService.login(this.loginForm.value)
			.pipe().subscribe(response =>  {
				console.log(response, "loginResponse")
				this.isLoading = false;
                this.auth.set(response);
                if(response.userObj.newUser){
                	const path = '/change-password/' + response.userObj._id;
					this.router.navigateByUrl(path);
                }
                else {
                	this.loginForm.reset();
					this.loginForm['_touched'] = false;
					const path = '/dashboard';
					this.router.navigateByUrl(path);
                }
               /* this.loginForm.reset();
					this.loginForm['_touched'] = false;
					const path = '/dashboard';
					this.router.navigateByUrl(path);*/
			}, (error: any) => {
				this.isLoading = false;
				this.snackBar.open("Invalid username or password", 'login', {
			      duration: 2000,
			    });
				console.log(error , 'err')
			});
		}else {
			this.snackBar.open('Invalid email address', 'login', {
		      duration: 2000,
		    });
		}
  	}
}
