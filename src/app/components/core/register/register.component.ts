	import { Component, OnInit } from '@angular/core';
	import { FormBuilder, FormGroup, Validators } from '@angular/forms';
	import { AuthenticationService } from './../../../services/authentication/authentication.service';
	import { Router } from '@angular/router';
	import { MatDialog,  MatSnackBar ,MAT_DIALOG_DATA } from '@angular/material';

	@Component({
		selector: 'app-register',
		templateUrl: './register.component.html',
		styleUrls: ['./register.component.scss']
	})
	export class RegisterComponent implements OnInit {
		registerForm: FormGroup;
		registerFormErrors: any;
		registerFormSubmitted = false;
		isLoading: boolean;
		_organisationId = "5c4ab4f1e7179a090e09c750";
		_departmentId = "5c4ab587e7179a090e09c792";
		_roleId = "5c4ab639e7179a090e09c7cb";

		constructor(
			private formBuilder: FormBuilder,
			private router: Router,
			private authenticationService: AuthenticationService,
			private snackBar: MatSnackBar, 
			private dialog : MatDialog) { 
			this.registerFormErrors = {
				name : {
					first : {},
					last : {}
				},
				email: {},
				username : {},
				phone : {},
				password : {}
			}
		}

		ngOnInit() {
			this.registerForm = this.formBuilder.group({
			name : this.formBuilder.group({
				first: ['', Validators.required],
				last : ['', Validators.required],
			}),
			email: ['', Validators.required],
			username : ['', Validators.required],
			phone: ['', Validators.required],
			password :  ['', Validators.required]
		});  
		}

		openLoginForm (){
			const path = '/login'
			this.router.navigate([path]);
		}

		onRegisterFormSubmit() {
			this.isLoading = true;
			this.authenticationService.register(this.registerForm.value)
			.pipe().subscribe(response => {
			this.isLoading = false;
			this.snackBar.open("Signed up successfully", 'Register', {
				duration: 2000,
			});
			this.registerForm['_touched'] = false;
			const path = '/login'
			this.router.navigate([path]);
			}, (error: any) => {
		this.isLoading = false;
		this.snackBar.open(error.message, 'Register', {
			duration: 2000,
		});
		console.log(error , "error")
		});
	}
	}
