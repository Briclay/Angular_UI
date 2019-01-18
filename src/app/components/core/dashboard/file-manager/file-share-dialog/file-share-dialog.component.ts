import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import {UserService} from '../../../../../services/user/user.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-file-share-dialog',
  templateUrl: './file-share-dialog.component.html',
  styleUrls: ['./file-share-dialog.component.scss']
})
export class FileShareDialogComponent implements OnInit {
  users: any;
  constructor(private userService: UserService,
    public dialogRef: MatDialogRef<FileShareDialogComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any, 
    private formBuilder: FormBuilder) { }
  ngOnInit() {
  }

  onCloseCancel() {
    this.dialogRef.close('cancel');
  }
  
  getUsers() {
    this.userService.getUser().pipe().subscribe(res => {
      this.users = res;
    });
  }
  

}
