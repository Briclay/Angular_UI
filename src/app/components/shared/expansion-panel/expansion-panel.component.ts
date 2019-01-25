import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-expansion-panel',
  templateUrl: './expansion-panel.component.html',
  styleUrls: ['./expansion-panel.component.scss']
})
export class ExpansionPanelComponent implements OnInit {
  @Input() expansionPanelOptions: any;
  @Input() data: any; 
  @Input() selectorComponent: any;
  @Input() isHistory: boolean;
  @Input() isFeature: boolean;
  @Output() public openHistort: EventEmitter<any> = new EventEmitter<any>();
  @Output() public openFeature: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }
  parseKey(listData, key) {
    return key.split('.').reduce((o,i)=>o[i], listData);
  }

  historyClick(listData) {
    this.openHistort.emit(listData);
  }

  feature(listData) {
    this.openFeature.emit(listData);
  }

}
