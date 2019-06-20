	import { Component, OnInit } from '@angular/core';
	import { FormBuilder, FormGroup, Validators } from '@angular/forms';
	import { AuthenticationService } from './../../../services/authentication/authentication.service';
	import { Router } from '@angular/router';
	import { MatDialog,  MatSnackBar ,MAT_DIALOG_DATA } from '@angular/material';
	import { AuthService } from './../../../services/auth.service';
	import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';
	import { NewComponent } from './new/new.component';
	import { HttpClient } from '@angular/common/http';

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
		popUpFlag = 1;
		ipAddress : any;
		temp="password";

		constructor(
			private formBuilder: FormBuilder,
			private router: Router,
			private authenticationService: AuthenticationService,
			private snackBar: MatSnackBar, 
			private dialog : MatDialog,
			private auth: AuthService,
			private http: HttpClient ) 
			{
				this.http.get<{ip:string}>('https://jsonip.com').subscribe( data => {
				console.log('th data', data);
				this.ipAddress = data.ip
				})
				console.log( this.ipAddress , 'my device ip address')
				this.loginFormErrors = {
					email: {},
					password: {},
					ipAddress: {}
				}
			}

		ngOnInit() {
			this.loginForm = this.formBuilder.group({
				email: ['', Validators.required],
				password: ['', Validators.required],
				ipAddress: ['']
			});
			this.loginForm.valueChanges.subscribe(() => {
				this.onLoginFormValuesChanged();
			});
		}
	//dialog of forgot password
		openForgotPwdPopup() {
			const dialogRef = this.dialog.open(ForgotPasswordComponent, {
			width: '700px',
			height:'540px',
			});
			dialogRef.afterClosed().subscribe(result => {
			// TODO closed event
			});
		}
		//method to show password
		 toggle() { 
                   if (this.temp === "password") { 
               this.temp = "text"; 
            } 
            else { 
                this.temp = "password"; 
            } 
        }


	//dialog of new user 
		openNewPopup() {
			if (this.popUpFlag == 1) {
			const dialogRef = this.dialog.open(NewComponent, {
			width: '500px',
			height : 'auto'
			});
			dialogRef.afterClosed().subscribe(result => {
			// TODO closed event
			});
		}
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
			this.loginForm.value.ipAddress = this.ipAddress
			if (this.loginForm.valid) {
				this.isLoading = true;
				this.authenticationService.login(this.loginForm.value)
				.pipe().subscribe(response =>  {
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
