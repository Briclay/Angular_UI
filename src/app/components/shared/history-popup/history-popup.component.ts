import { Component, OnInit } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material';


export interface DialogData {
  animal: 'panda' | 'unicorn' | 'lion';
}

@Component({
  selector: 'app-history-popup',
  templateUrl: './history-popup.component.html',
  styleUrls: ['./history-popup.component.scss']
})
export class HistoryPopupComponent implements OnInit {

  constructor(public dialog: MatDialog) {}
  openDialog() {
    this.dialog.open(DialogDataExampleDialog, {
      data: {
        animal: 'panda'
      }
    });
  }
  ngOnInit() {
  }

}
