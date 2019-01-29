import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';
import { OrganizationService } from '../../../../../services/organization/organization.service';
import { AuthenticationService } from '../../../../../services/authentication/authentication.service';
import { DepartmentService } from '../../../../../services/department/department.service';
import { FeaturePopupComponent } from '../../../../../components/shared/feature-popup/feature-popup.component'
import { MatDialog, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { AuthService } from '../../../../../services/auth.service';
declare var moment: any;
import {FileManagerService} from "../../file-manager/file-manager.service";
import {FeatureService} from "../../../../../services/features/features.service";
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-organisation-details',
  templateUrl: './organisation-details.component.html',
  styleUrls: ['./organisation-details.component.scss']
})
export class OrganisationDetailsComponent implements OnInit {
  @Input() data: any;
  @Input() formType: string;
  @Output() public tabSwitch: EventEmitter<any> = new EventEmitter<any>();
  
  organisationsList: any;
  userAuth: any;
  temp = [];
  organizationDetailsForm: FormGroup;
  featuresList: any;
  getApprovals = ['File' ,'Service Request' ,'Snag Master']
  plans = [ 'Basic', 'Standard', 'Premium', 'Enterprise']
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
    private snackBar : MatSnackBar,
    private auth: AuthService,
    private fileManagerService: FileManagerService,
    private featureService: FeatureService,
    private http: HttpClient
    ) {
    this.organisationsList = this.organizationService.organisations;
    this.userAuth = JSON.parse(window.localStorage.getItem('authUser'));
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
      adminUser: {
        email: {},
        username: {}
      },
      logoImageUrl: {},
      logoImage: {},
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
      logoImage: [''],
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
      adminUser: this.formBuilder.group({
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
    this.getFeatures();
    this.getOrgData();
  }

  assignValuesToForm() {
    if(this.formType !== 'create') {
      this.organizationDetailsForm.patchValue(this.data)
    }
  }
  

  openDialogFeature() {
    this.featureData = this.featuresList;
    this.featuresList.forEach((list) => list.hidePermissions = true)
    const dialogRef = this.dialog.open(FeaturePopupComponent, {
      width: '550px',
      data: this.featuresList ? this.featuresList : {}
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        let features = result.map((list) => { 
          if(list.activeFlag) {
            return list._id;
          }
       });
        this._features = features;
      }
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

  getOrgData() {
    this.organizationService.getAll()
    .pipe().subscribe(response => {
      this.organisationCount = response.length;
    }, (error: any) => {
      this.snackBar.open(error.message, 'Organization', {
        duration: 3000,
      });
    });
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
    this.organizationDetailsForm.value.subscription.validTill = moment(this.organizationDetailsForm.value.subscription.validTill).local().format("YYYY-MM-DD HH:mm:ss") 
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
      adminUser: {
        email: formData.email,
        username: formData.email,                                                                                       
        password: "Welcome@1234"
      }
    }
    formData.adminUser = newData.adminUser;
    this.organizationService.organisations(formData)
    .pipe().subscribe(response => {
      this.orgFormSubmitted = false;
      console.log(response, 'response.message')
      this.snackBar.open("Organisation created successfully", 'Organisation', {
        duration: 2000,
      });
      this.organizationDetailsForm['_touched'] = false;
      const path = '/dashboard/organisation'
      this.router.navigate([path]);
    }, (error: any) => {
      this.orgFormSubmitted = false;
      this.snackBar.open(error.message, 'Organisation', {
        duration: 2000,
      });
      console.log(error , "error")
    });
  }

  updateApi(id, formData) {
    this.organizationService.update(id, formData)
    .pipe().subscribe(response => {
      this.orgFormSubmitted = false;
      console.log(response.message,'response.message')
      this.snackBar.open("Organisation updated successfully", 'Organisation', {
        duration: 2000,
      });
      this.organizationDetailsForm['_touched'] = false;
      const path = '/dashboard/organisation'
      this.router.navigate([path]);
      this.tabSwitch.emit(0);
      this.organizationDetailsForm.reset()
    }, (error: any) => {
      this.orgFormSubmitted = false;
      this.snackBar.open(error.message, 'Organisation', {
        duration: 2000,
      });
      console.log(error.message)
    });
  }

  onFileInput(event, fileList?) {
    let reader = new FileReader()
    if (event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      reader.readAsDataURL(file);
      let fileExt = file.name.split(".");
      let fileName = (new Date().getTime()) + "." + fileExt[fileExt.length - 1];

      this.fileManagerService.getS3Url(`file-name=${fileName}&file-type=${file.type}&_organisationId=organization-logo`)
        .pipe().subscribe(res => {
          let json = {
            savedFileName: fileName,
            name: file.name,
            type: 'file',
            fileExt: fileExt[fileExt.length - 1],
            path: res.url,
            size: file.size,
            message: "File uploaded by ",
            details: "file original name is " + file.name
          };
          console.log('res', res)
        }, (error: any) => {
        });
    } else {
      console.log('false');
    }
  }

  saveOnS3(response: any, file, body: any) {
    this.http.put(response.signedRequest, file, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    }).subscribe((awsRes: any) => {
      let filePath = `https://s3.ap-south-1.amazonaws.com/organization-logo/${body.savedFileName}`;
      this.organizationDetailsForm.controls['logoImage'].setValue(filePath)
    }, (error: any) => {
      console.log('error' + JSON.stringify(error));
    });
  }

  getFeatures() {
    this.featureService.getFeatures()
    .pipe().subscribe(response => {
      this.featuresList = response;
      let features = response.map((list) => { 
          if(list.activeFlag) {
            return list._id;
          }
       });
      this._features = features;
    }, (error: any) => {
      this.snackBar.open(error.message, 'Features', {
        duration: 3000,
      });
    });
  }
  
}
  