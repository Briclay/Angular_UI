import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-role-details',
  templateUrl: './role-details.component.html',
  styleUrls: ['./role-details.component.scss']
})
export class RoleDetailsComponent implements OnInit {
 @Input() data: any;

  editAdminFlag: boolean;
  editAddressFlag: boolean;
  editPreminumFlag: boolean;
  getFeatures: boolean;
  
  features = [
    {value: 'steak-0', viewValue: 'File'},
    {value: 'pizza-1', viewValue: 'Service Request'},
    {value: 'tacos-2', viewValue: 'Snag Master'}
  ];

  constructor() { }

  ngOnInit() {
  }

  getFeatureDropdown() {
    this.getFeatures = true;
  }
}
