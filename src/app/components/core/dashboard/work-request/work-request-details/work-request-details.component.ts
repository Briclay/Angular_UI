import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';
import { MatDialog, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { WorkRequestService } from '../work-request.service';
import { UserService } from '../../../dashboard/user/user.service';
import { ProjectService } from '../../../dashboard/projects/project.service';
import { DateUtils } from '../../../../../utils/date-uitls';
import { merge as observableMerge, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { WorkCategoryDialogComponent } from './work-category-dialog/work-category-dialog.component';

@Component({
  selector: 'app-work-request-details',
  templateUrl: './work-request-details.component.html',
  styleUrls: ['./work-request-details.component.scss']
})
export class WorkRequestDetailsComponent implements OnInit {
  @Input() formType: string;
  @Input() data: any;
  @Output() public tabSwitch: EventEmitter<any> = new EventEmitter<any>();
  @Output() public updateRefresh: EventEmitter<any> = new EventEmitter<any>();

  private unsubscribe: Subject<any> = new Subject();
  form: FormGroup;
  formErrors: any;
  workTrackerFormErrors: any;
  userAuth: any;
  workTrackerForm: FormGroup;
  workCategory = [];
  typeOfWork: any;
  requestTrcakerList: any;
  reuqestNumber: String;
  projectsList = [];
  userList = [];
  todayDate: String;
  status: any;
  leadDateTime = (new Date());
  needByDate = (new Date());
  time = {
    timeToComplete: null,
    leadDaysToComplete: null,
    leadTimeRequire: null
  };
  orgId: string;
  orgDetails: any;
  isLoading: boolean;
  dept: any;
  enableTypeOfConsultant = false;
  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private projectService: ProjectService,
    private workRequestService: WorkRequestService,
    private userService: UserService) {
    // get org id for superadmin
    this.todayDate = (new Date()).toISOString();
    this.orgDetails = JSON.parse(window.localStorage.authUserOrganisation);
    this.dept = JSON.parse(window.localStorage.authUserDepartment);
    this.orgId = this.orgDetails._id;
    // list of typ of work

    //this.typeOfWork = [ 'Contractor Appointement' ,'Termination Order']
    this.typeOfWork = ['Appointment of contractor', 'Appointment of consultant','Variation order','Termination Order'];
    this.workTrackerFormErrors = {
      requestNumber: {},
      date: {},
      _organisationId: {},
      _projectId: {},
      _assignedId: {},
      status: {},
      workDescription: {},
      typeOfWork: {},
      workCategory: {},
      leadTimeRequire: {},
      needByDate: {},
      leadDaysToComplete: {},
      initiatedDate: {},
      RFAPutUpDate: {},
      timeToComplete: {},
      RFAapprovalDate: {},
      workOrderPutDate: {},
      workOrderApprovalDate: {},
      supportRole: {},
      remark: {},
      awardDate: {},
      typeOfConsultant : {},
    };

    this.workTrackerForm = this.formBuilder.group({
      _organisationId: this.orgId,
      _projectId: ['', Validators.required],
      requestNumber: this.reuqestNumber,
      status: 'Open',
      date: new FormControl((new Date())),
      _assignedId: null,
      workDescription: ['', Validators.required],
      typeOfWork: ['', Validators.required],
      workCategory: ['', Validators.required],
      leadTimeRequire: ['', Validators.required],
      needByDate: ['', Validators.required],
      leadDaysToComplete: ['', Validators.required],
      needByStatusReason: [''],
      supportRole: null,
      awardedDate: [''],
      initiatedDate: [''],
      RFAPutUpDate: [''],
      timeToComplete: [''],
      RFAapprovalDate: [''],
      remark: [''],
      workOrderPutDate: [''],
      workOrderApprovalDate: [''],
      typeOfConsultant : ['', Validators.required]
    });
    this.getAllWorkRequestTracker();
    this.getUsers();
    this.getAllProjectsList();
    this.getWorkCategory();
  }
  noOfDays() {
    console.log('this.workTrackerForm no of days' + JSON.stringify(this.workTrackerForm.value));
    const name = this.workTrackerForm.value.workCategory;
    const selectedWorkCat = _.filter(this.workCategory, function (data) {
      console.log('data ', data);
      return data.name === name;
    });
    console.log('selectedWorkCat', selectedWorkCat);
    this.workTrackerForm.controls['leadTimeRequire'].setValue(selectedWorkCat[0].noOfDays);
  }

  ngOnInit() {
    // tslint:disable-next-line:max-line-length
    observableMerge(this.route.params, this.route.queryParams).pipe(takeUntil(this.unsubscribe)).subscribe((params) => this.loadRoute(params));
  }

  loadRoute(params: any) {
    this.assignValuesToForm();
    this.getAllWorkRequestTracker();
    this.getUsers();
    this.getAllProjectsList();
    this.getWorkCategory();
    // this.getWorkRequest();
  }
  assignValuesToForm() {
    if (this.formType !== 'create') {
      this.workTrackerForm.patchValue(this.data);
      if(this.data.typeOfWork === 'Appointment of consultant'){
        this.enableTypeOfConsultant = true;
      }
    }
  }

  getAllProjectsList() {
    // get all project
    this.projectService.getProjects(this.orgId)
      .pipe().subscribe(res => {
        console.log('projectt res', res);
        this.projectsList = res;
      }, (error: any) => {
        // TODO add error component
        console.error('error', error);
      });
  }

  workCategoryDialog(){
    const dialogRef = this.dialog.open(WorkCategoryDialogComponent, {
          width: '800px',
          data : this.workCategory
        });
        dialogRef.afterClosed().subscribe(result => {
          
        });
  }

  selectTypeOfWork(event){
    this.enableTypeOfConsultant = false;
    if('Appointment of consultant' === event){
      this.enableTypeOfConsultant = true;
    }
  }

  getAllWorkRequestTracker() {
    // get all work request for calculting request number
    this.workRequestService.getWorkRequest(`filter[_organisationId]=${this.orgId}`)
      .pipe().subscribe(res => {
        this.requestTrcakerList = res;
        if (this.formType !== 'create') {
          this.reuqestNumber = this.data.requestNumber;
        } else {
          this.reuqestNumber = `R${this.createRequestNumber(this.requestTrcakerList.length + 1)}`;
        }
        this.workTrackerForm.controls['requestNumber'].setValue(this.reuqestNumber);
      }, (error: any) => {
        // TODO add error component
        console.error('error', error);
      });
  }
  workTrackerFormSubmit() {
    console.log('(this.workTrackerForm' + JSON.stringify(this.workTrackerForm.value));
    //if (this.workTrackerForm.valid) {
      this.workTrackerForm.value._organisationId = this.orgId;
      if (this.workTrackerForm.value.initiatedDate && this.workTrackerForm.value.RFAapprovalDate) {
        if (this.workTrackerForm.value.initiatedDate < this.workTrackerForm.value.RFAapprovalDate) {
          this.onSave();
        } else {
          this.snackBar.open("Enter initiated Date & RFA approval Date", 'Work-request', {
            duration: 3000,
          });
        }
      } else {
        this.onSave();
      }
   /* } else {
    }*/
  }

  getUsers() {
    this.userService.getUser(this.orgId + '&filter[_departmentId]=' + this.dept._id)
      .pipe().subscribe(res => {
        this.userList = res;
      }, (error: any) => {
        // TODO add error component
        console.error('error', error);
      });
  }

  saveWorkRequest(requestData) {
    console.log('requestData' + JSON.stringify(requestData));
    this.isLoading = true;
    this.workRequestService.saveWorkRequest(requestData)
      .pipe().subscribe(res => {
        this.isLoading = false;
        this.tabSwitch.emit(0);
        this.workTrackerForm.reset();
        this.snackBar.open("Work-request Created Succesfully", 'Work-request', {
          duration: 3000,
        });
      }, (error: any) => {
        // TODO add error component
        console.error('error', error);
        this.isLoading = false;
      });
  }

  updateWorkRequest(requestData) {
    console.log('requestData' + JSON.stringify(requestData));
    requestData = { ...requestData };
    delete requestData.needByDate;
    this.isLoading = true;
    this.workRequestService.updateWorkRequest(requestData, this.data._id)
      .pipe().subscribe(res => {
        console.log('updateWorkRequest saved', res);
        this.isLoading = false;
        this.updateRefresh.emit()
        this.snackBar.open("Work-request Updated Succesfully", 'Work-request', {
          duration: 3000,
        });
      }, (error: any) => {
        // TODO add error component
        console.error('error', error);
        this.isLoading = false;
      });
  }

  onSave() {
    console.log('this.formType' + this.formType);
    console.log('on save ', this.workTrackerForm.value);
    const requestData = {
      ...this.workTrackerForm.value,
      leadTimeRequire: this.workTrackerForm.value.leadTimeRequire
    };
    console.log('on save requestData', requestData);

    this.formType !== 'create' ? this.updateWorkRequest(requestData) : this.saveWorkRequest(requestData);
  }
  /* Open dailog for reason */

  calLeadDaysToComplete() {
    console.log('date');
    console.log(this.workTrackerForm.value.leadTimeRequire);
    console.log(this.workTrackerForm.value.leadDuration);
    console.log(_.isNumber(this.workTrackerForm.value.leadTimeRequire));
    // if (this.workTrackerForm.value.date <= this.workTrackerForm.value.needByDate) {
    if (this.workTrackerForm.value.leadTimeRequire) {
      const dateOffset = (24 * 60 * 60 * 1000) * this.workTrackerForm.value.leadTimeRequire;
      const need_date = this.workTrackerForm.value.needByDate.getTime();
      this.workTrackerForm.value.needByDate.setTime(need_date);
      const timeDiff = this.workTrackerForm.value.needByDate.getTime() - this.workTrackerForm.value.date.getTime();
      const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
      console.log('diffDays of lead days to comlete' + typeof diffDays);
      this.workTrackerForm.controls['leadDaysToComplete'].setValue(diffDays);
      this.time.leadDaysToComplete = diffDays;
    } else {
    }
    /* } else {
       throw new MatkraftError("Need by date can not less than current date");
     }*/
  }
  calTimeToComplete() {
    this.todayDate = this.workTrackerForm.value.initiatedDate;
    if (this.workTrackerForm.value.initiatedDate) {
      this.workTrackerForm.controls['status'].setValue('In Progress');
    }
    if (this.workTrackerForm.value.RFAapprovalDate) {
      this.workTrackerForm.controls['status'].setValue('RFA Approved');
    }
    if (this.workTrackerForm.value.initiatedDate && this.workTrackerForm.value.RFAapprovalDate) {
      if (this.workTrackerForm.value.initiatedDate < this.workTrackerForm.value.RFAapprovalDate) {
        // tslint:disable-next-line:max-line-length
        const timeDiff = Math.abs(this.workTrackerForm.value.initiatedDate.getTime() - this.workTrackerForm.value.RFAapprovalDate.getTime());
        const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
        console.log('diffDays of time to complete', diffDays);
        this.workTrackerForm.controls['timeToComplete'].setValue(diffDays);
        this.time.timeToComplete = diffDays;

      } else {
      }
    }
  }
  mappingAwaredDate() {
    this.workTrackerForm.controls['awardedDate'].setValue(this.workTrackerForm.value.workOrderPutDate);
    if (this.workTrackerForm.value.RFAPutUpDate && this.workTrackerForm.value.workOrderPutDate) {
      this.workTrackerForm.controls['status'].setValue('RFA/WO Put Up');
    } else {
      this.workTrackerForm.controls['status'].setValue('Work Order Put Up');
    }
  }
  changeStatus(value) {
    if (this.workTrackerForm.value.RFAPutUpDate && this.workTrackerForm.value.workOrderPutDate) {
      this.workTrackerForm.controls['status'].setValue('RFA/WO Put Up');
    } else {
      this.workTrackerForm.controls['status'].setValue(value);
    }
  }
  createRequestNumber(number) {
    let str = '' + number;
    let count = 0;
    const padArray = [{ len: 1, size: 3 }, { len: 2, size: 2 }, { len: 3, size: 1 }, { len: 4, size: 0 }];
    const findSize = _.find(padArray, function (item) {
      return item.len === str.length;
    });
    while (count < findSize.size) {
      str = '0' + str;
      count++;
    }
    return str;
  }
  cancel() {
    const path = '/work-request-tracker';
    this.router.navigate([path]);
  }
  onFormValuesChanged() {
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

  getWorkCategory(orgId?) {
    this.workRequestService.getWorkConfig(`filter[_organisationId]=${this.orgId}`)
      .pipe().subscribe(res => {
        console.log(res, 'getWorkCategory')
        if (res.length) {
          this.workCategory = res[0].configValues;
        }
      }, (error: any) => {
        // TODO add error component
        console.error('error', error);
      });
  }

}
