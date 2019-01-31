import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ProjectDatesComponent } from '../project-dates/project-dates.component';
import { ProjectDetailsComponent } from '../project-details/project-details.component';
import { ProjectPhasesComponent } from '../project-phases/project-phases.component';
import { ProjectTeamsComponent } from '../project-teams/project-teams.component';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { ProjectService } from '../project.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FileManagerService } from '../../file-manager/file-manager.service';
import { AuthService } from '../../../../../services/auth.service';
import * as _ from 'lodash';


@Component({
  selector: 'app-project-create',
  templateUrl: './project-create.component.html',
  styleUrls: ['./project-create.component.scss']
})
export class ProjectCreateComponent implements OnInit {
  form: FormGroup;
  formErrors: any;
  projectFormErrors: any;
  userAuth: any;
  projectForm: FormGroup;
  projectCount: number;
  imageArray = [];
  orgId: string;
  units: any;
  dates: any;
  team: any;
  details: any;
  projectType = ['RESIDENTIAL', 'COMMERCIAL', 'MIXED DEVELOPMENT', 'VILLA PROJECTS'];  
  constructor(
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
    private projectService: ProjectService,
    private fileManagerService: FileManagerService,
    private http: HttpClient,
    private auth: AuthService

  ) {
    var org=JSON.parse(window.localStorage.authUserOrganisation);
    var tempOrg =  org._id;
    this.orgId = tempOrg;
    this.projectForm = this.formBuilder.group({
      _organisationId: tempOrg,
      name: ['', Validators.required],
      projectCode: ['', Validators.required],
      description: [''],
      units: [''],
      status:"OPEN",
      type: [''],
      beginDate: [''],
      completionDate: [''],
      phases: this.formBuilder.array([]),
      imageUrls: [''],
      _teamMembers: [''],
      carParkingArea: [''],
      projectDetails: this.formBuilder.group({
        location: [''],
        blocks: [''],
        landArea: [''],
        carpetarea: [''],
        saleArea: [''],
        crmTeam: [''],
        totalUnit: [''],
        budget: ['']
      })
    });
    this.getAllProjects(tempOrg);
  }

  ngOnInit() {
  }
  //open date dailogs
  openDateDialog() {
    let dialogRef = this.dialog.open(ProjectDatesComponent, {
      width: '600px',
      data: {}
    }).afterClosed()
      .subscribe(response => {
        console.log('res', response);
        if (response) {
          //this.projectForm.value.beginDate = response.beginDate;
          //this.projectForm.value.completionDate = response.completionDate
          this.projectForm.controls['beginDate'].setValue(response.beginDate);
          this.projectForm.controls['completionDate'].setValue(response.completionDate);
        }
      });
  }
  //open Phases dailogs
  openPhaseDialog() {
    let dialogRef = this.dialog.open(ProjectPhasesComponent, {
      width: '600px',
      data: {}
    }).afterClosed()
      .subscribe(response => {
        console.log('res', response);
      });
  }
  //open Team dailogs
  openTeamDialog() {
    let dialogRef = this.dialog.open(ProjectTeamsComponent, {
      width: '600px',
      data: {}
    }).afterClosed()
      .subscribe(response => {
        console.log('res', response);
        if (response) {
          // this.projectForm.value._teamMembers = response.teamMembers
          this.projectForm.controls['_teamMembers'].setValue(response._teamMembers);
        }
      });
  }
  //open Details dailogs
  openDetailsDialog() {
    let dialogRef = this.dialog.open(ProjectDetailsComponent, {
      width: '600px',
      data: {}
    }).afterClosed()
      .subscribe(response => {
        if (response) {
          console.log('res', response);
          this.projectForm.controls['units'].setValue(response.units);
          this.projectForm.controls['carParkingArea'].setValue(response.carParkingArea);
          this.projectForm.controls['type'].setValue(response.type);
          //this.projectForm.controls['units'].setValue(response.landArea);

          /* this.projectForm.value.units = response.units;
           this.projectForm.value.carParkingArea = response.carParkingArea
           this.projectForm.value.type = response.type
           this.projectForm.value.projectDetails.landArea = response.landArea*/
          console.log(' this.projectForm.value' + JSON.stringify(this.projectForm.value));
        }
      });
  }
  /*generateProjectCode(str: string, count: number) {
    let name = this.projectForm.value.name;
    if (name) {
      var arrName = name.split(' ');
      var sortName = '';
      arrName.forEach((value: any) => {
        sortName += value.slice(0, 1);
      })
      let str = sortName.toUpperCase() + '-' + this.projectCount;
      //return str;
      this.projectForm.controls['projectCode'].setValue(str);
      //  this.projectId = str;
    }
  }*/
  generateProjectCode() {
    let name = this.projectForm.value.name;
    if (name) {
      var arrName = name.split(' ');
      var sortName = '';
      arrName.forEach((value: any) => {
        sortName += value.slice(0, 1);
      })
      let str = sortName.toUpperCase() + '-' + this.projectCount;
      //return str;
      this.projectForm.controls['projectCode'].setValue(str);
      //  this.projectId = str;
    }
  }
  getAllProjects(orgId: string) {
    this.projectService.getProjects(orgId)
      .pipe().subscribe(res => {
        console.log('user nres', res);
        this.projectCount = res.length;
      }, (error: any) => {
        console.error('error', error);
      })
  }
  onSubmit() {
    this.projectForm.value.imageUrls = this.imageArray;
    // this.projectForm.value.phases = [];
     if( _.isUndefined(this.projectForm.value._teamMembers) || _.isEmpty(this.projectForm.value._teamMembers)){
       this.projectForm.value._teamMembers = [];
    }
    if( _.isUndefined(this.projectForm.value.carParkingArea) || _.isEmpty(this.projectForm.value.carParkingArea)){
      this.projectForm.value.carParkingArea = [];
   }
    console.log('this.projectForm ' + JSON.stringify(this.projectForm.value));
    this.projectService.save(this.projectForm.value)
      .pipe().subscribe(res => {
        console.log('on save projec', res);
      }, (error: any) => {
        console.error('error', error);
    })
  }
  onFileInput(event, fileList?) {
    let reader = new FileReader()
    if (event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      reader.readAsDataURL(file);
      let fileExt = file.name.split(".");
      let fileName = (new Date().getTime()) + "." + fileExt[fileExt.length - 1];
      this.fileManagerService.getS3Url('file-name=' + fileName + '&file-type=' + file.type + '&_organisationId=' + this.orgId)
        .pipe().subscribe(res => {
          let json = {
            savedFileName: fileName
          };
          this.saveOnS3(res, file, json);
        }, (error: any) => {
        });
    } else {
      console.log('false');
    }
  }
  saveOnS3(response: any, file, body: any) {
    this.http.put(response.signedRequest, file, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    }).subscribe((awsRes: any) => {
      var path = 'https://s3.ap-south-1.amazonaws.com/' + this.orgId + '/' + body.savedFileName;
      console.log('path ' + path);
      this.selectedImagArra(path);
      //this.getAssingedUser(json);
    }, (error: any) => {
      console.log('erro' + JSON.stringify(error));
    });
  }
  selectedImagArra(value: string) {
    console.log('value', value);
    this.imageArray.push(value);
  }
 
}
