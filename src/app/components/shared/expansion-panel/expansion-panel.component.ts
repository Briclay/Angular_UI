import { Component, OnInit, Input, Output,OnChanges ,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-expansion-panel',
  templateUrl: './expansion-panel.component.html',
  styleUrls: ['./expansion-panel.component.scss']
})
export class ExpansionPanelComponent implements OnInit,OnChanges {
  @Input() expansionPanelOptions: any;
  @Input() isDisabled: boolean;
  @Input() data: any; 
  @Input() selectorComponent: any;
  @Input() isHistory: boolean;
  @Input() isFeature: boolean;
  @Output() public openHistort: EventEmitter<any> = new EventEmitter<any>();
  @Output() public openFeature: EventEmitter<any> = new EventEmitter<any>();
  @Output() public updateRefresh: EventEmitter<any> = new EventEmitter<any>();
  @Input() pageSize : number;
  @Input() pageIndex : number;

  pageItemsData : any;
  constructor() { }

  ngOnInit() {
  }

  ngOnChanges() {
    if (!this.data) {
      return;
    }
    this.pageItemsData = this.data.slice(this.pageIndex * this.pageSize, this.pageIndex * this.pageSize + this.pageSize);
  }

  parseKey(listData, key) {
    return key.split('.').reduce((o,i)=>o[i], listData);
  }

  historyClick(listData) {
    this.openHistort.emit(listData);
  }

  updateRefreshData(){
    this.updateRefresh.emit()
  }

  feature(listData) {
    this.openFeature.emit(listData);
  }

}
