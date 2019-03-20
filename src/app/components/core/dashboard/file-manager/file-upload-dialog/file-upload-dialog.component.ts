import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { FileManagerService } from '../file-manager.service'

@Component({
  selector: 'app-file-upload-dialog',
  templateUrl: './file-upload-dialog.component.html',
  styleUrls: ['./file-upload-dialog.component.scss']
})
export class FileUploadDialogComponent implements OnInit {
 
 	allStatus = [ 'For Approval','Approved' ]
 	dailogForm: FormGroup;
  	constructor(public dialogRef: MatDialogRef<FileUploadDialogComponent>,
	    @Inject(MAT_DIALOG_DATA) public data: any,
	    private formBuilder: FormBuilder, private fileManagerService: FileManagerService) { }

  	ngOnInit() {
	    this.dailogForm = this.formBuilder.group({
	      approval: ['', Validators.required],
	      remarks: ['', Validators.required],
	    });

	    console.log(this.data, 'data-FileUploadDialogComponent')
  	}

  	onCloseCancel() {
    	this.dialogRef.close('cancel');
 	}
  	onSave() {
    	console.log(this.dailogForm.value, 'onSave-FileUploadDialogComponent')
  	 	this.dialogRef.close(this.dailogForm.value);
  	}
}
