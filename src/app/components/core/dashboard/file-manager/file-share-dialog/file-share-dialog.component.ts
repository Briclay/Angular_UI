import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MatSnackBar , MAT_DIALOG_DATA } from '@angular/material';
import { UserService } from '../../../dashboard/user/user.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { FileManagerService } from '../file-manager.service'

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
  org: any;
  constructor(private userService: UserService,
    private snackBar : MatSnackBar,
    public dialogRef: MatDialogRef<FileShareDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private fileManagerService: FileManagerService) { }
  ngOnInit() {
    this.org = JSON.parse(window.localStorage.authUserOrganisation);
    this.getUsers();
  }
  onCloseCancel() {
    this.dialogRef.close('cancel');
  }
  userChanged(user) {
    this.selectedUser = user.value;
  }
  /*this method is for get all user*/
  getUsers() {
    this.userLoading = true;
    this.userService.getUser(this.org._id).pipe().subscribe(res => {
      this.users = res;
      this.userLoading = false;
    }, (error: any) => {
      console.error('error', error);
      this.userLoading = false;
    });
  }
  /*share file*/
  shareFile() {
    this.sharedFileError = '';
    const body = {
      activeFlag: true,
      sharedByUserId: this.selectedUser._id
    };
    this.fileManagerService.shareFile(this.data.fileId, body)
      .pipe().subscribe((response: any) => {
        this.dialogRef.close('success');
        this.snackBar.open("File shared successfully", 'Share', {
          duration: 3000,
        });
      }, (error: any) => {
        this.snackBar.open(error.message, 'Share', {
          duration: 3000,
        });
        console.error(error);
        this.sharedFileError = error;
        this.dialogRef.close('error');
      });
  }
}
