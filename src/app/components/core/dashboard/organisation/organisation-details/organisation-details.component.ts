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
  getApprovals = ['File' ,'Service Request' ,'Snag Master']
  plans = [ 'Premium' , 'Trial']
  constructor() {
  }

  ngOnInit() {
    this.organizationDetailsForm = this.createFormGroup();
    this.assignValuesToForm();
  }

  createFormGroup() {
    return new FormGroup({
      orgName: new FormControl('', [Validators.required]),
      orgAddress: new FormControl('', [Validators.required]),
      subsciption: new FormGroup({
        plan: new FormControl('', [Validators.required]),
      }),
      details: new FormGroup({
        email: new FormControl('', [Validators.required]),
        Address: new FormControl('', [Validators.required]),
      }),
      entities: new FormGroup({
        count: new FormControl('', [Validators.required]),
        validtill: new FormControl('', [Validators.required]),
      })
    });
  }

  assignValuesToForm() {
    if(this.formType !== 'create') {
      this.organizationDetailsForm.patchValue(this.data)
    }
  }

  onSubmit() {
    // Do useful stuff with the gathered data
    console.log(this.organizationDetailsForm.value);
  }

}


/*import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-organisation',
  templateUrl: './organisation.component.html',
  styleUrls: ['./organisation.component.scss']
})
export class OrganisationComponent implements OnInit {

    editAdminFlag = false;
    editAddressFlag = false;
    editPreminumFlag  = false;
    getFeatures = false;
    value: string;
    viewValue: string;
  organizationDataOptions: any;
    features = [
      {value: 'steak-0', viewValue: 'File'},
      {value: 'pizza-1', viewValue: 'Service Request'},
      {value: 'tacos-2', viewValue: 'Snag Master'}
  ];

  orgData = [
      { "id" : "1",
        "orgName": "Purvankara Limited",
        "orgAddress": "Ulsoor bangalore",
        "subsciption" : {
          "plan" : "Premium"
        },
        "details" : {
          "email" : "xyz@mail.com",
          "Address" : "Ulsoor bangalore"
        },
        "entities":{
          "count" : "1",
          "validtill" : "15/06/2018"
        }
      },
      { "id" : "2",
        "orgName": "Purvankara Limited",
        "orgAddress": "JP nagar bangalore",
         "subsciption" : {
          "plan" : "Premium1"
        },
        "details" : {
          "email" : "xyz2@mail.com",
          "Address" : "JP nagar bangalore"
        },
        "entities":{
          "count" : "2",
          "validtill" : "10/10/2018"
        }
      },
      {
        "id" : "3",
        "orgName": "Purvankara Limited",
        "orgAddress": "ITPL bangalore",
         "subsciption" : {
          "plan" : "Premium2"
        },
        "details" : {
          "email" : "xyz3@mail.com",
          "Address" : "ITPL bangalore"
        },
        "entities":{
          "count" : "3",
          "validtill" : "25/11/2018"
        }
      }
    ]
    constructor() { }

    ngOnInit() {
      this.organizationDataOptions = [
        {
          title: 'User Name', type: 'list', list: [
            { title: 'UserName', key: 'orgName', hideTitle: true, type: 'label' },
            { title: 'Address', key: 'orgAddress', hideTitle: true, type: 'label' }
          ]
        }, {
      title: 'Plan', key: 'subsciption.plan',
    }, {
      title: 'Valid till', key: 'entities.validtill'
    }, {
      title: 'Entities', key: 'entities.count'
    }]
    }

    editAdmin(){
      this.editAdminFlag = true;
    }
    editAddress(){
      this.editAddressFlag = true;
    }
    editPreminum(){
      this.editPreminumFlag = true;
    }
    getFeatureDropdown(){
      this.getFeatures = true;
    }
   
}
*/