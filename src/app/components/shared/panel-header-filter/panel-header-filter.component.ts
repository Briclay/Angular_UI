import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-panel-header-filter',
  templateUrl: './panel-header-filter.component.html',
  styleUrls: ['./panel-header-filter.component.scss']
})
export class PanelHeaderFilterComponent implements OnInit {
  organizations: any[] = [
    { value: 'organizations-1', viewValue: 'Organizations-1' },
    { value: 'organizations-2', viewValue: 'Organizations-2' },
    { value: 'organizations-3', viewValue: 'Organizations-3' }
  ];
  constructor() { }

  ngOnInit() {
  }

}
