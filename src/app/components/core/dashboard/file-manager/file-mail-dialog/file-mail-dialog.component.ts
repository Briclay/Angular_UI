import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import {UserService} from '../../../../../services/user/user.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import {FileManagerService} from '../file-manager.service'

@Component({
  selector: 'app-file-mail-dialog',
  templateUrl: './file-mail-dialog.component.html',
  styleUrls: ['./file-mail-dialog.component.scss']
})
export class FileMailDialogComponent implements OnInit {

  users: any;
  selectedUser: any;
  userLoading: boolean;
  sharedFileError: any;
  constructor(private userService: UserService,
    public dialogRef: MatDialogRef<FileMailDialogComponent>, 
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

  shareMail() {
    this.sharedFileError = '';
    this.fileManagerService.shareMail(this.selectedUser.email, this.data._parentId)
      .pipe().subscribe((response: any) => {
        this.dialogRef.close('success');
      }, (error: any) => {
        console.error(error)
        this.sharedFileError = error;
      });
  }

}
