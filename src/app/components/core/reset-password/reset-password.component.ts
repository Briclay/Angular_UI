import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from './../../../services/authentication/authentication.service';
import { Router,ActivatedRoute } from '@angular/router';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component'
import { AuthService } from './../../../services/auth.service';
import { MatDialog,  MatSnackBar ,MAT_DIALOG_DATA } from '@angular/material';
import {merge as observableMerge, Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  	resetPwdform: FormGroup;
	resetPwdformErrors: any;
    userToken : any;
  	private unsubscribe: Subject<any> = new Subject();
  	constructor(private formBuilder: FormBuilder,
	    private router: Router,
    	private route: ActivatedRoute,
	    private auth: AuthService,
	    private dialog : MatDialog,
	    private authenticationService: AuthenticationService,
	    private snackBar :MatSnackBar ) 
		{
			this.resetPwdformErrors = {
				password: {},
				confirmPassword : {},
				token :{}
			}
		}

  	ngOnInit() {
  		observableMerge(this.route.params, this.route.queryParams).pipe(
      	takeUntil(this.unsubscribe))
      	.subscribe((params) => this.loadRoute(params));
	}

	loadRoute(params: any) {
		if('token' in params) {
			this.userToken = params['token'];
			console.log(this.userToken, "this.userToken")
				this.resetPwdform = this.formBuilder.group({
				password: ['', Validators.required],
				confirmPassword : ['', Validators.required],
				token : [''],
			});
			this.resetPwdform.valueChanges.subscribe(() => {
				this.onresetPwdformValuesChanged();
			});
		}

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

	cancel(){
		const path = '/login';
		this.router.navigateByUrl(path);
	}

	onresetPwdformSubmit() {
		if (this.resetPwdform.valid) {

			let regx = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{6,})/;

			if(regx.test(this.resetPwdform.value.password)){
				delete this.resetPwdform.value.confirmPassword;
				this.resetPwdform.value.token = this.userToken;
				this.authenticationService.resetPwd(this.resetPwdform.value, this.userToken)
				.pipe().subscribe(response =>  {
	                this.snackBar.open(response.message, 'Reset password', {
				      duration: 2000,
				    });
					console.log(response, "resetPwdformResponse")
					this.resetPwdform.reset();
					this.resetPwdform['_touched'] = false;
					const path = '/login';
					this.router.navigateByUrl(path);
				}, (error: any) => {
					this.snackBar.open(error.message, 'Reset password', {
				      duration: 2000,
				    });
					console.log(error , 'err')
				});
			}
			else{
				this.snackBar.open('Password should have minimum 6 characters, at least one uppercase letter, one lowercase letter, one number and one special character', 'Reset password', {
			      duration: 2000,
			    });
			}
			
		}
  	}

}
