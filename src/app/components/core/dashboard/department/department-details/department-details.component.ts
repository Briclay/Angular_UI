import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DepartmentService } from '../../../../../services/department/department.service';
import { AuthenticationService } from '../../../../../services/authentication/authentication.service';
import { Router , ActivatedRoute} from '@angular/router';
import { OrganizationService } from '../../../../../services/organization/organization.service';
import * as _ from 'lodash';

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
  allFeatures = ['File' ,'Folder Manager' ,'Service Request','Snag Master']
  allFeatureCount = 0;
  constructor(
    private DeptService: DepartmentService,
    private formBuilder : FormBuilder,
    private authenticationService: AuthenticationService,
    private OrgService: OrganizationService,
    private route: ActivatedRoute, 
    private router: Router) 
  {
          
    //this.userAuth = this.auth.get();
    this.userAuth = JSON.parse(window.localStorage.getItem("userAuth"));
    this._organisationId = this.userAuth._organisationId._id;
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
  changeEvent(event) {
    this.sF = event.source.value;
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
    this.departmentDetailsForm.value._features = this.featuresArray;
      /*check if id is not epmty then save otherwise update*/
      if ((!_.isUndefined(this.departmentDetailsForm.value._id) 
        && !_.isEmpty(this.departmentDetailsForm.value._id))) {
        this.DeptService.update(this.departmentDetailsForm.value._id, this.departmentDetailsForm.value)
          .pipe().subscribe(response => {
          this.deptFormSubmitted = false;
          }, (error: any) => {
            this.deptFormSubmitted = false;
            console.log(error.message)
          });
      } 
      else {
        delete this.departmentDetailsForm.value._id;
        this.DeptService.save(this.departmentDetailsForm.value)
          .pipe().subscribe(response => {
          this.deptFormSubmitted = false;
            console.log(response, 'response');
          }, (error: any) => {
            this.deptFormSubmitted = false;
            console.log(error.message)
          });
      } 
    }

  //checked if feature is already selected or not
  /*isChecked() {
    return _.isEqual(this.features.length, this.featuresArray.length);
  }*/

  //slected all feature
  /*selectAll() {
    if (this.features.length === this.featuresArray.length) {
      this.featuresArray = [];
      this.selectedAll = false;
    } else {
      this.featuresArray = [];
      this.features.forEach((num: any) => {
        this.featuresArray.push(num._id);
      });
      this.selectedAll = true;
    }
  }*/

  //check item is exit of array or not
  /*exists(item) {
    return this.featuresArray.indexOf(item._id) > -1;
  }

  //select one feature form list
  select(item) {
    //this.deptForm.value._features.forEach((num: any) => {
    //  this.featuresArray.push(num._id);
    //});
    this.indexOfItem = this.featuresArray.indexOf(item._id);
    if (this.indexOfItem > -1) {
      this.featuresArray.splice(this.indexOfItem, 1);
    } else {
      this.featuresArray.push(item._id);
    }
  }*/
  /* 
   deleteRequest(id) {
    if (id) {
      let dialogRef = this.dialog.open(DeleteDialogComponent, {
          width: '600px',
          data: {
            'title': 'Delete Request',
            'approvalFlag': false,
            'approvalList': []
          }
        }).afterClosed()
        .subscribe(response => {
          if (!_.isUndefined(response) && response !== 'cancel') {
            this.deleteDept(id, response);
          }
        });
    }
  }

  deleteDept(id, body) {
    this.DeptService.deleteDept(id, body)
            .pipe().subscribe(response => {

        const toastOptions: ToastOptions = {
          title: 'Success',
          msg: response.message
        };
        this.toastyService.success(toastOptions);
        this.getAllDept(id);
      }, (error: any) => {
        console.log(error.error.error.message);
      });
  }*/

}
