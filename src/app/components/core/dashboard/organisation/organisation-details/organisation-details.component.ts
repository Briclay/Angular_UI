import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';
import { OrganizationService } from '../../../../../services/organization/organization.service';
import { AuthenticationService } from '../../../../../services/authentication/authentication.service';
import { DepartmentService } from '../../../../../services/department/department.service';
import { FeaturePopupComponent } from '../../../../../components/shared/feature-popup/feature-popup.component'
import { MatDialog, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';

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
  allFeatures = [
  {
    "_featureId": "f1",
    "resources": "Projects",
    "flag" : true,
    "permissions": [
      {
        "userKey": "List",
        "reqKey": "GET",
        "accessFlag": true
      },
      {
        "userKey": "Save",
        "reqKey": "POST",
        "accessFlag": false
      },
      {
        "userKey": "Update",
        "reqKey": "PUT",
        "accessFlag": true
      },
      {
        "userKey": "Delete",
        "reqKey": "DELETE",
        "accessFlag": false
      }
    ]
  },
  {
    "_featureId": "f2",
    "resources": "Snagmaster",
    "flag" : true,
    "permissions": [
      {
        "userKey": "List",
        "reqKey": "GET",
        "accessFlag": true
      },
      {
        "userKey": "Save",
        "reqKey": "POST",
        "accessFlag": false
      },
      {
        "userKey": "Update",
        "reqKey": "PUT",
        "accessFlag": true
      },
      {
        "userKey": "Delete",
        "reqKey": "DELETE",
        "accessFlag": false
      }
    ]
  },
  {
    "_featureId": "f3",
    "resources": "Services",
    "flag" : false,
    "permissions": [
    {
      "userKey": "List",
      "reqKey": "GET",
      "accessFlag": true
    },
    {
      "userKey": "Save",
      "reqKey": "POST",
      "accessFlag": false
    },
    {
      "userKey": "Update",
      "reqKey": "PUT",
      "accessFlag": true
    },
    {
      "userKey": "Delete",
      "reqKey": "DELETE",
      "accessFlag": false
    }
    ]
  }
  ]
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
  _features = [];
  sF: any;
  filePath = 'assets/images/avatars/camera_blue.png';
  featureData : any;

  selectedAll = false;

  constructor(private formBuilder: FormBuilder,    
    private organizationService: OrganizationService,
    private router :Router,
    private route: ActivatedRoute,
    private dialog : MatDialog,
    private snackBar : MatSnackBar
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
      /*      _parentOrganisationId: this.formBuilder.array([]),*/
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
  }

  ngOnInit() {
    this.assignValuesToForm();
  }

  assignValuesToForm() {
    if(this.formType !== 'create') {
      this.organizationDetailsForm.patchValue(this.data)
    }
  }

  openDialogFeature() {
    this.featureData = this.allFeatures;
    const dialogRef = this.dialog.open(FeaturePopupComponent, {
      width: '450px',
      data: this.allFeatures ? this.allFeatures : {}
    });
    dialogRef.afterClosed().subscribe(result => {
      // TODO closed event
    });
  }

  onPhotoUpload(event) {
    /*let reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      reader.readAsDataURL(file);
      let fileExt = file.name.split(".");
      let fileName = (new Date().getTime()) + "." + fileExt[fileExt.length - 1];
      this.organizationService.getS3Url('file-name=' + fileName + '&file-type=' + file.type +
        '&_organisationId=' + this.userAuth.organisation._id)
      .then((response: any) => {
        this.http.put(response.signedRequest, file, {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        }).subscribe((awsRes: any) => {
          this.filePath = 'https://s3.ap-south-1.amazonaws.com/' + this.userAuth.organisation._id + '/' + fileName;
          this.organizationDetailsForm.controls['logoImageUrl'].setValue(this.filePath);
        }, (error: any) => {
          this.snackBar.open(error.message);

        });
      }, (error: any) => {
          this.snackBar.open(error.message);
      });
    }*/
  }

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

  preventDefault ($event) {
    $event.preventDefault();
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
  
}
  



