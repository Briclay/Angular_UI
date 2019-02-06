import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
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
	usrType : any;
	newFlagSet : boolean;

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
			userType : {},
			newUser : {},
			email: {},
			password: {},
			confirmPassword : {}
		}
		this.route.params.subscribe(params => {
			this.userId = params['id'];   
		}); 
	}

	getUserbyId(){
		this.usersService.getSingleUser(this.userId)
		.pipe().subscribe(response =>  {
			//this.userData = response;
			if(response){
				this.emailId = response.email;
				this.usrType = response.userType;
				this.newFlagSet = response.newUser;
			}
		});
	}
	ngOnInit() {
		this.getUserbyId();
		this.changePasswordForm = this.formBuilder.group({
			userType : [this.usrType],
			newUser : [this.newFlagSet],
			email: [this.emailId],
			password: ['', Validators.required],
			confirmPassword: ['', [Validators.required, confirmPassword]]
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

	onchangeFormSubmit() {
		//if (this.changePasswordForm.valid) {
			this.changePasswordForm.value.userType = this.usrType;	
			this.changePasswordForm.value.newUser = false;
			this.changePasswordForm.value.email = this.emailId;
			delete this.changePasswordForm.value.confirmPassword;
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
		//}
	}
}

function confirmPassword(control: AbstractControl) {
	if (!control.parent || !control) {
		return;
	}
	const password = control.parent.get('password');
	const confirmPassword = control.parent.get('confirmPassword');
	if (!password || !confirmPassword) {
		return;
	}
	if (confirmPassword.value === '') {
		return;
	}
	if (password.value !== confirmPassword.value) {
		return {
			passwordsNotMatch: true
		};
	}
}
