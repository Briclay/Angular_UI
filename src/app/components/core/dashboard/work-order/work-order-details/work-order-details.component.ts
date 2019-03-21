import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import * as _ from 'lodash';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { WorkOrderService } from '../work-order.service';
import { WorkRequestService } from '../../work-request/work-request.service';
import { OrganisationService } from '../../organisation/organisation.service';
import { ProjectService } from '../../projects/project.service';
import { UserService } from '../../user/user.service';
import {merge as observableMerge, Subject} from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-work-order-details',
  templateUrl: './work-order-details.component.html',
  styleUrls: ['./work-order-details.component.scss']
})
export class WorkOrderDetailsComponent implements OnInit {
  @Input() formType: string;
  @Input() data: any;
  form: FormGroup;
  formErrors: any;
  userAuth: any;
  initiatedDate: Date;
  orderTrackerFormErrors: any;
  orderTrackerForm: FormGroup;
  status: any;
  requestTrackerList: any;
  projectName: string;
  orgCode: string;
  projectCode: string;
  orderList: any;
  workList: any;
  orgId: string;
  enableTypeOfConsultant = false;
  private unsubscribe: Subject<any> = new Subject();
  constructor(private formBuilder: FormBuilder,
    private workOrderService: WorkOrderService,
    private workRequestService: WorkRequestService,
    private organisationService: OrganisationService,
    private projectService: ProjectService,
    private userService : UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.initiatedDate = (new Date());
    this.orderTrackerFormErrors = {
      _workOrderId: {},
      _organisationId: {},
      orderDate : {},
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
      totalValue: {},
      remark:{},
      typeOfConsultant : {}
    };
    this.orderTrackerForm = this.formBuilder.group({
      _organisationId: this.orgId,
      _projectId: [Validators.required],
      _workRequest: ['', Validators.required],
      _workOrderId: [''],
      orderDate : new FormControl((new Date())),
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
      remark: [''],
      status: 'In Progress',
      totalValue: [''],
      date: new FormControl((new Date())),
      typeOfConsultant : ['']
    });

    let orgDetails = JSON.parse(window.localStorage.authUserOrganisation);
    this.orgId = orgDetails._id
  }

  ngOnInit() {
    this.assignValuesToForm();
    this.getAllWorkRequest();
  }

  public ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  selectWorkRequest() {
    this.genrateFullRefNumber();
    if (this.orderTrackerForm.value.workRequestList) {
      let projName = "";
      let userName = "";
      this.projectService.getSingleProjects(this.orderTrackerForm.value.workRequestList._projectId)
      .pipe().subscribe(res => {
        projName = res.name;
        this.userService.getSingleUser(this.orderTrackerForm.value.workRequestList._assignedId)
          .pipe().subscribe(res => {
            userName = res.username;
          if(projName !== "" || userName !== ""){
            this.orderTrackerForm.controls['projectName'].setValue(projName);
            this.orderTrackerForm.controls['assignedUser'].setValue(userName);
            this.orderTrackerForm.controls['typeOfWork'].setValue(this.orderTrackerForm.value.workRequestList.typeOfWork);
            this.orderTrackerForm.controls['documentStatus'].setValue(this.orderTrackerForm.value.workRequestList.documentStatus);
            this.orderTrackerForm.controls['workRequestStatus'].setValue(this.orderTrackerForm.value.workRequestList.status);
            this.orderTrackerForm.controls['workDescription'].setValue(this.orderTrackerForm.value.workRequestList.workDescription);
            this.orderTrackerForm.controls['workOrderPutDate'].setValue(this.orderTrackerForm.value.workRequestList.workOrderPutDate);
            this.orderTrackerForm.controls['workOrderApprovalDate'].setValue(this.orderTrackerForm.value.workRequestList.workOrderApprovalDate);
            this.orderTrackerForm.controls['awardedDate'].setValue(this.orderTrackerForm.value.workRequestList.awardedDate);
            /*this for form data*/
            this.orderTrackerForm.controls['_workRequest'].setValue(this.orderTrackerForm.value.workRequestList._id);
            this.orderTrackerForm.controls['_projectId'].setValue(this.orderTrackerForm.value.workRequestList._projectId);
            }
          })
        })
    }
      /*this is for displya data*/
  }
  createOrderId(number) {
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
    this.workOrderService.getWorkOrder('filter[_organisationId]=' + this.orgId)
      .pipe().subscribe(res => {
        this.orderList = res;
        this.orderTrackerForm.controls['_workOrderId'].setValue('A' + this.createOrderId(res.length + 1));
        this.workList = [];
        let countCheck = 0;
        // to task for future
        for (let i = 0; i < this.requestTrackerList.length; i++) {
          countCheck = 0;

          for (let j = 0; j < this.orderList.length; j++) {
            if (_.isEqual(this.requestTrackerList[i].requestNumber, this.orderList[j]._workRequestId.requestNumber)) {
              countCheck = 1;
              break;
            }
          }
          if (countCheck === 0) {
            this.workList.push(this.requestTrackerList[i]);
          }
        }
        // });
      }, (error: any) => {
        // TODO add error component
        console.error('error', error);
      });
  }
  getOrgCode() {
    this.organisationService.getOneOrg(this.orgId)
      .pipe().subscribe(res => {
        console.log('res' + JSON.stringify(res));
        let orgModifiedCode = res.orgCode.substr(0, res.orgCode.indexOf('-')); 
        this.orgCode = orgModifiedCode;
        this.getDate(this.orgCode);
      }, (error: any) => {
        console.error('error', error);
      });
  }
  getProjectCode(orgCode, date) {
    let reuquetNumber;
    if (!_.isUndefined(this.requestTrackerList) && !_.isEmpty(this.requestTrackerList)) {
      reuquetNumber = this.requestTrackerList[0].requestNumber;
    }
    console.log('orgCode' + orgCode);
    console.log('date' + date);
    console.log('reuquetNumber' + reuquetNumber);
    console.log('reuquetNumber' + reuquetNumber);
    let refNumber = orgCode + '/' + date + '/' + reuquetNumber + '/';
    this.projectService.getSingleProjects(this.orderTrackerForm.value.workRequestList._projectId)
      .pipe().subscribe(res => {
        console.log('res.projectCode' + res.projectCode);
        // tslint:disable-next-line:max-line-length
        this.orderTrackerForm.controls['workOrderFullRefNumber'].setValue(refNumber = refNumber + res.projectCode + '-' + this.createOrderId(this.orderList.length) + '/' + this.orderTrackerForm.value._workOrderId);
      }, (error: any) => {
        console.log('error', error);
        this.orderTrackerForm.controls['workOrderFullRefNumber'].setValue(refNumber);
      });
  }
  getDate(orgCode) {
    let cuurentYear, preYear;
    const month = parseInt(this.initiatedDate.getMonth().toString());
    const year = parseInt(this.initiatedDate.getFullYear().toString());
    if (month > 3) {
      cuurentYear = year + 1;
      preYear = year;
    } else {
      cuurentYear = year;
      preYear = year - 1;
    }
    this.getProjectCode(orgCode, ((this.getSubString(preYear, 2, 4)) + '-' + this.getSubString(cuurentYear, 2, 4)));
  }
  genrateFullRefNumber() {
    this.getOrgCode();
  }
  getSubString(str, pos1, pos2) {
    return str.toString().substring(pos1, pos2);
  }
  assignValuesToForm() {
    if (this.formType !== 'create') {
      this.orderTrackerForm.patchValue(this.data);
      if(this.data.typeOfWork = 'Appointment of Consultant'){
        this.enableTypeOfConsultant = true;
      }
    }
  }
  getAllWorkRequest() {
    // get all work request for calculting request number
    this.workRequestService.getWorkRequest(`filter[_organisationId]=` + this.orgId)
      .pipe().subscribe(res => {
        this.requestTrackerList = res;
        this.getAllWorkOrder();
      }, (error: any) => {
        // TODO add error component
        console.error('error', error);
      });
  }

  onOrderFormSubmit() {
    console.log('this.orderTrackerForm.value' + JSON.stringify(this.orderTrackerForm.value));
    if (this.orderTrackerForm.valid) {
      this.workOrderService.save(this.orderTrackerForm.value)
        .pipe().subscribe(res => {
          console.log('res', res);
        }, (error: any) => {
          console.log('error', error);
        });
    } else {
      console.log('invliad form');
    }
  }
  cancel() {
    const path = '/work-order-tracker';
  }
}
