import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';

@Component({
  selector: 'app-work-order-details',
  templateUrl: './work-order-details.component.html',
  styleUrls: ['./work-order-details.component.scss']
})
export class WorkOrderDetailsComponent implements OnInit {
  form: FormGroup;
  formErrors: any;
  userAuth: any;
  initiatedDate: Date;
  orderTrackerFormErrors: any;
  orderTrackerForm: FormGroup;
  status: any;
  requestTrcakerList: any;
  projectName: string;
  orgCode: string;
  projectCode: string;
  orderList: any;
  workList: any;
  constructor(private formBuilder: FormBuilder) {
    this.initiatedDate = (new Date());
    this.getAllWorkRequest();
    this.orderTrackerFormErrors = {
      _workOrderId: {},
      _organisationId: {},
      _projectId: {},
      _workRequest: {},
      typeOfWork: {},
      workOrderNumber: {},
      awardedDate: {},
      workOrderFullRefNumber: {},
      workRequestList: {},
      nameOfAgency: {},
      projectName: {},
      workOrderPutDate: {},
      workOrderApprovalDate: {},
      status: {},
      date: {},
      totalValue: {}
    }
    this.orderTrackerForm = this.formBuilder.group({
      _organisationId: '5a5844cd734d1d61613f7066',
      _projectId: ['5a5844cd734d1d61613f7066', Validators.required],
      _workRequest: ['', Validators.required],
      _workOrderId: [''],
      workOrderNumber: [''],
      projectName: [''],
      assignedUser: [''],
      typeOfWork: [''],
      documentStatus: [''],
      workRequestStatus: [''],
      workDescription: [''],
      workOrderPutDate: [''],
      workOrderApprovalDate: [''],
      awardedDate: [''],
      _assignedId: [''],
      workOrderFullRefNumber: ['', Validators.required],
      workRequestList: [''],
      nameOfAgency: [''],
      status: 'In Progress',
      totalValue: [''],
      date: new FormControl((new Date()))
    });
  }
  selectWorkRequest() {
    this.genrateFullRefNumber();
    if (this.orderTrackerForm.value.workRequestList) {
      /*this is for displya data*/
      this.orderTrackerForm.controls['projectName'].setValue(this.orderTrackerForm.value.workRequestList._projectId.name);
      this.orderTrackerForm.controls['assignedUser'].setValue(this.orderTrackerForm.value.workRequestList._assignedId.username);
      this.orderTrackerForm.controls['typeOfWork'].setValue(this.orderTrackerForm.value.workRequestList.typeOfWork);
      this.orderTrackerForm.controls['documentStatus'].setValue(this.orderTrackerForm.value.workRequestList.documentStatus);
      this.orderTrackerForm.controls['workRequestStatus'].setValue(this.orderTrackerForm.value.workRequestList.status);
      this.orderTrackerForm.controls['workDescription'].setValue(this.orderTrackerForm.value.workRequestList.workDescription);
      this.orderTrackerForm.controls['workOrderPutDate'].setValue(this.orderTrackerForm.value.workRequestList.workOrderPutDate);
      this.orderTrackerForm.controls['workOrderApprovalDate'].setValue(this.orderTrackerForm.value.workRequestList.workOrderApprovalDate);
      this.orderTrackerForm.controls['awardedDate'].setValue(this.orderTrackerForm.value.workRequestList.awardedDate);
      /*this for form data*/
      this.orderTrackerForm.controls['_workRequest'].setValue(this.orderTrackerForm.value.workRequestList._id);
      this.orderTrackerForm.controls['_projectId'].setValue(this.orderTrackerForm.value.workRequestList._projectId._id);
    }
  }
  createOrderId(number) {
    var str = '' + number;
    var count = 0;
    var padArray = [{ len: 1, size: 3 }, { len: 2, size: 2 }, { len: 3, size: 1 }, { len: 4, size: 0 }]
    var findSize = _.find(padArray, function (item) {
      return item.len === str.length;
    });
    while (count < findSize.size) {
      str = '0' + str;
      count++;
    }
    return str;
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
  getAllWorkOrder() {
    // this.orderTrackerService.getAll('filter[_organisationId]=' + this.userAuth.organisation._id)
    //   .then((response: any) => {
    //     this.orderList = response.data;
    //     this.orderTrackerForm.controls['_workOrderId'].setValue("A" + this.createOrderId(response.data.length + 1));
    //     this.workList = [];
    //     var countCheck = 0;
    //     // this.workList = _.differenceWith(this.requestTrcakerList, this.orderList, _.isEqual);
    //     //_.forEach(this.requestTrcakerList,function(value){

    //     // this is not valid solution please check valid solution fot that (to do task)
    //     // to task for future
    //     console.log('requestTrcakerList' + JSON.stringify(this.requestTrcakerList));
    //     console.log('orderList' + JSON.stringify(this.orderList));
    //     for (var i = 0; i < this.requestTrcakerList.length; i++) {
    //       countCheck = 0;
    //       for (var j = 0; j < this.orderList.length; j++) {
    //         if (_.isEqual(this.requestTrcakerList[i].requestNumber, this.orderList[j]._workRequest.requestNumber)) {
    //           countCheck = 1;
    //           break;
    //         }
    //       }
    //       if (countCheck == 0) {
    //         this.workList.push(this.requestTrcakerList[i]);
    //       }
    //     }
    //     console.log('workList' + JSON.stringify(this.workList));
    //     // });
    //   }, (error: any) => {
    //     throw new MatkraftError(error.error.error.message);
    //   });
  }
  getOrgCode() {
    // this.organisationService.getOne(this.userAuth.organisation._id)
    //   .then((response: any) => {
    //     this.orgCode = response.data.orgCode;
    //     this.getDate(this.orgCode);
    //   }, (error: any) => {
    //     throw new MatkraftError(error.error.error.message);
    //   });
  }
  getProjectCode(orgCode, date) {
    var reuquetNumber;
    if (!_.isUndefined(this.requestTrcakerList) && !_.isEmpty(this.requestTrcakerList)) {
      reuquetNumber = this.requestTrcakerList[0].requestNumber;
    }
    // this.projectsService.getOne(this.orderTrackerForm.value.workRequestList._projectId._id)
    //   .then((response: any) => {
    //     this.orderTrackerForm.controls['workOrderFullRefNumber'].setValue(orgCode + "/" + date + "/" + reuquetNumber + "/" + response.projectCode + "-" + this.createOrderId(this.orderList.length) + "/" + this.orderTrackerForm.value._workOrderId);
    //   }, (error: any) => {
    //     throw new MatkraftError(error.error.error.message);
    //   });
  }
  getDate(orgCode) {
    var cuurentYear, preYear;
    var month = parseInt(this.initiatedDate.getMonth().toString());
    var year = parseInt(this.initiatedDate.getFullYear().toString());
    if (month > 3) {
      cuurentYear = year + 1;
      preYear = year;
    } else {
      cuurentYear = year;
      preYear = year - 1;
    }
    this.getProjectCode(orgCode, ((this.getSubString(preYear, 2, 4)) + "-" + this.getSubString(cuurentYear, 2, 4)));
  }
  genrateFullRefNumber() {
    this.getOrgCode()
  }
  getSubString(str, pos1, pos2) {
    return str.toString().substring(pos1, pos2);
  }
  getAllWorkRequest() {
    // this.requestTrackerService.getAll('filter[_organisationId]=' + this.userAuth.organisation._id + '&filter[status]=OrderTracker')
    //   .then((response: any) => {
    //     this.requestTrcakerList = response.data;
    //     /*call work order tracker*/
    //     this.getAllWorkOrder();
    //   }, (error: any) => {
    //     throw new MatkraftError(error.error.error.message);
    //   });
  }
  onOrderFormSubmit() {
    // if (this.orderTrackerForm.valid) {
    //   this.orderTrackerService.save(this.orderTrackerForm.value)
    //     .then((response: any) => {
    //       // toasty message
    //       const toastOptions: ToastOptions = {
    //         title: 'Success',
    //         msg: response.message
    //       };
    //       this.toastyService.success(toastOptions);
    //       const path = '/work-order-tracker'
    //       // route to work request list
    //       this.router.navigate([path]);
    //     }, (error: any) => {
    //       throw new MatkraftError(error.error.error.message);
    //     });
    // } else {
    //   throw new MatkraftError('Fill Mandatory Field');
    // }
  }
  cancel() {
    const path = '/work-order-tracker';
  }
  ngOnInit() { }

}
