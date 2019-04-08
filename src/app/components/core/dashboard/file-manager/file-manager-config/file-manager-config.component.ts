import { Component, OnInit, } from '@angular/core';
import { PlatformLocation } from '@angular/common';
import { ProjectService } from '../../projects/project.service';
import { OrganisationService } from '../../organisation/organisation.service';
import { FileManagerService } from '../file-manager.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatSnackBar, MatTableDataSource } from '@angular/material';
import { FolderCreateDialogComponent } from '../folder-create-dialog/folder-create-dialog.component';
import { FileShareDialogComponent } from '../file-share-dialog/file-share-dialog.component';
import { FileMailDialogComponent } from '../file-mail-dialog/file-mail-dialog.component';
import { ConfirmDialogComponent } from '../../../../shared/confirm-dialog/confirm-dialog.component';
import * as _ from 'lodash';
import { FileUploadDialogComponent } from '../file-upload-dialog/file-upload-dialog.component';
import { merge as observableMerge, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-file-manager-config',
  templateUrl: './file-manager-config.component.html',
  styleUrls: ['./file-manager-config.component.scss']
})
export class FileManagerConfigComponent implements OnInit {
  organizations: any[];
  projectlist: any;
  selectedProjectStatus = {
    logoImageUrl: 'assets/images/building-2.jpg',
    name: 'list'
  };
  form: FormGroup;
  fileForm: FormGroup;
  public dataSource: any;
  folderData: any;
  subFolderData: any;
  selectedProjectData: any;
  filesData: any;
  filesDetailsData: any;
  folderDetailsDataOption: any;
  folderDetailsDesignDataOption: any;
  folderDetailsContractDataOption: any;
  fileDetails: any;
  productOption: any;
  folderListLoading: boolean;
  subFolderListLoading: boolean;
  fileListLoading: boolean;
  fileListDetialsLoading: boolean;
  fileDetialsLoading: boolean;
  orgId: string;
  projId:string;
  deptId: string;
  fileId: string;
  currentUrl: string;
  localStack: any;
  designDeptFlag = false;
  projectFlag = false;
  currentLevel: number;
  previousFolderName: any;
  fullPathDisplay: any;
  specDeptDetails: any;
  deptConfigData: any;
  iconArray = [];
  tableFlag = false;
  isLoading: boolean;
  clickedIconName: any;
  workRequestDetails: any;
  designIconArray = [];
  workRequestFlag = false;
  path: any;
  pathName: any;
  fullpath: any;
  fileUploadLoader = false;
  checkFlag = false;
  selectProjectStatus ="";
  selectedName:any;
  selectedProjectByParams:any;
  selectedProjectDataByParams:any;
  selectedFileData : any;
  displayedColumns: string[] = ['type', 'name', 'createdAt', 'version', 'logs', 'email', 'share', 'download'];
  private unsubscribe: Subject<any> = new Subject();

  constructor(
    private projectService: ProjectService,
    private fileManagerService: FileManagerService,
    private dialog: MatDialog,
    private organisationService: OrganisationService,
    private route: ActivatedRoute,
    private router: Router,
    private location: PlatformLocation,
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar
    ) {


    this.route.params.subscribe(params => {
      this.orgId  = params['orgId'];
      this.deptId = params['deptId'];
      this.fileId = params['fileId'];
      if(this.checkFlag){
        this.folderConfigData();
      }
      this.selectProjectStatus = "";
    });
    this.fileForm = this.formBuilder.group({
      formProject: ''
    });
    if (window.localStorage.files_project) {
      this.selectedProjectData = JSON.parse(window.localStorage.files_project);
      this.getProjectListinIt();
    }
    if (window.localStorage.files_iconArray) {
      this.iconArray = JSON.parse(window.localStorage.files_iconArray);
    }
    console.log('this.iconArray ', this.iconArray);
    // restric browser back button
    location.onPopState(() => {
      window.history.forward();
    });

  }
  ngOnInit() {
    observableMerge(this.route.queryParams).pipe(
    takeUntil(this.unsubscribe))
    .subscribe((queryParams) => this.loadRoute(queryParams));
    //window.localStorage.setItem('selectProjectParams', JSON.stringify({}));
    this.currentUrl = this.router.url;
    this.localStack = JSON.parse(window.localStorage.getItem('stack'));
    this.fullPathDisplay = JSON.parse(window.localStorage.getItem('stack'));
    this.path = JSON.parse(window.localStorage.getItem('stack'));

    this.folderConfigData();
    this.getSingleFolder(this.fileId);
    /*this.deptConfigData = JSON.parse(window.localStorage.getItem('FOLDER_CONFIG_DETAILS'));
    this.populateConfigData(this.deptConfigData);*/
  }

  loadRoute(queryParams: any) {
    if('projId' in queryParams) {
      this.projId = queryParams['projId'];
    }
    else{
      window.localStorage.setItem('selectProjectParams', JSON.stringify({}));
    }
  }

  public ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  projectChanged(proj) {
    this.selectProjectStatus = "";
    this.router.navigate([], { queryParams: { projId: proj.value ? proj.value._id : proj._id }, queryParamsHandling: 'merge' });
    console.log(proj);
     if(this.projId){
        this.projectService.getSingleProjects(this.projId).pipe().subscribe(res => {
          this.selectedProjectData = res
          this.selectProjectStatus = this.selectedProjectData.status
          this.getSingleProject(this.selectedProjectData);
        })
      }
      else if(proj.value){
        this.projectService.getSingleProjects(proj.value).pipe().subscribe(res => {
          this.selectedProjectData = res
          this.selectProjectStatus = this.selectedProjectData.status
          this.getSingleProject(this.selectedProjectData);
        })
      }
      else {   
        this.selectedProjectData = proj.value || proj
        this.selectProjectStatus = proj.value.status || proj.status
        this.getSingleProject(proj);
      }
  }

  folderConfigData() {
    this.localStack = JSON.parse(window.localStorage.getItem('stack'));
    const tempValue = this.localStack.pop();
    if (tempValue) {
      this.currentLevel = tempValue.top;
      this.previousFolderName = tempValue.name;
      if (window.localStorage.getItem('FOLDER_PROCESS_FLOW') !== '{}') {
        const tempData = JSON.parse(window.localStorage.getItem('FOLDER_PROCESS_FLOW')).configValues;
        if (tempData.length > 0) {
          this.deptConfigData = JSON.parse(window.localStorage.getItem('FOLDER_CONFIG_DETAILS'));
          if (this.deptConfigData) {
            this.populateConfigData(this.deptConfigData);
            this.checkFlag = true;
          } else {
            const name = this.previousFolderName;
            const pos = _.findIndex(tempData, function (o) { return o.deptName === name; });
            if (pos !== -1) {
              window.localStorage.FOLDER_CONFIG_DETAILS = JSON.stringify(tempData[pos]);
              this.deptConfigData = tempData[pos];
              this.populateConfigData(tempData[pos]);
              this.checkFlag = true;
            } else {
              this.tableFlag = true;
            }

          }
        }
      } else {
          // this.snackBar.open('No config data found', 'Folder Config', {
          //   duration: 2000,
          // });
          this.tableFlag = true;
        }
      }
    }
  // check cuurent level and config levl
  populateConfigData(tempData: any) {
    const level = this.currentLevel;
    if (tempData.details.length > 0) {
      // fetch project key and display project drop down
      const pPos = _.findIndex(tempData.details, function (o) { return o.level === level + 1; });
      this.workRequestFlag = false;
      if (pPos !== -1) {
        const details = tempData.details[pPos];
        console.log(' details.name', details.name);
        if ('project' === details.name) {
          this.getProjectListinIt();
          window.localStorage.projectLevel = details.level;
          // get data from config for sorting;
          this.getDesignSortList();
          if (_.isArray(details.folderName) && details.folderName.length > 0) {
            const getPreFolderPos = _.indexOf(details.folderName, this.previousFolderName);
            if (getPreFolderPos !== -1) {
              if(tempData.deptName === 'Contracts'){
                if(level+1 === 4 ){
                  this.projectFlag = true;
                }
              }
              else{
                this.projectFlag = true;
                this.tableFlag = false;
              }
            } else {
              this.tableFlag = true;
              if(tempData.deptName === 'Design'){
                this.projectFlag = true;
              }
              if (tempData.deptName === 'Contracts') {
                this.projectFlag = true;
              }

            }
          } else {
            this.tableFlag = false;
            if(tempData.deptName === 'Contracts'){
              if(level+1 === 4 ){
                this.projectFlag = true;
              }
            }
            else{
              this.projectFlag = true;
            }
          }
        } else {
          if (('work-request' || 'amendment') === details.name) {
            this.workRequestFlag = true;
          }
          this.tableFlag = true;
          this.projectFlag = false;
          if(tempData.deptName === 'Design'){
            this.projectFlag = true;
          }
        }
      } else {
        this.tableFlag = true;
        if (this.selectedProjectData) {
          this.getProjectListinIt();
          if(tempData.deptName === 'Contracts'){
            if(level+1 === 4 ){
              this.projectFlag = true;
            }
          }
          else{
            this.projectFlag = true;
          }
        } 
        if (this.selectedProjectData == "") {
          this.getProjectListinIt();
          if(tempData.deptName === 'Contracts'){
            if(level+1 === 4 ){
              this.projectFlag = true;
            }
          }
          else{
            this.projectFlag = true;
          }
        } else {
          if(tempData.deptName === "Design"){
            this.projectFlag = true;
          }
          else{
            this.projectFlag = false;
          }
        }
      }
    }
  }
  getOrganiztions() {
    this.organisationService.getOrganization()
    .pipe().subscribe(res => {

    }, (error: any) => {
      console.error('error', error);
    });
  }
  compareObjects(o1: any, o2: any): boolean {
    return o1.name === o2.name && o1.id === o2.id;
  }
  getProjectListinIt() {
    this.projectService.getProjects(this.orgId)
    .pipe().subscribe(res => {
      const proj = JSON.parse(window.localStorage.files_project);
      if (proj) {
        this.fileForm.get('formProject').setValue(proj);
      }
      if (res.length > 0) {
        this.projectlist = res;
         this.projectlist && this.projectlist.forEach((v) => {
          if(v._id === this.projId){
            this.selectedProjectByParams = v
            window.localStorage.setItem('selectProjectParams', JSON.stringify(this.selectedProjectByParams));
            this.projectChanged(v);
          }
        })

      } else {
          // this.snackBar.open('No data found', 'project', {
          //   duration: 2000,
          // });
        }
      }, (error: any) => {
        console.error('error', error);
        this.snackBar.open(error.message, 'project', {
          duration: 2000,
        });
      });


  }

  /*
    * on Select project
    * check for deparment config
    * after select project create folder with project id
    * if exist show table or shoe icons
    */
    getSingleProject(list) {
      this.isLoading = true;
      /*    this.selectProjectStatus = list.status;*/ 
        console.log(this.selectProjectStatus, 'this.selectProjectStatus')
        console.log('this.selectedProjectData', this.selectedProjectData);
        window.localStorage.files_project = JSON.stringify(this.selectedProjectData);
        const body = {
          name: this.selectedProjectData.name,
          _organisationId: this.orgId,
          _departmentId: this.deptId,
          _parentId: this.fileId,
          owner: '',
          _projectId: this.selectedProjectData._id,
          shared: [],
          details: 'This folder is created by ',
          accessFlag: 'Private'
        };
        console.log('this.deptConfigData', this.deptConfigData);
        // logic for only contrcat departemt to add fodler name with id
        if (this.deptConfigData.deptName === 'Contracts') {
          this.fileManagerService.getSingleFile(this.fileId)
          .pipe().subscribe(res => {
            this.isLoading = false;
            body.name = this.createProjectNumber(res.length + 1) + '-' + this.selectedProjectData.name;
            this.createProjectFolder(body, this.selectedProjectData);
          });
        } else {
          console.log('Design');
          this.isLoading = false;
          // else normal folder creation
          this.createProjectFolder(body, this.selectedProjectData);
        }
    }

  createProjectFolder(body, row) {
    this.isLoading = true;
    if (this.deptConfigData.iconFlag) {
      this.designDeptFlag = true;
    } else {
      this.designDeptFlag = false;
    }
    this.fileManagerService.saveFolder(body)
    .pipe().subscribe(res => {
      this.isLoading = false;
      if (this.designDeptFlag) {
        this.getIconFoldersByApi(row);
      } else {
        this.tableFlag = true;
        this.getSingleFolder(this.fileId);
      }
    }, (error: any) => {
      console.log('error', error);
        // if exist then show tbales otherwise show erro
        if ('Folder exist' === error.message) {
          /*this.snackBar.open(error.message, 'Folder', {
            duration: 3000,
          });*/
          if (this.designDeptFlag) {
            this.getIconFoldersByApi(row);
          } else {
            this.tableFlag = true;
            this.getSingleFolder(this.fileId);
          }
        }
      });
  }
  getIconFoldersByApi(row) {
    this.isLoading = true;
    console.log('row', row);
    // tslint:disable-next-line:max-line-length
    this.fileManagerService.getAllFolders('filter[_projectId]=' + row._id + '&filter[name]=' + row.name + '&filter[_departmentId]=' + this.deptId)
    .pipe().subscribe(res => {
      if (res.length > 0) {
        this.isLoading = false;
        this.getIconsFolder(res[0]._id);
      } else {
        this.snackBar.open('Project folder is not created ! Please check project name', 'Project Folder', {
          duration: 3000,
        });
      }
    }, (error: any) => {
    });
  }
  getIconsFolder(id) {
    this.fileManagerService.getSingleFile(id)
    .pipe().subscribe(res => {
      this.iconArray = res;
      this.doDesignSort();
      window.localStorage.files_iconArray = JSON.stringify(this.iconArray);
    }, (error: any) => {
      console.error('error', error);
    });
  }
  openFolderDialog() {
    const dialogRef = this.dialog.open(FolderCreateDialogComponent, {
      width: '600px',
      data: {
        '_parentId': this.fileId,
        'orgId': this.orgId,
        'deptId': this.deptId
      }
    }).afterClosed()
    .subscribe(response => {
      if (response === 'success') {
        this.getSingleFolder(this.fileId);
      }
    });
  }

  openShareDialog(element?) {
    if (element.type === 'file') {
      const dialogRef = this.dialog.open(FileShareDialogComponent, {
        width: '600px',
        data: {
          'fileId': element._id
        }
      }).afterClosed()
      .subscribe(response => {
        if (response === 'success') {
          this.getSingleFolder(this.fileId);
        }
      });
    }
  }

  openMailDialog(element) {
    if (element.type === 'file') {
      const dialogRef = this.dialog.open(FileMailDialogComponent, {
        width: '600px',
        data: {
          'fileId': element._id
        }
      }).afterClosed()
      .subscribe(response => {
        if (response === 'success') {
          this.getSingleFolder(this.fileId);
        }
      });
    }
  }

  openfileUploadDialogForRfaWo(response: any, file, body: any) {

    this.selectedFileData = body; 
    console.log(response, 'file upload data')
    const dialogRef = this.dialog.open(FileUploadDialogComponent, {
      width: '600px',
      data: file
    }).afterClosed()
    .subscribe(res => {
      if(res){
        body.approval = res.approval;
        body.remarks = res.remarks;
        console.log(body, 'body before file upload for RFA & WO')
        this.saveOnS3(response, file, body);
      }
    });
  }


  getSingleFolder(id) {
    this.isLoading = true;
    this.fileManagerService.getSingleFile(id)
    .pipe().subscribe(res => {
      this.isLoading = false;
      this.dataSource = new MatTableDataSource(res);
    }, (error: any) => {
        // this.snackBar.open(error.message, 'Folder', {
        //   duration: 3000,
        // });
        console.error('error', error);
      });
  }

  getFiles(folder) {
    this.fileListLoading = true;
    this.fileManagerService.getFiles(folder._id)
    .pipe().subscribe(res => {
      this.filesData = res;
      this.fileListLoading = false;
    }, (error: any) => {
      this.snackBar.open(error.message, 'File', {
        duration: 3000,
      });
      console.error('error', error);
      this.fileListLoading = false;
    });
  }

  // this method for get iocn in html passing file extension
  getIcon(fileExt: string, type: string) {
    if (type.toLowerCase() == 'folder')
      return "assets/fileManager/folder.png"
    else {
      if (fileExt.toLowerCase() == 'doc' || fileExt.toLowerCase() == 'docx')
        return "assets/fileManager/doc.png"
      else
        if (fileExt.toLowerCase() == 'xls' || fileExt.toLowerCase() == "xlsx")
          return "assets/fileManager/xls.png"
        if (fileExt.toLowerCase() == 'pdf')
          return "assets/fileManager/pdf.png"
        else
          if (fileExt.toLowerCase() == "jpg" || fileExt.toLowerCase() == "jpeg")
            return "assets/fileManager/jpg.png"
          else
            if (fileExt.toLowerCase() == "png")
              return "assets/fileManager/png.png"
            else
              if (fileExt.toLowerCase() == "dwg")
                return "assets/fileManager/dwg.png"
              else
                return "assets/fileManager/file.png"
            }
          }
          recursiveCall(data) {
            this.selectedName = data.name.substring(3);
            this.folderConfigData();
            this.fileId = data._id
            if (data.type === 'folder') {
              const path = '/dashboard/file-manager/' + this.orgId + '/' + this.deptId + '/' + data._id;
              let top = 0;
              const stack = JSON.parse(window.localStorage.getItem('stack'));
              if (stack.length == 0) {
                top = 0;
              } else {
                top = parseInt(stack[stack.length - 1].top)
              }
              const json = {
                name: data.name,
                path: path,
                top: top + 1,
                id: data._id
              };
              stack.push(json);
              window.localStorage.stack = JSON.stringify(stack);
      // route to dept folder list
      this.router.navigate([path]).then(() => {
        if(this.fileId){
          this.getSingleFolder(this.fileId);
        }
        this.path = JSON.parse(window.localStorage.getItem('stack'));
      });
    }
  }

  // click on icon

  getClickedByIcon(value) {
    this.fileId = value._id
    this.clickedIconName = value.name;
    this.folderDetailsDataOption = value;
    if (this.orgId && this.deptId && value) {
      if (value.type === 'folder') {
        //this.projectFlag = false;
        const path = '/dashboard/file-manager/' + this.orgId + '/' + this.deptId + '/' + value._id;
        let top = 0;
        let stack;
        window.localStorage.stack = JSON.stringify([]);
        stack = JSON.parse(window.localStorage.getItem('stack'));
        if (stack.length == 0) {
          top = 0;
        } else {
          top = parseInt(stack[stack.length - 1].top)
        }
        const json = {
          name: value.name,
          path: path,
          top: top + 1
        };
        stack = JSON.parse(window.localStorage.getItem('stack'));
        stack.push(json);
        window.localStorage.stack = JSON.stringify(stack);
        // route to dept folder list
        this.router.navigate([path]).then(() => {
          this.tableFlag = true;
          //this.ngOnInit();
          if(this.fileId){
            this.getSingleFolder(this.fileId);
          }
          this.path = JSON.parse(window.localStorage.getItem('stack'));
        });
      }
    }
  }

  goBackButton() {
    if(!this.fileId){
      const path = '/dashboard/file-manager'
      this.router.navigate([path]);/**/
    }
    else {
      this.path = JSON.parse(window.localStorage.getItem('stack'));
      if (!_.isEmpty(this.path)) {
        this.path.pop();
        const temp = this.path[this.path.length - 1];
        const path = temp.path;
        this.fileId = temp._id
        window.localStorage.stack = JSON.stringify(this.path);
        this.router.navigate([path]).then(() => {
          if(this.fileId){
            this.getSingleFolder(this.fileId)
          }
          this.path = JSON.parse(window.localStorage.getItem('stack'));
        });
      }
    }
  }

  backHomePage() {
    const path = '/dashboard/file-manager'
    this.router.navigate([path]);/**/
    /*const homeBack = JSON.parse(window.localStorage.getItem('stack'));
    const path = homeBack[0].path;
    this.router.navigate([path]).then(() => {
      this.ngOnInit();
    });*/
  }
  // this method for route navigation
  onSelectPath(path, top) {
    let tempArray = [];
    let tempStack = JSON.parse(window.localStorage.getItem('stack'));
    for (var i = 0; i < top; i++) {
      tempArray.push(tempStack[i])
    }
    window.localStorage.stack = JSON.stringify(tempArray);
    this.router.navigate([path]).then(() => {
      this.ngOnInit();
    });
  }
  getFileDetails(fileList) {
    this.fileDetialsLoading = true;
    this.folderDetailsDataOption = fileList;

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
          savedFileName: fileName,
          _organisationId: this.orgId,
          _departmentId: this.deptId,
          _folderId: this.fileId,
          name: file.name,
          type: 'file',
          fileExt: fileExt[fileExt.length - 1],
          path: res.url,
          size: file.size,
          message: "File uploaded by ",
          details: "file original name is " + file.name
        };

        if(this.selectedName === 'RFA' ||this.selectedName === 'Order/Agreement'){
          console.log('RFA & WO/Agreement')
          this.openfileUploadDialogForRfaWo(res, file, json)
        }
        else{
          this.saveOnS3(res, file, json);
        }
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
      body.path = 'https://s3.ap-south-1.amazonaws.com/' + this.orgId + '/' + body.savedFileName;
      // this.getAssingedUser(json);
      this.onSaveFile(body)
    }, (error: any) => {
      console.log('erro' + JSON.stringify(error));
    });
  }
  onSaveFile(body: any) {
    console.log(body, 'body')
    this.isLoading = true;
    this.fileManagerService.saveFile(body)
    .pipe().subscribe(res => {
      this.isLoading = false;
      this.getSingleFolder(this.fileId);
    }, (error: any) => {
      if ('Folder exist' === error.message) {
        this.onFileReplcaeDailog(body);
      } else {
        console.log('error', error);
      }
    });
  }
  onFileReplcaeDailog(body) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '600px',
      data: {
        'message': 'Do want to replace file ?'
      }
    }).afterClosed()
    .subscribe(response => {
      if (response) {
        this.onFileReplcaeSave(body);
      }
    });
  }
  onFileReplcaeSave(body) {
    if (body) {
      this.fileManagerService.updateFile(body._id, body)
      .pipe().subscribe(res => {
        this.getSingleFolder(this.fileId);
      }, (error: any) => {
        console.log('error', error);
      });
    }
  }
  getLogs(data: any) {
    if (data.type === 'file') {
      this.fileDetails = data;
      console.log(this.fileDetails, 'this.fileDetails');
    }
  }
  /*downlaod file */
  downloadFile(row) {
    if (row.type.toLowerCase() !== 'folder') {
      window.open(row.path);
    } else {
      console.log('row', row);
    }
  }
  // contract departmetn project increament
  createProjectNumber(number) {
    let str = '' + number;
    let count = 0;
    const padArray = [{ len: 1, size: 2 }, { len: 2, size: 1 }, { len: 3, size: 0 }];
    const findSize = _.find(padArray, function (item) {
      return item.len === str.length;
    });
    while (count < findSize.size) {
      str = '0' + str;
      count++;
    }
    return str;
  }
  getDesignSortList() {
    this.fileManagerService.getConfig('filter[configKey]=design_icon_sort')
    .pipe().subscribe(response => {
      if (response.length > 0) {
        this.designIconArray = response[0].configValues;
      } else {
        this.designIconArray = [];
      }
    }, (error: any) => {
      console.error('error', error);
    });
  }
  doDesignSort() {
    let len = this.designIconArray.length;
    if (len > 0) {
      var tempArray = [];
      for (var i = 0; i < len; i++) {
        var name = this.designIconArray[i];
        var index = _.findIndex(this.iconArray, function (value) {
          return value.name.toLowerCase() == name.toLowerCase();
        });
        if (index != -1) {
          tempArray.push(this.iconArray[index]);
          this.iconArray.splice(index, 1);
        }
      }
      for (let prop in this.iconArray) {
        tempArray.push(this.iconArray[prop]);
      }
      this.iconArray = tempArray;
    }
  }
  getWorkRequestata(workData: any) {
    this.createFolder(workData.typeOfWork, workData._id);
  }
  createFolder(typeOfWorkName, workId) {
    const json = {
      _organisationId: this.orgId,
      name: typeOfWorkName,
      _departmentId: this.deptId,
      _parentId: this.fileId,
      _workRequestId: workId,
      shared: [],
      details: 'This folder is created by SUPERADMIN',
      accessFlag: 'Private'
    };
    this.fileManagerService.saveFolder(json)
    .pipe().subscribe(res => {
      this.getSingleFolder(this.fileId);
    }, (error: any) => {
      console.log('error', error);
      this.getSingleFolder(this.fileId);
    });
  }

}
