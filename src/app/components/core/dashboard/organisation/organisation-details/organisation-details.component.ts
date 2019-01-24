import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';
import { OrganizationService } from '../../../../../services/organization/organization.service';
import { AuthenticationService } from '../../../../../services/authentication/authentication.service';
import { DepartmentService } from '../../../../../services/department/department.service';

@Component({
  selector: 'app-organisation-details',
  templateUrl: './organisation-details.component.html',
  styleUrls: ['./organisation-details.component.scss']
})
export class OrganisationDetailsComponent implements OnInit {
  @Input() data: any;
  @Input() formType: string;
  
  organisationsList: any;
  userAuth: any;
  temp = [];
  organizationDetailsForm: FormGroup;
  getApprovals = ['File' ,'Service Request' ,'Snag Master']
  plans = [ 'Premium' , 'Trial']
  allFeatures = ['File' ,'Folder Manager' ,'Service Request','Snag Master']

  orgType = ['ADMINISTRATOR', 'BUILDER', 'CONTRACTOR'];
  parantselect = ['Parent Organisation', 'Child Organisation'];
  parorg: boolean = false;
  IsShow: boolean = false;
  features = [];
  organisationCount: number;
  featuresArray = [];
  selectedFeatureArray = [];
  selectedFeatureValue = [];
  indexOfFeature;
  formErrors: any;
  orgFormErrors: any;
  orgFormSubmitted = false;

  organisationCode;
  sortName;
  arrName;
  parentOrganisations = [];
  toggleBool: boolean;
  orgId: any;
  editFlag: boolean = false;
  orgValue: any;
  filePath = 'assets/images/camera_blue.png';
  _features = [];
  sF: any;

  selectedAll = false;

  constructor(private formBuilder: FormBuilder,    
    private organizationService: OrganizationService,
    private router :Router,
    private route: ActivatedRoute
    ) {
    this.organisationsList = this.organizationService.organisations;
    //this.userAuth = this.auth.get();
    this.userAuth = JSON.parse(window.localStorage.getItem("userAuth"));
    
    // this.onGetFeature();
    //this.getparentOrganisations();
    this.orgFormErrors = {
      name: {},
      orgCode: {},
      orgType: {},
      parantselect: {},
      email: {},
      phone: {},
      plant: {},
      address: {
        flat: {},
        area: {},
        city: {},
        state: {},
        pincode: {}
      },
      subscription: {
        plan: {},
        validTill : {},
        registrationDate: {},
      },
      users: {
        email: {},
        username: {}
      },
      logoImageUrl: {},
      description: {},
      featuresArray: {},
      selectedAll: {},
    };

    this.organizationDetailsForm = this.formBuilder.group({
      _id : ['', Validators.required],
      name: ['', Validators.required],
      orgCode: ['', Validators.required],
      orgType: ['', Validators.required],
      logoImageUrl: this.formBuilder.array([]),
/*      _parentOrganisationId: this.formBuilder.array([]),
*//*    _childOrganisationsId : [''],*/
      _childOrganisationsId: this.formBuilder.array([]),
      _features: this.formBuilder.array([]),
      sharedFeature : this.formBuilder.array([]),
      subscription: this.formBuilder.group({
        plan: ['', Validators.required],
        validTill : ['', Validators.required],
        registrationDate: ['', Validators.required],
      }),
      phone: ['', [Validators.required, Validators.minLength(10)]],
      description: ['', Validators.required],
      plant: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      users: this.formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['Welcome@1234'],
        username: ['', Validators.required]
      }),
      address: this.formBuilder.group({
        flat: ['', Validators.required],
        street: ['', Validators.required],
        area: ['', Validators.required],
        city: ['', Validators.required],
        state: ['', Validators.required],
        pincode: ['', [Validators.required, Validators.minLength(6)]]
      }),
    });
    /*this.organizationDetailsForm.valueChanges.subscribe(() => {
      this.onOrgFormValuesChanged();
    });*/

  }

  ngOnInit() {
    this.assignValuesToForm();
  }
/*
  createFormGroup() {
    return new FormGroup({
      _id : new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      orgCode: new FormControl('', [Validators.required]),
      orgType: new FormControl('', [Validators.required]),
      plant: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      subscription: new FormGroup({
        plan: new FormControl('', [Validators.required]),
        validTill : new FormControl('', [Validators.required]),
        registrationDate: new FormControl('', [Validators.required]),
      }),
       logoImageUrl: this.formBuilder.array([]),
      _parentOrganisationId: [''],
      _childOrganisationsId : this.formBuilder.array([]),
      /*_childOrganisationsId: this.formBuilder.array([]),
      _features: new FormControl('', [Validators.required]),
      sharedFeature : this.formBuilder.array([]),
      address: new FormGroup({
        flat: new FormControl(['', Validators.required]),
        street: new FormControl(['', Validators.required]),
        area: new FormControl(['', Validators.required]),
        city: new FormControl(['', Validators.required]),
        state: new FormControl(['', Validators.required]),
        pincode: new FormControl(['',Validators.required, Validators.minLength(6)])
      })
    });
  }*/

  assignValuesToForm() {
    if(this.formType !== 'create') {
      this.organizationDetailsForm.patchValue(this.data)
    }
  }
  

  /*updateFilter(event) {
    const val = event.target.value.toLowerCase();
    // filter our data
    const temp = this.temp.filter(function (d) {
      return d.name.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // update the rows
    this.organisationsList = temp;
    // Whenever the filter changes, always go back to the first page
  }*/

  changeEvent(event) {
    this.sF = event.source.value;
  }

  /*dyanmic add roles*/

  addOrg() {
    if (this.sF) {
      var name = this.sF.name;
      this.selectedFeatureValue.push(this.sF);
      this._features.push(this.sF._id);
      const index = this.features.indexOf(this.sF);
      if (index > -1) {
        this.features.splice(index, 1);
      }
      this.sF = '';
    } else {
      console.log('Please select one feature');
    }
  }

  generateOrgCode() {
    let name = this.organizationDetailsForm.value.name;
    if (name) {
      this.arrName = name.split(' ');
      this.sortName = '';
      this.arrName.forEach((value: any) => {
        this.sortName += value.slice(0, 1);
      })
      let str = this.sortName.toUpperCase() + '-' + this.organisationCount;
      this.organizationDetailsForm.controls['orgCode'].setValue(str);
    }
  }


  onOrgFormSubmit() {
    this.organizationDetailsForm.value._features = this._features;
    if (this.organizationDetailsForm.value._id == (undefined || "")) {
        this.orgFormSubmitted = true;
        this.saveApiCall(this.organizationDetailsForm.value);
    } else {
      this.orgFormSubmitted = true;
      this.updateApi(this.organizationDetailsForm.value._id, this.organizationDetailsForm.value);
    }
  }

  saveApiCall(formData) {
    delete formData._id;
    formData.orgType = "BUILDER";
    const newData = {
      users: {
        email: formData.email,
        username: formData.email,                                                                                       
        password: "Welcome@1234"
      }
    }
    formData.users = newData.users;
    this.organizationService.organisations(formData)
      .pipe().subscribe(response => {
      this.orgFormSubmitted = false;
     console.log(response, 'response.message')
      this.organizationDetailsForm['_touched'] = false;
      const path = '/dashboard/organisation'
      this.router.navigate([path]);
    }, (error: any) => {
      this.orgFormSubmitted = false;
      console.log(error , "error")
    });
  }

  updateApi(id, formData) {
    this.organizationService.update(id, formData)
      .pipe().subscribe(response => {
      this.orgFormSubmitted = false;
     console.log(response.message,'response.message')
      this.organizationDetailsForm['_touched'] = false;
      const path = '/dashboard/organisation'
      this.router.navigate([path]);
    }, (error: any) => {
      this.orgFormSubmitted = false;
      console.log(error.message)
    });
  }
  

/*  ediMapping(response) {
    this._features = [];
    this.organizationDetailsForm.patchValue(response.data);
    this.filePath = response.data.logoImageUrl;
    this.selectedFeatureValue = response.data._features;
    for (let i = 0; i < response.data._features.length; i++) {
      this._features.push(response.data._features[i]._id);
      var index = this.features.findIndex(function(value) {
        return value._id == response.data._features[i]._id;
      });
      if (index > -1) {
        this.features.splice(index, 1);
      }
    }
  }
*/
/*  onOrgFormValuesChanged() {
    for (const field in this.formErrors) {
      if (!this.formErrors.hasOwnProperty(field)) {
        continue;
      }
      // Clear previous errors
      this.formErrors[field] = {};
      // Get the control
      const control = this.form.get(field);
      if (control && control.dirty && !control.valid) {
        this.formErrors[field] = control.errors;
      }
    }
  }*/

 /* deleteFeature(id) {
    //alert(this.sF.name);
    this.features.push(this.selectedFeatureValue[id]);
    this.selectedFeatureValue.splice(id, 1);
    this._features.splice(id, 1);
  }*/

 /* getparentOrganisations() {
    this.organizationService.getAll(this.orgID)
      .pipe().subscribe(response => {
      this.parentOrganisations = response;
        this.parentOrganisations.push({
          name: "Parent Organisation",
          _id: ''
        })
        this.organisationCount = response.length;
      });
  }
*/
 /* onGetFeature() {
    this.organizationService.getFeature()
      .pipe().subscribe(response => {
      this.features = response;
    }, (error: any) => {
        // console.log(error , "error")
      });
  }*/


}
