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
  projectConsultances : any[] = [
    {
      "_id": "1",
      "name": "Architect",
      "internaluser" : "Internal User 1",
      "externaluser" : "External User 1"
    },
    {
      "_id": "2",
      "name": "Structural Engg",
      "internaluser" : "Internal User 1",
      "externaluser" : "External User 1"
    },
    {
      "_id": "3",
      "name": "Public Health Engg",
      "internaluser" : "Internal User 1",
      "externaluser" : "External User 1"
    },
    {
      "_id": "4",
      "name": "Fire & Emergency",
      "internaluser" : "Internal User 1",
      "externaluser" : "External User 1"
    },
    {
      "_id": "5",
      "name": "Electrical Engg",
      "internaluser" : "Internal User 1",
      "externaluser" : "External User 1"
    }
  ]

  products : any[] = [
    {
      "_id": "1",
      "bhk": "2 BHK",
      "no" : "100",
      "area" : "1250"
    },
    {
      "_id": "2",
      "bhk": "3 BHK",
      "no" : "140",
      "area" : "1265"
    }
  ]

  projectTypes : any[] =[
    {
      "_id": "1",
      "name": "Land Details",
    },
    {
      "_id": "2",
      "name": "Architecture",
    },
    {
      "_id": "3",
      "name": "Structural",
    },
    {
      "_id": "4",
      "name": "PHE",
    },
    {
      "_id": "5",
      "name": "Electrical",
    },
    {
      "_id": "6",
      "name": "Fire",
    },
    {
      "_id": "7",
      "name": "Interiors",
    },
    {
      "_id": "8",
      "name": "Landscape",
    },
    {
      "_id": "9",
      "name": "NOC",
    },
    {
      "_id": "10",
      "name": "RERA",
    },
    {
      "_id": "11",
      "name": "Area Statement",
    },
    {
      "_id": "12",
      "name": "Specifications",
    },
    {
      "_id": "13",
      "name": "Sales & Marketing",
    }

  ]
  
 /* projects : any[] = [
    {
      "_id": "1",
      "name": "Sunworth Sunworth Sun worthSunworth",
      "address" : "Ulsoor Bangalore"
    },
    {
      "_id": "2",
      "name": "PURVA SKYDALE",
      "address" : "Ulsoor Bangalore"
    },
    {
      "_id": "3",
      "name": "Purva Seasons",
      "address" : "Ulsoor Bangalore"
    },
    {
      "_id": "4",
      "name": "Milestone",
      "address" : "Ulsoor Bangalore"
    },
     {
      "_id": "5",
      "name": "PURVA SKYDALE",
      "address" : "Ulsoor Bangalore"
    },
     {
      "_id": "6",
      "name": "PURVA SKYDALE",
      "address" : "Ulsoor Bangalore"
    },
  ]*/
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
    this.orgID = this.userAuth._id;
  }

  ngOnInit() {
    this.projectForm = this.formBuilder.group({
      name: [''],
      projectCode: [''],
      description: [''],
      units: this.formBuilder.array([]),
      status: [''],
      type: [''],
      beginDate: [''],
      completionDate: [''],
      phases: this.formBuilder.array([]),
      imageUrls: [''],
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
    
    observableMerge(this.route.params, this.route.queryParams).pipe(
      takeUntil(this.unsubscribe))
      .subscribe((params) => this.loadRoute(params));
  }

  public ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  loadRoute(params: any) {
    if('orgID' in params) {
      this.selectedOrgId = params['orgID'];
      this.getProjects();
    }
  }

  organizationChanged(org) {
    this.router.navigate([], {queryParams: {orgID: org.value ? org.value._id : org._id},queryParamsHandling: 'merge'});
  }

  getProjects() {
    this.projectService.getProjects(this.selectedOrgId).pipe().subscribe(res => {
      console.log('res', res);
      this.projectLoading = false;
      this.projects = res;
    }, (error: any) => {
      console.error('error', error);
      this.projectLoading = false;
    });
  }

  selectSingleProject(proj){
    console.log(proj, "selected poject data")
    this.projectSelected = true;
    this.selectedProjectData = proj;
    this.projectForm.value = proj;
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
