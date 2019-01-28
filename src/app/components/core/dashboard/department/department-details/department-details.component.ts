import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DepartmentService } from '../../../../../services/department/department.service';
import { AuthenticationService } from '../../../../../services/authentication/authentication.service';
import { Router , ActivatedRoute} from '@angular/router';
import { OrganizationService } from '../../../../../services/organization/organization.service';
import * as _ from 'lodash';
import { FeaturePopupComponent } from '../../../../../components/shared/feature-popup/feature-popup.component'
import { MatDialog,  MatSnackBar ,MAT_DIALOG_DATA } from '@angular/material';
import { AuthService } from '../../../../../services/auth.service';

@Component({
  selector: 'app-department-details',
  templateUrl: './department-details.component.html',
  styleUrls: ['./department-details.component.scss']
})
export class DepartmentDetailsComponent implements OnInit {
  @Input() data: any;
  @Input() formType: string;

  userAuth: any;
  departmentDetailsForm: FormGroup;
  departments: string[] = ['Finance', 'Construction'];
  _organisationId :any;
  temp : any;
  sF : any;
  DeptList: any;
  form: FormGroup;
  formErrors: any;
  features = [];
  featuresArray = [];
  indexOfItem;
  departmentsvalue: any;
  deptFormErrors: any;
  deptFormSubmitted = false;
  selectedAll = false;
  editFlag = false;
 
  featureData : any;
  allFeatureCount = 0;
  constructor(
    private DeptService: DepartmentService,
    private formBuilder : FormBuilder,
    private authenticationService: AuthenticationService,
    private OrgService: OrganizationService,
    private route: ActivatedRoute, 
    private router: Router,
    private dialog : MatDialog,
    private snackBar: MatSnackBar,
    private auth: AuthService) 
  {

    //this.userAuth = this.auth.get();
    this.userAuth = JSON.parse(window.localStorage.getItem('authUserOrganisation'));
    this._organisationId = this.userAuth._id;
    this.deptFormErrors = {
      name: {},
      description: {},
      _features: [],
      _organisationId: {},
      _roles: [],
      specialFolder: {}
    };

    this.departmentDetailsForm = this.formBuilder.group({
      _id: ['', Validators.required],
      name: ['', Validators.required],
      description: ['', Validators.required],
      _features: this.formBuilder.array([]),
      _roles : this.formBuilder.array([]),
      _organisationId: ['', Validators.required],
      sharedResource: this.formBuilder.array([]),
      specialFolder: [true, Validators.required],
    });
    this.departmentDetailsForm.valueChanges.subscribe(() => {
      this.onOrgFormValuesChanged();
    })

    //get single or list
    //this.getFeatureByOrg(this._organisationId);
  }

  ngOnInit() {
    this.assignValuesToForm();
  }
  
  assignValuesToForm() {
    if(this.formType !== 'create') {
      this.departmentDetailsForm.patchValue(this.data)
    }
  }

  getFeatures() {
    this.DeptService.getFeature()
    .pipe().subscribe(response => {
      this.featuresList = response;
      let features = response.map((list) => { 
        if(list.activeFlag) {
          return list;
        }
      });
      this._features = features;
      this.openDialogFeature(this._features)
    }, (error: any) => {
      this.snackBar.open(error.message, 'Features', {
        duration: 3000,
      });
    });
  }

  openDialogFeature(featuresList) {
    this.featureData = featuresList;
    featuresList.forEach((list) => list.hidePermissions = true)
    const dialogRef = this.dialog.open(FeaturePopupComponent, {
      width: '550px',
      data: featuresList ? featuresList : {}
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        let features = result.map((list) => { 
          return list._id;
       });        
        this._features = features;
      }
    });
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

  onDeptFormSubmit() {
    console.log(this.departmentDetailsForm.value);
    this.deptFormSubmitted = true;
    this.departmentDetailsForm.value._features = this._features;
    /*check if id is not epmty then save otherwise update*/
    if ((!_.isUndefined(this.departmentDetailsForm.value._id) 
      && !_.isEmpty(this.departmentDetailsForm.value._id))) {
      this.DeptService.update(this.departmentDetailsForm.value._id, this.departmentDetailsForm.value)
    .pipe().subscribe(response => {
      this.deptFormSubmitted = false;
      this.snackBar.open("Department updated successfully", 'Department', {
        duration: 2000,
      });
    }, (error: any) => {
      this.deptFormSubmitted = false;
      this.snackBar.open(error.message, 'Department', {
        duration: 2000,
      });
      console.log(error.message)
    });
  } 
  else {
    delete this.departmentDetailsForm.value._id;
    this.departmentDetailsForm.value._organisationId  = this._organisationId;
    this.DeptService.save(this.departmentDetailsForm.value)
    .pipe().subscribe(response => {
      this.deptFormSubmitted = false;
      console.log(response, 'response');
      this.snackBar.open("Department created successfully", 'Department', {
        duration: 2000,
      });
    }, (error: any) => {
      this.deptFormSubmitted = false;
      this.snackBar.open(error.message, 'Department', {
        duration: 2000,
      });
      console.log(error.message)
    });
  } 
}
}