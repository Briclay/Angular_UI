import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import {UserService} from '../../../../../services/user/user.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import {FileManagerService} from '../file-manager.service'

@Component({
  selector: 'app-file-share-dialog',
  templateUrl: './file-share-dialog.component.html',
  styleUrls: ['./file-share-dialog.component.scss']
})
export class FileShareDialogComponent implements OnInit {
  users: any;
  selectedUser: any;
  userLoading: boolean;
  sharedFileError: any;
  constructor(private userService: UserService,
    public dialogRef: MatDialogRef<FileShareDialogComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any, 
    private formBuilder: FormBuilder,
     private fileManagerService: FileManagerService) { }
  ngOnInit() {
    this.getUsers();
    console.log('this.data', this.data);
  }

  onCloseCancel() {
    this.dialogRef.close('cancel');
  }

  userChanged(user) {
    console.log('user', user);
    this.selectedUser =  user.value;
  }

  getUsers() {
    this.userLoading = true;
    this.userService.getUser().pipe().subscribe(res => {
      this.users = res;
      this.userLoading = false;
    }, (error: any) => {
        console.error('error', error);
        this.userLoading = false;
      })
  }

  shareFile() {
    this.sharedFileError = '';
    this.fileManagerService.shareFile(this.selectedUser._id, this.data._parentId)
      .pipe().subscribe((response: any) => {
        this.dialogRef.close('success');
      }, (error: any) => {
        console.error(error)
        this.sharedFileError = error;
      });
  }
  

}
