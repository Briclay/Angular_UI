 import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
 import {FileManagerService} from '../../../../components/core/dashboard/file-manager/file-manager.service';
 import {UserService} from '../../../../components/core/dashboard/user/user.service';
 import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
 import { HttpClient, HttpHeaders } from '@angular/common/http';
 import { MatDialog,  MatSnackBar ,MAT_DIALOG_DATA } from '@angular/material';
 import { ProjectService } from '../../../../components/core/dashboard/projects/project.service';
 import {merge as observableMerge, Subject} from 'rxjs';
 import { Router, ActivatedRoute } from '@angular/router';
 import {takeUntil} from 'rxjs/operators';

 @Component({
  selector: 'app-design-dashboard',
  templateUrl: './design-dashboard.component.html',
  styleUrls: ['./design-dashboard.component.scss']
})
 export class DesignDashboardComponent implements OnInit {
  @Input() data: any;
  @Input() formType: string;
  
  organizations: any;
  designDashForm: FormGroup;
  projectForm: FormGroup;
  orgID: string;
  userAuth : any;
  profileImageUrl = "";
  user: any;
  userId : any;
  userName: any;
  roleName: any;
  isLoading : boolean;
  usrType : any;
  selectedOrgId : any;  
  projects : any;
  projectSelected = false;
  selectedProjectData : any;
  projectConsultants =[];
  unitsArray =[];
  userDeppartment : any;
  clickedProjectName: any;
  analyticResponseCheck = false;
  projectTypes =[]
  intiallTypes =  [ 'Architecture', 'Structural','PHE', 'Electrical','Fire',
  'HVAC','Interiors'];
  analyticsLoading  = false;
  private unsubscribe: Subject<any> = new Subject();

  constructor(
    private fileManagerService: FileManagerService,
    private projectService : ProjectService,
    private formBuilder : FormBuilder,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private userService : UserService,
    private snackBar : MatSnackBar) {    

    this.user = JSON.parse(window.localStorage.getItem('authUser')); 
    this.userId = this.user._id;
    this.usrType = this.user.userType;
    this.userName = this.user.displayName;
    this.roleName = this.user._roleId.name;
    this.profileImageUrl = this.user.profileImageUrl ? this.user.profileImageUrl : "./assets/images/avatars/profile.jpg";
    this.userAuth = JSON.parse(window.localStorage.getItem('authUserOrganisation'));
    let dep = JSON.parse(window.localStorage.getItem('authUserDepartment'));
    this.userDeppartment = dep._id;
    this.orgID = this.userAuth._id;
    this.selectedOrgId = this.orgID
  }

  ngOnInit() {
    this.projectForm = this.formBuilder.group({
      units: this.formBuilder.array([]),
      phases: this.formBuilder.array([]),
      _teamMembers: this.formBuilder.array([]),
      carParkingArea: this.formBuilder.array([]),
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
    this.getProjects();
  }
  getProjects() {
    this.projectService.getProjects(this.selectedOrgId).pipe().subscribe(res => {
      console.log('res', res);
      this.projects = res;
    }, (error: any) => {
      console.error('error', error);
    });
  }

  selectSingleProject(proj){
    this.projectTypes = []
    if(this.analyticsLoading === false){
      console.log(proj, "selected poject data")
      this.projectSelected = true;
      this.selectedProjectData = proj;
      console.log(proj,"dddddddddddddd")
      this.clickedProjectName = proj.name;
      this.projectConsultants = this.selectedProjectData._consultants;
      this.unitsArray = this.selectedProjectData.units;
      this.getAllAnalytics()
    }
  }

  getAllAnalytics (){
    this.analyticsLoading = true;
    let filter = `filter[_projectId]=${this.selectedProjectData._id}&filter[_departmentId]=${this.userDeppartment}&filter[_organisationId]=${this.orgID}&filter[name]=${this.clickedProjectName}`
    this.fileManagerService.getAnalytics(filter)
    .pipe().subscribe(res => {
      this.analyticsLoading = false;
      this.intiallTypes.forEach(ty => {
        res.length > 0 && res.forEach(v => {
          if(ty === v.name){
            this.projectTypes.push(v)
          }
        })
      })
      console.log(res, 'getAllAnalytics')
    }, (error: any) => {
     this.snackBar.open(error.message, 'error', {
      duration: 5000,
    });
     console.log(error)
   });
  }

  onFileInput(event, fileList?) {
    let reader = new FileReader()
    if (event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      reader.readAsDataURL(file);
      let fileExt = file.name.split(".");
      let fileName = (new Date().getTime()) + "." + fileExt[fileExt.length - 1];

      this.fileManagerService.getS3Url(`file-name=${fileName}&file-type=${file.type}&_organisationId=${this.orgID}`)
      .pipe().subscribe(res => {
        let json = {
          savedFileName: fileName,
          _organisationId: this.orgID,
          name: file.name,
          type: 'file',
          fileExt: fileExt[fileExt.length - 1],
          path: res.url,
          size: file.size,
          message: "File uploaded by ",
          details: "file original name is " + file.name
        };
        this.saveOnS3(res, file, json)
      }, (error: any) => {
       this.snackBar.open(error.message, 'error', {
        duration: 5000,
      });
       console.log(error)
     });
    } else {
      console.log('false');
    }
  }

  saveOnS3(response: any, file, body: any) {
    this.isLoading = true;
    this.http.put(response.signedRequest, file, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    }).subscribe((awsRes: any) => {
      let filePath = 'https://s3.ap-south-1.amazonaws.com/' + this.orgID + '/' + body.savedFileName;
      //this.designDashForm.controls['profileImageUrl'].setValue(filePath)
      this.profileImageUrl = filePath;
      this.isLoading = false;
      console.log(this.profileImageUrl, "filePath")
      if(this.profileImageUrl !== ""){
        this.onSubmit()
      }
    }, (error: any) => {
      this.snackBar.open(error.message, 'error', {
        duration: 5000,
      });
      console.log(error)
    });
    // this.fileManagerService.saveOnS3(response.signedRequest, file, {
    //   headers: { 'Content-Type': 'application/x-www-form-urlencoded', "Authorization" : JSON.parse(window.localStorage.getItem('authToken')) }
    // }).pipe().subscribe(res => {
    //     this.designDashForm.controls['profileImageUrl'].setValue(res.url)
    //   }, (error: any) => {
    // });
  }
  goToFileManager(){
    console.log("dddddddddddddddd")
    this.router.navigate(['dashboard/file-manager/5c548f8bf231a5447de94eee/5c54900e44f38b4498f8d9fd/5c5496a70923fa3e45bd9b5b'], { queryParams: { projId: this.selectedProjectData._id}, queryParamsHandling: 'merge' });
   // this.router.navigateByUrl('dashboard/file-manager/5c548f8bf231a5447de94eee/5c54900e44f38b4498f8d9fd/5c5496a70923fa3e45bd9b5b?projId=/'+this.selectedProjectData._id);
 }

 onSubmit() {
  let userData = {
    _organisationId : this.orgID,
    profileImageUrl : this.profileImageUrl,
    userType : this.usrType
  }
  this.userService.updateUser(this.userId, userData )
  .pipe().subscribe(res => {
    this.isLoading = false;
    this.snackBar.open("Profile image updated Succesfully", 'User', {
      duration: 5000,
    });
  }, (error: any) => {
    this.isLoading = false;
    this.snackBar.open(error.message, 'User', {
      duration: 5000,
    });
  });
}

}
