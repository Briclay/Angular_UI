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
   DeptList: any;
  form: FormGroup;
  formErrors: any;
  features = [];
  featuresArray = [];
  indexOfItem;
  departmentsvalue: any;
  deptId: any;
  deptFormErrors: any;
  deptFormSubmitted = false;
  selectedAll = false;
  editFlag = false;

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
    this.getAllDept(this._organisationId);
    this.deptFormErrors = {
      name: {},
      description: {},
      _features: [],
      _organisationId: {},
      selectedAll: {},
      access: {}
    };

    this.departmentDetailsForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      _features: this.formBuilder.array([]),
      _organisationId: this._organisationId,
      selectedAll: false,
      access: false
    });
    this.departmentDetailsForm.valueChanges.subscribe(() => {
      this.onOrgFormValuesChanged();
    })

    //get single or list
    this.getFeatureByOrg(this._organisationId);
  }

  ngOnInit() {
    this.departmentDetailsForm = this.createFormGroup();
    this.assignValuesToForm();
  }

  getAllDept(id) {
    this.DeptService.getAll('filter[_organisationId] =' + id)
      .pipe().subscribe(response => {
      this.DeptList = response;
      this.temp = this.DeptList;
    }, (error: any) => {
        console.log(error.error.message)
    });
  }

  createFormGroup() {
    return new FormGroup({
  		name: new FormControl('', [Validators.required]),
  		description: new FormControl('', [Validators.required]),
  		_features: new FormControl('', [Validators.required]),
      roles : new FormControl('')
    });
  }

  assignValuesToForm() {
    if(this.formType !== 'create') {
      this.departmentDetailsForm.patchValue(this.data)
      this.deptId = '5a5848c98e64e99e47f98a8d';
      this.gtDepartmentForEdit(this.deptId);
    }
  }

  gtDepartmentForEdit(id) {
    this.DeptService.getOne(id)
        .pipe().subscribe(response => {
        if ((!_.isUndefined(response) && !_.isEmpty(response))) {
          this.ediMapping(response);
        } else {
          console.log('No request found for that department');
        }
      }, (error: any) => {
        console.log(error.error.message)
      });
  }

   //for edit mapping
  ediMapping(response) {
    //set name
    this.departmentDetailsForm.controls['name'].setValue(response.name);
    //set description
    this.departmentDetailsForm.controls['description'].setValue(response.description);
    //maping array
    //this.features = response._features
    response._features.forEach((num: any) => {
      this.featuresArray.push(num._id);
    });
    if( _.isEqual(this.features.length, this.featuresArray.length) )
    {
      this.selectedAll = true;
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

  getFeatureByOrg(id) {
    this.OrgService.getOne(id)
        .pipe().subscribe(response => {
        this.features = response.data._features;
      }, (error: any) => {
        console.log(error.error.message)
      });
  }

  onDeptFormSubmit() {
    console.log(this.departmentDetailsForm.value);
    this.deptFormSubmitted = true;
    this.departmentDetailsForm.value._features = this.featuresArray;
      if (this.featuresArray.length > 0) {
      /*check if id is not epmty then save otherwise update*/
      if ((!_.isUndefined(this.deptId) && !_.isEmpty(this.deptId))) {
        this.DeptService.update(this.deptId, this.departmentDetailsForm.value)
          .pipe().subscribe(response => {
          this.deptFormSubmitted = false;
            // toasty message
            console.log(response.message);
            const path = '/departments'
            // route to department list
            this.router.navigate([path]);
          }, (error: any) => {
            this.deptFormSubmitted = false;
            console.log(error.error.message)
          });
      } else {
        this.DeptService.save(this.departmentDetailsForm.value)
          .pipe().subscribe(response => {
          this.deptFormSubmitted = false;
            // toasty message
            console.log(response.message);
            const path = '/departments'
            // route to department list
            this.router.navigate([path]);
          }, (error: any) => {
            this.deptFormSubmitted = false;
            console.log(error.error.message)
          });
      }
      } else {
      console.log('At least select one feature');
    }
  }

  //checked if feature is already selected or not
  isChecked() {
    return _.isEqual(this.features.length, this.featuresArray.length);
  }

  //slected all feature
  selectAll() {
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
  }

  //check item is exit of array or not
  exists(item) {
    return this.featuresArray.indexOf(item._id) > -1;
  }

  //select one feature form list
  select(item) {
  /*this.deptForm.value._features.forEach((num: any) => {
      this.featuresArray.push(num._id);
    });*/
    this.indexOfItem = this.featuresArray.indexOf(item._id);
    if (this.indexOfItem > -1) {
      this.featuresArray.splice(this.indexOfItem, 1);
    } else {
      this.featuresArray.push(item._id);
    }
  }

  onSubmit() {
    // Do useful stuff with the gathered data
    console.log(this.departmentDetailsForm.value);
  }

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
