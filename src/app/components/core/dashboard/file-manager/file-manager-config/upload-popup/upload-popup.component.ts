	import { Component, OnInit,Inject, Input, Output } from '@angular/core';
	import { PlatformLocation } from '@angular/common';
	import { ActivatedRoute, Router } from '@angular/router';
	import {HttpClientModule, HttpClient, HttpRequest, HttpResponse, HttpEventType} from '@angular/common/http';
	import { FormBuilder, FormGroup } from '@angular/forms';
	import { MatDialog, MatSnackBar, MatTableDataSource, } from '@angular/material';
	import * as _ from 'lodash';
	import { merge as observableMerge, Subject } from 'rxjs';
	import { takeUntil } from 'rxjs/operators';;
	import {   MatDialogRef} from '@angular/material';
	import { MAT_DIALOG_DATA } from '@angular/material';

	@Component({
		selector: 'app-upload-popup',
		templateUrl: './upload-popup.component.html',
		styleUrls: ['./upload-popup.component.scss']
	})
	export class UploadPopupComponent implements OnInit {
		percentDone  = 0;
		uploadSuccess= false;
		files=[];
		allFiles = [];
		constructor(
			@Inject(MAT_DIALOG_DATA) public data: any,
			public dialogRef: MatDialogRef<UploadPopupComponent>, 
			private dialog: MatDialog,
			private route: ActivatedRoute,
			private router: Router,
			private location: PlatformLocation,
			private http: HttpClient,
			private formBuilder: FormBuilder,
			private snackBar: MatSnackBar
			) { }

		ngOnInit() {
			console.log(this.data[0].name,"dddddddd");
			this.allFiles = this.data.file
			this.uploadAndProgress(this.data)
		}
		//Function of file uploading and uploaded percentage
		uploadAndProgress(files: File[]){
			var formData = new FormData();
			Array.from(files).forEach(f => formData.append('file',f))
			this.http.post('https://file.io', formData, {reportProgress: true, observe: 'events'})
			.subscribe(event => {
				if (event.type === HttpEventType.UploadProgress) {
					this.percentDone = Math.round(100 * event.loaded / event.total);
				} else if (event instanceof HttpResponse) {
					this.uploadSuccess = true;
				}
			});
		}
		close(){
			this.dialogRef.close('close');
		}
		save(){
			this.dialogRef.close('save');
			this.snackBar.open("Upload Successfully", 'File Upload', {
			duration: 2000,
		});
		}
	}
