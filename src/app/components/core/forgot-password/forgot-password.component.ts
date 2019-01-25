import { Component, OnInit } from '@angular/core';
import { MatDialog ,MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  	forgotPwdform: FormGroup;
	forgotPwdformErrors: any;

  	constructor(private formBuilder: FormBuilder,
	    private router: Router,) 
		{
			this.forgotPwdformErrors = {
				usernameOrEmail: {},
				password: {},
				newPassword: {}
			}
		}

  	ngOnInit() {
		this.forgotPwdform = this.formBuilder.group({
			usernameOrEmail: ['', Validators.required],
			password: ['', Validators.required],
			newPassword: ['', Validators.required]
		});
		/*this.forgotPwdform.valueChanges.subscribe(() => {
			this.onforgotPwdformValuesChanged();
		});*/
	}

	onFormSubmit (){
      
	}

}
