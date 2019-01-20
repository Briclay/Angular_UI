import { Component, OnInit, Inject, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ProjectService } from '../project.service';
import * as _ from 'lodash';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss']
})
export class ProjectDetailsComponent implements OnInit {
  @Input() data: any;
  @Input() formType: string;
  @Input() projectListData: any;

  detailsComponentData: any;
  facilityCompoennetData: any;
  phasesComponenetData: any;
  snagsComponenetData: any;
  ProjectTeamComponenetData: any;
  coreCompoennetData: any;
  path: any;
  arrName;
  userAuth: any;
  projectsCount: number;
  sortName;
  projectCode;
  form: FormGroup;
  formErrors: any;
  projectForm: FormGroup;
  projectFormError: any;
  projectFormSubmitted = false;
  projectId: any;
  editFlag: boolean;
  constructionType = ['Pre-Cast', 'Formwork', 'Conventional'];
  progressStatus: string[];
  progressChecked = 'OPEN';
  projectStatus = "UP-COMING";
  showReadOnly = false;
  disableFlag: boolean = false;
  status = [{
      projectStatus: 'UP-COMING',
      progressStatus: ['OPEN', 'LAUNCH']
    },
    {
      projectStatus: 'ON-GOING',
      progressStatus: ['OPEN', 'INPROGRESS', 'HOLD', 'COMPLETE']
    },
    {
      projectStatus: 'COMPLETED',
      progressStatus: ['COMPLETE']
    }
  ]
    constructor(
    private formBuilder: FormBuilder,
    private router: Router) {}

  /*
   *when data object is empty
   *when data object are null
   *means we dailog are open for create mode 
   */
  projectCreate() {
    console.log('data: ', 'projectCreate');
    this.projectForm = this.formBuilder.group({
      _organisationId: '5a5844cd734d1d61613f7066',
      constructionType: ['', Validators.required],
      name: ['', Validators.required],
      projectCode: ['', Validators.required],
      description: ['', Validators.required],
      projectStatus: [''],
      status: ['', Validators.required],
      beginDate: ['', Validators.required],
      completionDate: ['', Validators.required],
      possessionDate: ['', Validators.required],
      projectDetails: [''],
      carParkingArea: [''],
      _consultants: [],
      unitTypes: [''],
      logoImageUrl: [''],
      type: [''],
      milestonesList: [''],
      _facilityTeam: this.formBuilder.array([]),
      _coreTeam: this.formBuilder.array([]),
      _teamMembers: this.formBuilder.array([]),
      phases: this.formBuilder.array([]),
      _snagsFlow: this.formBuilder.array([]),
      _contractors: this.formBuilder.array([])
    });
  }
  /*
   *when data object is not empty
   *when data object is not null
   *means we dailog are open for edit mode 
   */
  projectEdit(data) {
    console.log('data: ', data);

    this.projectCode = data.project.projectCode
    this.projectStatus = data.project.projectDetails.projectStatus;

    this.projectForm = this.formBuilder.group({
      _organisationId: '5a5844cd734d1d61613f7066',
      constructionType: [data.project.constructionType, Validators.required],
      name: [data.project.name, Validators.required],
      projectCode: [data.project.projectCode, Validators.required],
      description: [data.project.description, Validators.required],
      projectStatus: [''],
      type: [data.project.type],
      status: [data.project.status],
      projectDetails: this.formBuilder.group({
         location: data.project.projectDetails.location,
        floorCount: data.project.projectDetails.floorCount,
        unitNumber: data.project.projectDetails.unitNumber,
        towerCount: data.project.projectDetails.towerCount,
        landArea: data.project.projectDetails.landArea,
        carpetarea: data.project.projectDetails.carpetarea,
        saleArea: data.project.projectDetails.saleArea,
        clubHouseCount: data.project.projectDetails.clubHouseCount
      }),
      carParkingArea: this.formBuilder.group({
        carParkingCount: [data.project.carParkingArea.carParkingCount],
        basementParkingCount: [data.project.carParkingArea.basementParkingCount],
        coveredParkingCount: [data.project.carParkingArea.coveredParkingCount],
        surfaceParkingCount: [data.project.carParkingArea.surfaceParkingCount]
      }),
      milestonesList: [data.project.milestonesList],
      unitTypes: [data.project.unitTypes],
      _facilityTeam: [data.project._facilityTeam],
      _coreTeam: [data.project._coreTeam],
      _teamMembers: [data.project._teamMembers],
      phases: [data.project.phases],
      _snagsFlow: [data.project._snagsFlow],
      _contractors: [data.project._contractors],
      beginDate: [data.project.beginDate],
      completionDate: [data.project.completionDate],
      possessionDate: [data.project.possessionDate],
      logoImageUrl: [data.project.logoImageUrl]
    });
    console.log('this.projectForm '+JSON.stringify(this.projectForm.value));

    /*find index of status*/
    var indexOf = _.findIndex(this.status, function(num) {
      return num.projectStatus == data.project.projectDetails.projectStatus
    });
    /*check if index found then bined that row into form details*/
    if (indexOf != -1) {
      this.progressStatus = this.status[indexOf].progressStatus;
      this.projectForm.controls['projectStatus'].setValue(this.status[indexOf]);
    }
  }

  /*for init funcation*/
  ngOnInit() {
    this.projectCreate();
    this.projectForm.valueChanges.subscribe(changes => {});
  }

  /*on select project status change progress status*/
  projectStatusSelected() {
    this.projectStatus = this.projectForm.value.projectStatus.projectStatus;
    this.progressStatus = this.projectForm.value.projectStatus.progressStatus;
    this.projectForm.value.projectDetails.projectStatus = this.projectStatus;

  }
  /*end project status*/
  /*project progress */
  projectProgressSelected() {
    this.progressChecked = this.projectForm.value.status;
    if (this.projectStatus === 'UP-COMING') {
      if (_.isEqual(this.progressChecked, 'OPEN')) {
        this.showReadOnly = false;
      } else {
        this.showReadOnly = true;
      }
    } else {
      this.showReadOnly = true;
    }
  }

  /*project progresss*/
  getAllProjectList() {
    
  }

  generateOrgCode() {
    let name = this.projectForm.value.name;
    console.log('name', name)
    if (name) {
      this.arrName = name.split(' ');
      this.sortName = '';
      this.arrName.forEach((value: any) => {
        this.sortName += value.slice(0, 1);
      })
      let str = this.sortName.toUpperCase() + '-' + this.projectListData.length;
      this.projectForm.controls['projectCode'].setValue(str);
      //  this.projectId = str;
    }
  }

  onCloseCancel() {
    const path = '/projects';
    // route to role list
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
  /*receiing data form detail compoenent*/
  receiveDetailsData($event) {
    this.detailsComponentData = $event
  }
  /*receciving data fform faciltity component */
  receiveFacilityData($event) {
       this.facilityCompoennetData = $event
    }

  /*receciving data from core team component */
  receivecoreData($event) {
    this.coreCompoennetData = $event
  }

  /*receciving data from project team component */
  receiveProjectTeamData($event) {
    this.ProjectTeamComponenetData = $event
  }

  /*receciving data form phase  component */
  receivePhasesData($event) {
    this.phasesComponenetData = $event
  }

  /*receciving data from snga flow component */
  receiveSnagsFlowData($event) {
    this.snagsComponenetData = $event
  }


  onProjectFormSubmit() {
  }

}
