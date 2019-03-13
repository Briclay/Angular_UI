import { Component, OnInit,Inject } from '@angular/core';
import { MatDialog ,MatDialogRef,MAT_DIALOG_DATA,MatSnackBar } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-work-category-dialog',
  templateUrl: './work-category-dialog.component.html',
  styleUrls: ['./work-category-dialog.component.scss']
})
export class WorkCategoryDialogComponent implements OnInit {

	allWorkCategory : any;
	constructor(public dialogRef: MatDialogRef<WorkCategoryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    	let org = JSON.parse(window.localStorage.getItem('authUserOrganisation'));
	}

  	ngOnInit() {
  		if(this.data && this.data.length > 0){
  			this.allWorkCategory = this.data
  		}
  		console.log(this.data, 'work-category-dialog')
	}

	closeUserPopup() {
	    this.dialogRef.close();
  	}

	onuserFormSubmit() {
		this.dialogRef.close();
  	}

}
