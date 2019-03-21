import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators,FormArray } from '@angular/forms';
import { DepartmentService } from '../../../../../services/department/department.service';
import { AuthenticationService } from '../../../../../services/authentication/authentication.service';
import { Router , ActivatedRoute} from '@angular/router';
import { OrganizationService } from '../../../../../services/organization/organization.service';
import * as _ from 'lodash';
import { FeaturePopupComponent } from '../../../../../components/shared/feature-popup/feature-popup.component'
import { MatDialog,  MatSnackBar ,MAT_DIALOG_DATA } from '@angular/material';
import { AuthService } from '../../../../../services/auth.service';
import {FeatureService} from "../../../../../services/features/features.service";
import {merge as observableMerge, Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
declare var moment: any;

@Component({
  selector: 'app-department-details',
  templateUrl: './department-details.component.html',
  styleUrls: ['./department-details.component.scss']
})
export class DepartmentDetailsComponent implements OnInit {
  @Input() data: any;
  @Input() formType: string;
  @Output() public tabSwitch: EventEmitter<any> = new EventEmitter<any>();
  @Output() public updateRefresh: EventEmitter<any> = new EventEmitter<any>();

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
  _features = [];
  featureData : any;
  allFeatureCount : any;
  getInitFeature = [];
  specialFolderCheck : boolean;
  private unsubscribe: Subject<any> = new Subject();
  constructor(
    private DeptService: DepartmentService,
    private formBuilder : FormBuilder,
    private authenticationService: AuthenticationService,
    private OrgService: OrganizationService,
    private route: ActivatedRoute, 
    private router: Router,
    private dialog : MatDialog,
    private snackBar: MatSnackBar,
    private auth: AuthService,
    private featureService: FeatureService) 
  {
    //this.userAuth = this.auth.get();
    this.userAuth = JSON.parse(window.localStorage.getItem('authUserOrganisation'));
    this.deptFormErrors = {
      name: {},
      description: {},
      _features: [],
      _organisationId: {},
      _roles: [],
      specialFolder: {}
    };
    
  }

  ngOnInit() {
    observableMerge(this.route.params, this.route.queryParams).pipe(
      	takeUntil(this.unsubscribe))
      	.subscribe((params) => this.loadRoute(params));
  }

  loadRoute(params: any) {
		if('orgID' in params) {
			this._organisationId = params['orgID'];
        this.departmentDetailsForm = this.formBuilder.group({
        _id: ['', Validators.required],
        name: ['', Validators.required],
        description: ['', Validators.required],
        _features: this.formBuilder.array([]),
        _roles : this.formBuilder.array([]),
        _organisationId: [this._organisationId, Validators.required],
        sharedResource: this.formBuilder.array([]),
        specialFolder: ['', Validators.required],
      });
      this.departmentDetailsForm.valueChanges.subscribe(() => {
        this.onOrgFormValuesChanged();
      })
			this.assignValuesToForm();
      this.getAllFeatures();
		}
	}
  
  assignValuesToForm() {
    if(this.formType !== 'create') {
      this.departmentDetailsForm.patchValue(this.data)
    }
  }

  specialFolderValue (event){
   this.specialFolderCheck = event.checked;
  }
  
  getAllFeatures(){
    /*his.DeptService.getFeatures(this._organisationId)*/
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
        this.getDepartmentById(this.departmentDetailsForm.value._id, function(){
          var orgFeaturesList = this.getInitFeature;
          this._features.forEach(fl => {
           var feature = orgFeaturesList.find((f) => { return f._id == fl._id })
           if (feature) {
            fl.activeFlag = true;
          }
          else{
            fl.activeFlag = false;
          }
        })
        featuresList = this._features;
        featuresList.forEach((list) => list.hidePermissions = true)
        featuresList.forEach((d) => d.check = true)
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
      featuresList.forEach((d) => d.check = true)
      const dialogRef = this.dialog.open(FeaturePopupComponent, {
        width: '550px',
        data: featuresList ? featuresList : {}
      });
      dialogRef.afterClosed().subscribe(result => {
      });
    }
  }

  getDepartmentById(id, next) {
    this.DeptService.getOne(id)
    .pipe().subscribe(response => {
      this.getInitFeature = response._features;
      next();
    }, (error: any) => {
      this.snackBar.open(error.message, 'Department', {
        duration: 3000,
      });
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

  onFormCancel(){
    this.departmentDetailsForm.reset()
  }

  onDeptFormSubmit() {
    console.log(this.departmentDetailsForm.value);
    this.deptFormSubmitted = true;
    this._features.map(f =>{
      delete (f.hidePermissions)
    })
    var selectedFeatures = [];
    this._features.forEach((list) => { 
      if(list.activeFlag){
        selectedFeatures.push(list._id);
      }
    });
    this.departmentDetailsForm.value._features = selectedFeatures;
    this.departmentDetailsForm.value.specialFolder = this.specialFolderCheck;
        /*check if id is not epmty then save otherwise update*/
    if ((!_.isUndefined(this.departmentDetailsForm.value._id) 
      && !_.isEmpty(this.departmentDetailsForm.value._id))) {
      this.DeptService.update(this.departmentDetailsForm.value._id, this.departmentDetailsForm.value)
    .pipe().subscribe(response => {
      this.deptFormSubmitted = false;
      this.snackBar.open("Department updated successfully", 'Department', {
        duration: 2000,
      });
      this.updateRefresh.emit()
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