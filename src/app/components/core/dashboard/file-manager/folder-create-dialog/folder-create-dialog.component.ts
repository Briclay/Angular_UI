import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import {FileManagerService} from '../file-manager.service'

@Component({
  selector: 'app-folder-create-dialog',
  templateUrl: './folder-create-dialog.component.html',
  styleUrls: ['./folder-create-dialog.component.scss']
})
export class FolderCreateDialogComponent implements OnInit {
  dailogForm: FormGroup;
  constructor(public dialogRef: MatDialogRef<FolderCreateDialogComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any, 
    private formBuilder: FormBuilder, private fileManagerService: FileManagerService) { }

  ngOnInit() {
    this.dailogForm = this.formBuilder.group({
      _organisationId: ['', Validators.required],
      name: ['', Validators.required],
      _departmentId: ['', Validators.required],
      _parentId: this.data._parentId,
      shared: [],
      details: "This folder is created by SUPERADMIN",
      accessFlag: "Private"
    });
  }

  onCloseCancel() {
    this.dialogRef.close('cancel');
  }
  onSave() {
    this.dailogForm.value._organisationId = '5a5844cd734d1d61613f7066';
    this.dailogForm.value._departmentId = '5a5844cd734d1d61613f7066';
    this.fileManagerService.saveFolder(this.dailogForm.value)
      .pipe().subscribe((response: any) => {
        this.dialogRef.close('success');
      }, (error: any) => {
        console.error(error)
      });
  }

}
