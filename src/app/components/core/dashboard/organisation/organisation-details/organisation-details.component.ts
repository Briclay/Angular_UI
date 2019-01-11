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
  allFeatures = ['File' ,'Folder Manager' ,'Service Request','Snag Master']
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
        subOrgName: new FormControl('', [Validators.required]),
        subOrgcount: new FormControl('', [Validators.required]),
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