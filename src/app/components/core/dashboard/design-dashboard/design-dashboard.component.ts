import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {FileManagerService} from '../../../../components/core/dashboard/file-manager/file-manager.service';
import {UserService} from '../../../../components/core/dashboard/user/user.service';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatDialog,  MatSnackBar ,MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-design-dashboard',
  templateUrl: './design-dashboard.component.html',
  styleUrls: ['./design-dashboard.component.scss']
})
export class DesignDashboardComponent implements OnInit {
  @Input() data: any;
  @Input() formType: string;
  
  organizations: any[] = [
    { value: 'organizations-1', viewValue: 'Organizations-1' },
    { value: 'organizations-2', viewValue: 'Organizations-2' },
    { value: 'organizations-3', viewValue: 'Organizations-3' }
  ];
  designDashForm: FormGroup;
  orgID: string;
  userAuth : any;
  profileImageUrl : any;
  user: any;
  userName: any;
  roleName: any;

/*  projectConsultances : any[] = [
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
    },
    {
      "_id": "6",
      "name": "HVAC Design",
      "internaluser" : "Internal User 1",
      "externaluser" : "External User 1"
    },
    {
      "_id": "7",
      "name": "Landsape",
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
    },
    {
      "_id": "3",
      "bhk": "4 BHK",
      "no" : "198",
      "area" : "2045"
    },
    {
      "_id": "4",
      "bhk": "1 BHK",
      "no" : "133",
      "area" : "2036"
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
  
  projects : any[] = [
    {
      "_id": "1",
      "name": "Sunworth ",
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
  ]*/

  constructor(
    private fileManagerService: FileManagerService,
    private http: HttpClient,
    private userService : UserService,
    private snackBar : MatSnackBar) {    

      this.user = JSON.parse(window.localStorage.getItem('authUser')); 
      this.userName = this.user.displayName;
      this.roleName = this.user._roleId.name;
      this.profileImageUrl = this.user.profileImageUrl ? this.user.profileImageUrl : "./assets/images/avatars/profile.jpg";;
    this.userAuth = JSON.parse(window.localStorage.getItem('authUserOrganisation'));
    this.orgID = this.userAuth._id;
  }

  ngOnInit() {
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
    this.http.put(response.signedRequest, file, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    }).subscribe((awsRes: any) => {
      let filePath = 'https://s3.ap-south-1.amazonaws.com/' + this.orgID + '/' + body.savedFileName;
      //this.designDashForm.controls['profileImageUrl'].setValue(filePath)
      this.profileImageUrl = filePath;
      console.log(this.profileImageUrl, "filePath")
    }, (error: any) => {
      this.snackBar.open(error.message, 'error', {
        duration: 5000,
      });
      console.log(error)
    });
    // this.fileManagerService.saveOnS3(response.signedRequest, file, {
    //   headers: { 'Content-Type': 'application/x-www-form-urlencoded', "Authorization" : JSON.parse(window.localStorage.getItem('authToken')) }
    // }).pipe().subscribe(res => {
    //     this.userDetailsForm.controls['profileImageUrl'].setValue(res.url)
    //   }, (error: any) => {
    // });
  }

  onSubmit() {
    let userData = {
      _organisationId : this.orgID,
      profileImageUrl : this.profileImageUrl
    }
    if(this.data._id) {
      this.userService.updateUser(this.data._id, userData )
      .pipe().subscribe(res => {
          this.isLoading = false;
          this.snackBar.open("Profile image updated Succesfully", 'User', {
            duration: 5000,
          });
        }, (error: any) => {
          this.snackBar.open(error.message, 'User', {
            duration: 5000,
          });
        });
    } else {
      this.userService.saveUser(userData)
      .pipe().subscribe(res => {
          this.isLoading = false;
          this.snackBar.open("Profile image updated Succesfully", 'User', {
            duration: 5000,
          });
          let tabReq = {index: 0, orgId: this.userDetailsForm.value._organisationId}
          this.tabSwitch.emit(tabReq);
          this.userDetailsForm.reset()
        }, (error: any) => {
          this.snackBar.open(error.message, 'User', {
            duration: 5000,
          });
        });
    }
  }

}
