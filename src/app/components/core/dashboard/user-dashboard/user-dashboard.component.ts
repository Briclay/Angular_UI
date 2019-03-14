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
import { UserDashboardService } from '../../../../services/user-dashboard/user-dashboard.service';
import { WorkRequestService } from '../../../../components/core/dashboard/work-request/work-request.service';

declare var moment: any;

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss']
})
export class UserDashboardComponent implements OnInit {
  @Input() data: any;
  @Input() formType: string;

  userWorkOrderData: any;
  userWorkOrderDataOptions = [];
  userAuth : any;
  profileImageUrl = "";
  user: any;
  roleName : any;
  userId : any;
  usrType : any;
  orgData : any;
  isLoading = false;
  orgID : any;
  userName : any;
  pageIndex : number = 0;
  pageSize : number = 5;
  projName : any;
  private unsubscribe: Subject<any> = new Subject();
 
  constructor(private workRequestService: WorkRequestService,
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
      this.orgData = JSON.parse(window.localStorage.getItem('authUserOrganisation'));
      this.orgID = this.orgData._id;
  }
  ngOnInit() {
    this.workRequestService.getWorkRequest(this.orgID).pipe().subscribe(res => {
    this.userWorkOrderData = res;
    console.log(this.userWorkOrderData , 'userWorkOrderData')
    res.forEach((list) => {
      list.needByDate = moment(list.needByDate).local().format("MM-DD-YYYY")
      list.initiatedDate = moment(list.initiatedDate).local().format("MM-DD-YYYY")
    })
    this.userWorkOrderDataOptions = [
      {
        title: 'requestNumber', key: 'requestNumber', hideTitle: true, type: 'label'
      }, 
      // {
      //   title: 'workOrderID', key: 'workOrderID', hideTitle: true, type: 'label'
      // },
      {
        title: 'initiatedDate', key: 'initiatedDate', hideTitle: true, type: 'label'
      },
      {
        title: 'typeOfWork', key: 'typeOfWork', hideTitle: true, type: 'label'
      },
      {
        title: 'workDescription', key: 'workDescription', hideTitle: true, type: 'label'
      },
      {
        title: 'needByDate', key: 'needByDate', hideTitle: true, type: 'label'
      }
    ]
    });
  }

  public ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
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

