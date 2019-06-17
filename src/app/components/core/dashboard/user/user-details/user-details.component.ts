  import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
  import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
  import { DepartmentService } from '../../../../../services/department/department.service';
  import {RoleService} from '../../../../../components/core/dashboard/role/role.service';
  import {FileManagerService} from '../../../../../components/core/dashboard/file-manager/file-manager.service';
  import { MatDialog, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
  import {merge as observableMerge, Subject} from 'rxjs';
  import { Router, ActivatedRoute } from '@angular/router';
  import {takeUntil} from 'rxjs/operators';
  import {UserService} from "../user.service";
  import { HttpClient, HttpHeaders } from '@angular/common/http';

  @Component({
    selector: 'app-user-details',
    templateUrl: './user-details.component.html',
    styleUrls: ['./user-details.component.scss']
  })
  export class UserDetailsComponent implements OnInit {
    @Input() data: any;
    @Input() formType: string;
    @Output() public tabSwitch: EventEmitter<any> = new EventEmitter<any>();
    @Output() public updateRefresh: EventEmitter<any> = new EventEmitter<any>();
    orgID: string;
    userDetailsForm: FormGroup;
    userType = ['ADMIN', 'MANAGER', 'USER'];
    _roleId = ['Manager', 'Admin', 'User', 'Super Admin'];
    departments: any;
    roles: any;
    isLoading: boolean;
    private unsubscribe: Subject<any> = new Subject();

    constructor(
      private router: Router,
      private route: ActivatedRoute,
      private snackBar: MatSnackBar,
      private roleService: RoleService,
      private departmentService: DepartmentService,
      private userService: UserService,
      private fileManagerService: FileManagerService,
      private http: HttpClient
    ) {
      
    }

    ngOnInit() {
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
        this.orgID = params['orgID'];
        this.getDepartments();
        this.getRoles();
        this.userDetailsForm = this.createFormGroup();
        this.assignValuesToForm();
      }
    }

    createFormGroup() {
      return new FormGroup({
        name: new FormGroup({
          first: new FormControl('', [Validators.required]),
          last: new FormControl('', [Validators.required])
        }),
        password: new FormControl('Testing@123'),
        address: new FormGroup({
          city: new FormControl('', [Validators.required]),
          area: new FormControl('', [Validators.required]),
        }),
        _roleId: new FormControl(''),
        _departmentId: new FormControl(''),
        _organisationId: new FormControl(this.orgID),
        email: new FormControl('', [Validators.required]),
        profileImageUrl: new FormControl('./assets/images/avatars/profile.jpg'),
        username: new FormControl('', [Validators.required]),
        userType: new FormControl('', [Validators.required]),
        phone: new FormControl('', [Validators.required])
      });
      
    }
    /*method to get Role*/
    getRoles() {
      this.roleService.getData(this.orgID).pipe().subscribe(res => {
        this.roles = res;
      }, (error: any) => {
        console.error('error', error);
      });
    }
  /*method to get department*/
    getDepartments() {
      this.departmentService.getAll(this.orgID).pipe().subscribe(res => {
        this.departments = res;
      }, (error: any) => {
        console.error('error', error);
      });
    }
  /*file uploading*/
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
          });
      } else {
        console.log('false');
      }
    }
  /*method to save input file on S3*/
    saveOnS3(response: any, file, body: any) {
      this.http.put(response.signedRequest, file, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' , 'Access-Control-Allow-Origin': 'true' }
      }).subscribe((awsRes: any) => {
        let filePath = 'https://s3.ap-south-1.amazonaws.com/' + this.orgID + '/' + body.savedFileName;
        this.userDetailsForm.controls['profileImageUrl'].setValue(filePath)
      }, (error: any) => {
        console.log('error' + JSON.stringify(error));
      });
    }
  //assigning values of form to data
    assignValuesToForm() {
      if(this.formType !== 'create') {
        this.userDetailsForm.patchValue(this.data)
      }
    }

    onFormCancel(){
      this.userDetailsForm.reset()
    }

    onSubmit() {
      // Do useful stuff with the gathered data
      if(this.formType !== 'create') {
        this.userService.updateUser(this.data._id, this.userDetailsForm.value )
        .pipe().subscribe(res => {
            this.isLoading = false;
            this.snackBar.open("User Updated Succesfully", 'User', {
              duration: 5000,
            });
            this.updateRefresh.emit()
          }, (error: any) => {
            this.snackBar.open(error.message, 'User', {
              duration: 5000,
            });
          });
      } else {
        this.userService.saveUser(this.userDetailsForm.value )
        .pipe().subscribe(res => {
            this.isLoading = false;
            this.snackBar.open("User Created Succesfully", 'User', {
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
