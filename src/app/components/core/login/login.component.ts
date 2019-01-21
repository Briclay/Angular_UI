import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from './../../../services/authentication/authentication.service';
import { Router } from '@angular/router';

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
	    private authenticationService: AuthenticationService) 
		{
			this.loginFormErrors = {
				usernameOrEmail: {},
				password: {}
			}
		}

	ngOnInit() {
		this.loginForm = this.formBuilder.group({
			usernameOrEmail: ['', Validators.required],
			password: ['', Validators.required]
		});
		this.loginForm.valueChanges.subscribe(() => {
			this.onLoginFormValuesChanged();
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


	onLoginFormSubmit() {
		this.onLoginFormValuesChanged()
		this.isLoading = true;
		if (this.loginForm.valid) {
			this.authenticationService.login(this.loginForm.value)
			.pipe().subscribe(response =>  {
				this.isLoading = false;
                //this.auth.set(response);
            	window.localStorage.setItem('userAuth', JSON.stringify(response.data));
            	window.localStorage.setItem('userAuthToken', JSON.stringify(response.token));
				console.log(response, "loginResponse")
				this.loginForm.reset();
				this.loginForm['_touched'] = false;
				const path = '/dashboard';
				this.router.navigateByUrl(path);
			}, (error: any) => {
				this.isLoading = false;
				alert(error.error.message)
				console.log(error , 'err')
			});
		}
  }
}
