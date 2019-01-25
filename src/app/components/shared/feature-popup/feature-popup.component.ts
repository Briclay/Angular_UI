import { Component, OnInit ,Inject} from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-feature-popup',
  templateUrl: './feature-popup.component.html',
  styleUrls: ['./feature-popup.component.scss']
})
export class FeaturePopupComponent implements OnInit {
  selectFeature : any;
  constructor(@Inject(MAT_DIALOG_DATA) public allFeatures: any) {}
  
  ngOnInit() {
    console.log('data', this.allFeatures)
  }

  changeEvent(event) {
    this.selectFeature = event.source.value;
  }


}
