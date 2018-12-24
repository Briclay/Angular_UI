import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-organisation-details',
  templateUrl: './organisation-details.component.html',
  styleUrls: ['./organisation-details.component.scss']
})
export class OrganisationDetailsComponent implements OnInit {
  @Input() data: any;

  editAdminFlag: boolean;
  editAddressFlag: boolean;
  editPreminumFlag: boolean;
  getFeatures: boolean;

  features: Featues[] = [
	    {value: 'steak-0', viewValue: 'File'},
	    {value: 'pizza-1', viewValue: 'Service Request'},
	    {value: 'tacos-2', viewValue: 'Snag Master'}
	  ];
  constructor() { }

  ngOnInit() {
  }

  editAdmin() {
    this.editAdminFlag = true;
  }
  editAddress() {
    this.editAddressFlag = true;
  }
  editPreminum(data) {
    console.log('data', data)
    this.editPreminumFlag = true;
  }
  getFeatureDropdown() {
    this.getFeatures = true;
  }

}
