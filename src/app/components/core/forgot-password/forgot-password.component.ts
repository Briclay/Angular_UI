import { Component, OnInit } from '@angular/core';
import { MatDialog ,MatDialogRef,MAT_DIALOG_DATA,MatSnackBar } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from './../../../services/authentication/authentication.service';
import { AuthService } from './../../../services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  	forgotPwdform: FormGroup;
	forgotPwdformErrors: any;
    userToken : any;
  	constructor(private formBuilder: FormBuilder,
	    private router: Router,
       	private dialogRef : MatDialogRef<ForgotPasswordComponent>,
	    private auth: AuthService,
	    private authenticationService: AuthenticationService,
	    private snackBar :MatSnackBar ) 
		{
			this.forgotPwdformErrors = {
				email: {}
			}
		}

  	ngOnInit() {
		this.forgotPwdform = this.formBuilder.group({
			email: ['', Validators.required]

		});
		this.forgotPwdform.valueChanges.subscribe(() => {
			this.onforgotPwdformValuesChanged();
		});
	}

	closeForgotPwdPopup() {
	    this.dialogRef.close(this.forgotPwdform);
  	}

	onforgotPwdformValuesChanged() {
		for (const field in this.forgotPwdformErrors) {
		if (!this.forgotPwdformErrors.hasOwnProperty(field)) {
			continue;
		}
	    // Clear previous errors
	    this.forgotPwdformErrors[field] = {};
	    // Get the control
	    const control = this.forgotPwdform.get(field);
	    if (control && control.dirty && !control.valid) {
	    	this.forgotPwdformErrors[field] = control.errors;
	    }
	  }
	}

	onforgotPwdformSubmit() {
		this.onforgotPwdformValuesChanged()
		let emailRegx = '[^@]+@[^\.]+\..+'
		if (this.forgotPwdform.valid && this.forgotPwdform.value.email.match(emailRegx)) {
			let emailId = this.forgotPwdform.value.email;
			this.authenticationService.forgotPwd(emailId, this.forgotPwdform.value)
			.pipe().subscribe(response =>  {
				let snackBar =  this.snackBar.open(response.message, 'Forgot', {
			      	duration: 2000,
			    });
                //this.auth.set(response);
				console.log(response, "forgotPwdform")
				this.forgotPwdform.reset();
				this.forgotPwdform['_touched'] = false;
				this.dialogRef.close(snackBar);
			}, (error: any) => {
					this.snackBar.open(error.message, 'Forgot', {
				      duration: 2000,
				    });
				console.log(error , 'err')
			});
		}
		else {
			this.snackBar.open('Invalid email address', 'Forgot', {
		      duration: 2000,
		    });
		}
  	}

}
