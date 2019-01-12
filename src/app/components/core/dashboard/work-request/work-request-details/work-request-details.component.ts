import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';
import { MatDialog } from '@angular/material';
import {WorkRequestService} from '../work-request.service';
import {UserService} from '../../../../../services/user/user.service';
import {ProjectService} from '../../../dashboard/projects/project.service';
import {DateUtils} from '../../../../../utils/date-uitls';

@Component({
  selector: 'app-work-request-details',
  templateUrl: './work-request-details.component.html',
  styleUrls: ['./work-request-details.component.scss']
})
export class WorkRequestDetailsComponent implements OnInit {
  @Input() formType: string;
  @Input() data: any;
  @Output() public tabSwitch: EventEmitter<any> = new EventEmitter<any>();
  form: FormGroup;
  formErrors: any;
  workTrackerFormErrors: any;
  userAuth: any;
  workTrackerForm: FormGroup;
  workCategory: any;
  typeOfWork: any;
  requestTrcakerList: any;
  reuqestNumber: String;
  projectsList: any;
  userList: any;
  todayDate: String;
  status: any;
  leadDateTime = (new Date());
  needByDate = (new Date());
  time = {
    timeToComplete: null,
    leadDaysToComplete: null,
    leadDuration: null
  }
  orgId: string;
  isLoading: boolean;
  constructor(private formBuilder: FormBuilder, 
    private router: Router,  
    private route: ActivatedRoute, 
    public dialog: MatDialog,
    private projectService: ProjectService,
    private workRequestService: WorkRequestService,
    private userService: UserService) {
    //get org id for superadmin
    this.route.queryParams.subscribe(params => {
      this.orgId = params['orgId']
    });
    this.todayDate = (new Date()).toISOString();
    
    //list of typ of work
    this.typeOfWork = ["Contractor Appointement", "Termination order"];


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
      leadDuration: {},
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
      awardDate: {}
    };


    this.workTrackerForm = this.formBuilder.group({
      _organisationId: '5a5844cd734d1d61613f7066',
      _projectId: ['5a5844cd734d1d61613f7066', Validators.required],
      requestNumber: this.reuqestNumber,
      status: 'Open',
      date: new FormControl((new Date())),
      _assignedId: null,
      workDescription: ['', Validators.required],
      typeOfWork: ['', Validators.required],
      workCategory: ['', Validators.required],
      leadDuration: ['', Validators.required],
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
      workOrderApprovalDate: ['']
    });
  }
  noOfDays() {
    this.workTrackerForm.controls['leadDuration'].setValue(this.workTrackerForm.value.workCategory.noOfDays);
  }
  
  ngOnInit() {
    this.assignValuesToForm()
    this.getAllProjectsList();
    this.getAllWorkRequestTracker();
    this.getUsers();
    this.getWorkCategory(`filter[_organisationId]=5a5844cd734d1d61613f7066`);
  }

  assignValuesToForm() {
    if(this.formType !== 'create') {
      this.workTrackerForm.patchValue(this.data)
    }
  }

  getAllProjectsList() {
    //get all project
    this.projectService.getProjects(`filter[_organisationId]=5a5844cd734d1d61613f7066`)
      .pipe().subscribe(res => {
        this.projectsList = res.data;
          if (this.projectsList.length <= 0) {
            //TODO add error component
            console.error('No projects found')
          }
      }, (error: any) => {
        //TODO add error component
        console.error('error', error)
      });
  }

  getAllWorkRequestTracker() {
    //get all work request for calculting request number
    this.workRequestService.getWorkRequest(`filter[_organisationId]=5a5844cd734d1d61613f7066`)
      .pipe().subscribe(res => {
        this.requestTrcakerList = res;
        if( this.formType !== 'create' ) {
          this.reuqestNumber = this.data.requestNumber;
        } else {
          this.reuqestNumber =  `R${this.createRequestNumber(this.requestTrcakerList.length + 1)}`;
        }
        this.workTrackerForm.controls['requestNumber'].setValue(this.reuqestNumber);
      }, (error: any) => {
        //TODO add error component
        console.error('error', error)
      });
  }
  workTrackerFormSubmit() {
    if (this.workTrackerForm.valid) {
      if (this.workTrackerForm.value.initiatedDate && this.workTrackerForm.value.RFAapprovalDate) {
        if (this.workTrackerForm.value.initiatedDate < this.workTrackerForm.value.RFAapprovalDate) {
          this.onSave();
        } else {
        }
      } else {
        this.onSave();
      }
    } else {
    }
  }

  getUsers() {
    this.userService.getUser()
      .pipe().subscribe(res => {
        this.userList = res.data;
      }, (error: any) => {
        //TODO add error component
        console.error('error', error)
      });
  }

  saveWorkRequest(requestData) {
    this.isLoading = true;
    this.workRequestService.saveWorkRequest(requestData)
      .pipe().subscribe(res => {
        this.isLoading = false;
        this.tabSwitch.emit(0);
        this.workTrackerForm.reset()
      }, (error: any) => {
        //TODO add error component
        console.error('error', error);
        this.isLoading = false;
      });
  }

  updateWorkRequest(requestData) {
    requestData = {...requestData, needByDate: this.data.needByDate}
    this.isLoading = true;
    this.workRequestService.updateWorkRequest(requestData, this.data._id)
      .pipe().subscribe(res => {
        console.log('updateWorkRequest saved', res);
        this.isLoading = false;
        
      }, (error: any) => {
        //TODO add error component
        console.error('error', error);
        this.isLoading = false;
      });
  }

  onSave() {
    const requestData = { ...this.workTrackerForm.value, 
      workCategory: this.workTrackerForm.value.workCategory.name,
      leadTimeRequire: this.workTrackerForm.value.leadDuration }
      console.log('requestData', requestData)
      this.formType !== 'create' ? this.updateWorkRequest(requestData) : this.saveWorkRequest(requestData)
    
  }
  /* Open dailog for reason */

  calLeadDaysToComplete() {
    // if (this.workTrackerForm.value.date <= this.workTrackerForm.value.needByDate) {
    if (this.workTrackerForm.value.leadDuration) {
      let dateOffset = (24 * 60 * 60 * 1000) * this.workTrackerForm.value.leadDuration;
      let need_date = this.workTrackerForm.value.needByDate.getTime() - dateOffset;
      this.workTrackerForm.value.needByDate.setTime(need_date);
      var timeDiff = this.workTrackerForm.value.needByDate.getTime() - this.workTrackerForm.value.date.getTime();
      var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
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
        var timeDiff = Math.abs(this.workTrackerForm.value.initiatedDate.getTime() - this.workTrackerForm.value.RFAapprovalDate.getTime());
        var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
        this.workTrackerForm.controls['timeToComplete'].setValue(diffDays);
        this.time.timeToComplete = diffDays;

      } else {
      }
    }
  }
  calLeadTimeComplete() {
    if (this.workTrackerForm.value.date && this.workTrackerForm.value.needByDate && this.workTrackerForm.value.leadDuration) {
      this.leadDateTime.setDate(this.workTrackerForm.value.date.getDate() + this.workTrackerForm.value.leadDuration);
      this.needByDate.setDate(this.workTrackerForm.value.needByDate.getDate() - this.workTrackerForm.value.leadDuration);
      if (this.leadDateTime > this.needByDate) {
        this.workTrackerForm.controls['leadDaysToComplete'].setValue(this.leadDateTime);
      } else {
        this.workTrackerForm.controls['leadDaysToComplete'].setValue(this.needByDate);
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
  cancel() {
    const path = '/work-request-tracker'
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

  getWorkCategory(orgId) {
    this.workRequestService.getWorkCategory(orgId)
      .pipe().subscribe(res => {
        this.workCategory = res[0].configValues
      }, (error: any) => {
        //TODO add error component
        console.error('error', error)
      });

  }
 
}
