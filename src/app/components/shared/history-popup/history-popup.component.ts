import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-history-popup',
  templateUrl: './history-popup.component.html',
  styleUrls: ['./history-popup.component.scss']
})
export class HistoryPopupComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public historyDataOptions: any) {}
  
  ngOnInit() {
    console.log('data', this.historyDataOptions)
  }

}
