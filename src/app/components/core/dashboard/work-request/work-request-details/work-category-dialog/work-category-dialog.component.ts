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
	sopDetails = [];
		constructor(public dialogRef: MatDialogRef<WorkCategoryDialogComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any) {
			let org = JSON.parse(window.localStorage.getItem('authUserOrganisation'));
		}

		ngOnInit() {
			if(this.data && this.data.length > 0){
				this.allWorkCategory = this.data
			}
		}

		closeUserPopup() {
		this.dialogRef.close();
		}

	viewSop(event){
		this.sopDetails = []
		this.data.forEach(v => {
		if(v.name === event){
			if(v.steps.length > 0){
				this.sopDetails = v.steps;
			}
			else {
				this.sopDetails.push('no data')
			}
		}
		})
	}
		onuserFormSubmit() {
			this.dialogRef.close();
		}

	}
