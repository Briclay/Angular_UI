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
  plans = ['basic', 'standard', 'permium', 'enterprise']
  orgType = ['ADMINISTRATOR', 'BUILDER', 'CONTRACTOR'];
  parantselect = ['Parent Organisation', 'Child Organisation'];
  parorg: boolean = false;
  IsShow: boolean = false;
  features = [];
  form: FormGroup;
  organisationCount: number;
  featuresArray = [];
  selectedFeatureArray = [];
  selectedFeatureValue = [];
  indexOfFeature;
  formErrors: any;
  orgFormErrors: any;
  orgFormSubmitted = false;
  getInitFeature : any;
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
  selected = 'basic';
  myFilter : any;

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

    /*this.myFilter = (d: Date): boolean => {
      const date = d.getDate();
      let nD = new Date()
      // Prevent Saturday and Sunday from being selected.
      return (date !== 0 && date !== 1 && date !== 2  && date !== 3 && date !== 4
        && date !== 5 && date !== 6 && date === nD);
    }*/
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
      logoImageUrl: [''],
      logoImage: [''],
      /*      _parentOrganisationId: [''],*/
      _childOrganisationsId: [''],
      _features: [''],
      sharedFeature : [''],
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
        email: ['', Validators.required],
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

    this.organizationDetailsForm.valueChanges.subscribe(() => {
      this.onOrgFormValuesChanged();
    })
  }

  ngOnInit() {
    this.assignValuesToForm();
    this.getAllFeatures();
  }

  assignValuesToForm() {
    if(this.formType !== 'create') {
      this.organizationDetailsForm.patchValue(this.data)
    }
  }

   onOrgFormValuesChanged() {
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
  }

  getAllFeatures(){
    this.featureService.getFeatures()
      .pipe().subscribe(response => {
        this._features = response;
    }, (error: any) => {
      this.snackBar.open(error.message, 'Features', {
        duration: 3000,
      });
    });
  }

  getFeatures() {
    this.openDialogFeature();
  }

  openDialogFeature() {
    var featuresList = [] ; 
    if(this.formType !== 'create'){
      this.featureService.getFeatures()
      .pipe().subscribe(response => {
        this._features = response;
        this.getOrgData(this.organizationDetailsForm.value._id, function(){
          var orgFeaturesList = this.getInitFeature;
          this._features.forEach(fl => {
           var feature = orgFeaturesList.find((f) => {return f._id == fl._id})
           if (feature) {
            fl.activeFlag = true;
          }
          else{
            fl.activeFlag = false;
          }
        })
        featuresList = this._features;
        featuresList.forEach((list) => list.hidePermissions = true)
        const dialogRef = this.dialog.open(FeaturePopupComponent, {
          width: '550px',
          data: featuresList ? featuresList : {}
        });
        dialogRef.afterClosed().subscribe(result => {
        });
      }.bind(this))

      }, (error: any) => {
        this.snackBar.open(error.message, 'Features', {
          duration: 3000,
        });
      });
    }
    else {
      featuresList = this._features;
      featuresList.forEach((list) => list.hidePermissions = true)
      const dialogRef = this.dialog.open(FeaturePopupComponent, {
        width: '550px',
        data: featuresList ? featuresList : {}
      });
      dialogRef.afterClosed().subscribe(result => {
      });
    }
  }

  preventDefault ($event) {
    $event.preventDefault();
  }

  getOrgData(id, next) {
    this.organizationService.getOne(id)
    .pipe().subscribe(response => {
      this.getInitFeature = response._features;
      next();
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
      let str = this.sortName.toUpperCase() + '-' + new Date().toISOString();
      this.organizationDetailsForm.controls['orgCode'].setValue(str);
    }
  }

  onOrgFormSubmit() {
    this._features.map(f =>{
      delete (f.hidePermissions)
    })
    var selectedFeatures = [];
    this._features.forEach((list) => { 
      if(list.activeFlag){
        selectedFeatures.push(list._id);
      }
    });
    this.organizationDetailsForm.value._features = selectedFeatures;
    this.organizationDetailsForm.value.subscription.registrationDate = moment(new Date()).local().format("YYYY-MM-DD")
    this.organizationDetailsForm.value.subscription.plan = this.selected; 
    this.organizationDetailsForm.value.subscription.validTill = moment(this.organizationDetailsForm.value.subscription.validTill).local().format("YYYY-MM-DD") 
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
      console.log(response,'response.message')
      this.snackBar.open("Organisation updated successfully", 'Organisation', {
        duration: 2000,
      });
      this.organizationDetailsForm['_touched'] = false;
      const path = '/dashboard/organisation'
      this.router.navigate([path]);
      this.tabSwitch.emit(0);
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
}
  