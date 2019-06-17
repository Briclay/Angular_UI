import { Component, OnInit, Input,Output,EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import * as _ from 'lodash';
import { MatTableDataSource, MatPaginator, MatSnackBar } from '@angular/material';
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
  @Output() public tabSwitch: EventEmitter<any> = new EventEmitter<any>();
  @Output() public updateRefresh: EventEmitter<any> = new EventEmitter<any>();
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
    private snackBar: MatSnackBar,
    private route: ActivatedRoute
  ) {
    this.initiatedDate = (new Date());
    this.orderTrackerFormErrors = {
      orderNumber: {},
      _organisationId: {},
      orderDate : {},
      _projectId: {},
      _workRequestId: {},
      typeOfWork: {},
      workOrderNumber: {},
      awardedDate: {},
      workOrderFullRefNumber: {},
      workRequest: {},
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
      _workRequestId: ['', Validators.required],
      orderNumber: [''],
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
      workRequest: [''],
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

  assignValuesToForm() {
    if (this.formType !== 'create') {
      this.orderTrackerForm.patchValue(this.data);
      if(this.data.typeOfWork = 'Appointment of Consultant'){
        this.enableTypeOfConsultant = true;
      } 
      let projName = "";
      let userName = "";
      this.workRequestService.getSingleWorkRequest(this.data._workRequestId).pipe().subscribe(res => {
        this.projectService.getSingleProjects(res._projectId)
          .pipe().subscribe(resp => {
            projName = resp.name;
            this.userService.getSingleUser(res._assignedId)
          .pipe().subscribe(response => {
            userName = response.username;
          if(projName !== "" || userName !== ""){
            this.orderTrackerForm.controls['workRequest'].setValue(res.requestNumber);
            this.orderTrackerForm.controls['projectName'].setValue(projName);
            this.orderTrackerForm.controls['assignedUser'].setValue(userName);
            this.orderTrackerForm.controls['typeOfWork'].setValue(res.typeOfWork);
            this.orderTrackerForm.controls['documentStatus'].setValue(res.documentStatus);
            this.orderTrackerForm.controls['workRequestStatus'].setValue(res.status);
            this.orderTrackerForm.controls['workDescription'].setValue(res.workDescription);
            this.orderTrackerForm.controls['workOrderPutDate'].setValue(res.workOrderPutDate);
            this.orderTrackerForm.controls['workOrderApprovalDate'].setValue(res.workOrderApprovalDate);
            this.orderTrackerForm.controls['awardedDate'].setValue(res.awardedDate);
            /*this for form data*/
            this.orderTrackerForm.controls['_workRequestId'].setValue(this.data._workRequestId);
            this.orderTrackerForm.controls['_projectId'].setValue(res._projectId);
            }
          })
        })
      })
    }
  }
  public ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
  selectWorkRequest() {
    this.genrateFullRefNumber();
    if (this.orderTrackerForm.value.workRequest) {
      let projName = "";
      let userName = "";
      this.projectService.getSingleProjects(this.orderTrackerForm.value.workRequest._projectId)
      .pipe().subscribe(res => {
        projName = res.name;
        this.userService.getSingleUser(this.orderTrackerForm.value.workRequest._assignedId)
          .pipe().subscribe(res => {
            userName = res.username;
          if(projName !== "" || userName !== ""){
            this.orderTrackerForm.controls['projectName'].setValue(projName);
            this.orderTrackerForm.controls['assignedUser'].setValue(userName);
            this.orderTrackerForm.controls['typeOfWork'].setValue(this.orderTrackerForm.value.workRequest.typeOfWork);
            this.orderTrackerForm.controls['documentStatus'].setValue(this.orderTrackerForm.value.workRequest.documentStatus);
            this.orderTrackerForm.controls['workRequestStatus'].setValue(this.orderTrackerForm.value.workRequest.status);
            this.orderTrackerForm.controls['workDescription'].setValue(this.orderTrackerForm.value.workRequest.workDescription);
            this.orderTrackerForm.controls['workOrderPutDate'].setValue(this.orderTrackerForm.value.workRequest.workOrderPutDate);
            this.orderTrackerForm.controls['workOrderApprovalDate'].setValue(this.orderTrackerForm.value.workRequest.workOrderApprovalDate);
            this.orderTrackerForm.controls['awardedDate'].setValue(this.orderTrackerForm.value.workRequest.awardedDate);
            /*this for form data*/
            this.orderTrackerForm.controls['_workRequestId'].setValue(this.orderTrackerForm.value.workRequest._id);
            this.orderTrackerForm.controls['_projectId'].setValue(this.orderTrackerForm.value.workRequest._projectId);
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
        this.orderTrackerForm.controls['orderNumber'].setValue('A' + this.createOrderId(res.length + 1));
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
    this.projectService.getSingleProjects(this.orderTrackerForm.value.workRequest._projectId)
      .pipe().subscribe(res => {
        console.log('res.projectCode' + res.projectCode);
        this.orderTrackerForm.controls['workOrderFullRefNumber'].setValue(refNumber = refNumber + res.projectCode + '-' + this.createOrderId(this.orderList.length) + '/' + this.orderTrackerForm.value.orderNumber);
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
    this.orderTrackerForm.value._organisationId = this.orgId;
    console.log('this.orderTrackerForm.value' + JSON.stringify(this.orderTrackerForm.value));
    if(this.formType === 'create' ){
      if (this.orderTrackerForm.valid) {
        this.workOrderService.save(this.orderTrackerForm.value)
          .pipe().subscribe(res => {
            this.snackBar.open("Work-order Created Succesfully", 'Work-order', {
              duration: 3000,
            });
        }, (error: any) => {
          this.snackBar.open(error.message, 'Work-order', {
            duration: 3000,
          });
          console.log('error', error);
        });
      }
    }
    else{
    this.workOrderService.update(this.orderTrackerForm.value, this.data._id)
      .pipe().subscribe(res => {
          this.snackBar.open("Work-order updated Succesfully", 'Work-order', {
            duration: 3000,
          });
        }, (error: any) => {
          this.snackBar.open(error.message, 'Work-order', {
            duration: 3000,
          });
          console.log('error', error);
        });
    } 
  }
}
