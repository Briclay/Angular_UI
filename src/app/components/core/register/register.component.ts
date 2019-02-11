import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from './../../../services/authentication/authentication.service';
import { Router } from '@angular/router';
import { MatDialog,  MatSnackBar ,MAT_DIALOG_DATA } from '@angular/material';
import { AuthService } from './../../../services/auth.service';
import { LoginComponent } from '../login/login.component';

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
  constructor(
	    private formBuilder: FormBuilder,
	    private router: Router,
	    private authenticationService: AuthenticationService,
	    private snackBar: MatSnackBar, 
       	private dialog : MatDialog,
       	private auth: AuthService) { 
			this.registerFormErrors = {
				firstName: {},
				lastName: {},
				email: {},
				organisation: {},
			    department: {}
			}
       	}

  ngOnInit() {
		this.registerForm = this.formBuilder.group({
			firstName: ['', Validators.required],
			lastName: ['', Validators.required],
			email: ['', Validators.required],
			organisation: ['', Validators.required],
			department: ['', Validators.required]
		});  
  }

}
