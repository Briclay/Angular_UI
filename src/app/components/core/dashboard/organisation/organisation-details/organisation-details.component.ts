import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-organisation-details',
  templateUrl: './organisation-details.component.html',
  styleUrls: ['./organisation-details.component.scss']
})
export class OrganisationDetailsComponent implements OnInit {
  @Input() data: any;
  @Input() formType: string;

  organizationDetailsForm: FormGroup;

  editAdminFlag: boolean;
  editAddressFlag: boolean;
  editPreminumFlag: boolean;
  getFeatures: boolean;

  features: any[] = [
	    {value: 'steak-0', viewValue: 'File'},
	    {value: 'pizza-1', viewValue: 'Service Request'},
	    {value: 'tacos-2', viewValue: 'Snag Master'}
	  ];
  constructor() { }

  ngOnInit() {
  }

  createFormGroup() {
    return new FormGroup({
      name: new FormGroup({
        first: new FormControl('', [Validators.required]),
        last: new FormControl('', [Validators.required])
      }),
      address: new FormGroup({
        city: new FormControl('', [Validators.required]),
        area: new FormControl('', [Validators.required]),
      }),
      email: new FormControl('', [Validators.required]),
      username: new FormControl('', [Validators.required]),
      userType: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required])
    });
    
  }

  assignValuesToForm() {
    if(this.formType !== 'create') {
      this.organizationDetailsForm.patchValue(this.data)
    }
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
