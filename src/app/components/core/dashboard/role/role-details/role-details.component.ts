import { Component, OnInit, Input, Output, EventEmitter  } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { DepartmentService } from '../../../../../services/department/department.service';
import {RoleService} from '../role.service';
import { MatDialog, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { FeaturePopupComponent } from '../../../../../components/shared/feature-popup/feature-popup.component'
import {merge as observableMerge, Subject} from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-role-details',
  templateUrl: './role-details.component.html',
  styleUrls: ['./role-details.component.scss']
})
export class RoleDetailsComponent implements OnInit {
  @Input() data: any;
  @Input() formType: string;
  @Input() orgID: string;
  @Output() public tabSwitch: EventEmitter<any> = new EventEmitter<any>();
  @Output() public updateRefresh: EventEmitter<any> = new EventEmitter<any>();
  userAuth: any;
  roleDetailsForm: FormGroup;
  _roleId = ['ADMIN', 'USER', 'MANAGEMENT'];
  departments: any;
  isLoading: boolean;
  private unsubscribe: Subject<any> = new Subject();
  
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private roleService: RoleService,
    private departmentService: DepartmentService,
    private dialog : MatDialog) {
  }

  ngOnInit() {
    observableMerge(this.route.params, this.route.queryParams).pipe(
      	takeUntil(this.unsubscribe))
      	.subscribe((params) => this.loadRoute(params));
    this.roleDetailsForm = this.createFormGroup();
    this.assignValuesToForm();
  }
  public ngOnDestroy(): void {
		this.unsubscribe.next();
		this.unsubscribe.complete();
	}
  loadRoute(params: any) {
		if('orgID' in params) {
			this.orgID = params['orgID'];
      this.getDepartments();    
		}
	}
  createFormGroup() {
    return new FormGroup({
      name: new FormControl('', [Validators.required]),
      _organisationId: new FormControl(this.orgID),
      _departmentId: new FormControl('', [Validators.required]),
      userType: new FormControl('', [Validators.required]),
      features: new FormControl(0, [Validators.required]),
      approvals: new FormControl(''),
      approvalProcess: new FormControl([]),
      description: new FormControl(''),
      access: new FormControl([])
    });
  }
//assigning values of form to data
  assignValuesToForm() {
    if(this.formType !== 'create') {
      this.roleDetailsForm.patchValue(this.data)
    }
  }
/*method to get department*/
  getDepartments() {
    if(this.orgID) {
      this.departmentService.getDepartmentByOrg(`filter[_organisationId]=${this.orgID}` )
      .pipe().subscribe(res => {
          this.departments = res;
        }, (error: any) => {
          console.error('error', error);
        });
    }
	}
/*method to get feature*/
  getFeatures() {
    if(this.formType !== 'create') {
      this.openDialogFeature(this.data.access)
    } else {
      let userType = this.roleDetailsForm.value.userType;
      let departmentId = this.roleDetailsForm.value._departmentId;
      this.roleService.getFeatures(userType, departmentId )
      .pipe().subscribe(res => {
        res.forEach((d) => d.check = false)
        this.openDialogFeature(res)
      }, (error: any) => {
        console.error('error', error);
      });
    }
	}
  //dialog of feature
  openDialogFeature(featureData) {
    const dialogRef = this.dialog.open(FeaturePopupComponent, {
      width: '500px',
      data: featureData ? featureData : []
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.roleDetailsForm.controls['features'].setValue(result.length)
        result.forEach((list) => {
          list._featureId = list._id
          list.rules.forEach((rule) => {
            rule.permissions.forEach((permission) => {
              permission.accessFlag = permission.defaultFlag;
            })
          })
        });
        this.roleDetailsForm.value.access = result;
      }
    });
  }

  onFormCancel(){
    this.roleDetailsForm.reset()
  }

  onSubmit() {
    // Do useful stuff with the gathered data
    this.roleDetailsForm.value._organisationId = this.orgID;
    if(this.formType !== 'create') {
      this.roleService.updateRole(this.data._id, this.roleDetailsForm.value )
      .pipe().subscribe(res => {
          this.isLoading = false;
          this.snackBar.open("Roles Updated Succesfully", 'Roles', {
            duration: 5000,
          });
          this.updateRefresh.emit()
        }, (error: any) => {
          this.snackBar.open(error.message, 'Roles', {
            duration: 5000,
          });
        });
    } else {
      this.roleService.createRole(this.roleDetailsForm.value )
      .pipe().subscribe(res => {
          this.isLoading = false;
          this.snackBar.open("Roles Created Succesfully", 'Roles', {
            duration: 5000,
          });
          let tabReq = {index: 0, orgId: this.roleDetailsForm.value._organisationId}
          this.tabSwitch.emit(tabReq);
          this.roleDetailsForm.reset()
        }, (error: any) => {
          this.snackBar.open(error.message, 'Roles', {
            duration: 5000,
          });
        });
    }
  }
}
