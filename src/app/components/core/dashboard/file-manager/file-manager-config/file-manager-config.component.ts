import { Component, OnInit } from '@angular/core';
import { PlatformLocation } from '@angular/common';
import { ProjectService } from '../../projects/project.service';
import { OrganisationService } from '../../organisation/organisation.service';
import { FileManagerService } from '../file-manager.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

import * as _ from 'lodash';

import { MatDialog, MatTableDataSource, MatSnackBar } from '@angular/material';
import { FolderCreateDialogComponent } from '../folder-create-dialog/folder-create-dialog.component';
import { FileShareDialogComponent } from '../file-share-dialog/file-share-dialog.component';
import { FileMailDialogComponent } from '../file-mail-dialog/file-mail-dialog.component';
import { ConfirmDialogComponent } from '../../../../shared/confirm-dialog/confirm-dialog.component';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

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
  fileDetails: any;
  productOption: any;
  folderListLoading: boolean;
  subFolderListLoading: boolean;
  fileListLoading: boolean;
  fileListDetialsLoading: boolean;
  fileDetialsLoading: boolean;
  orgId: string;
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
  clickedIconName : any;
  designIconArray = [];
  displayedColumns: string[] = ['type', 'name', 'createdAt', 'version', 'logs', 'email', 'share', 'download'];
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
      this.orgId = params['orgId'];
      this.deptId = params['deptId'];
      this.fileId = params['fileId'];
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
    this.currentUrl = this.router.url;
    this.localStack = JSON.parse(window.localStorage.getItem('stack'));
    this.fullPathDisplay = JSON.parse(window.localStorage.getItem('stack'));
    this.folderConfigData();
    this.getSingleFolder();
  }
  folderConfigData() {
    const tempValue = this.localStack.pop();
    if (tempValue) {
      this.currentLevel = tempValue.top;
      this.previousFolderName = tempValue.name;
      if (window.localStorage.getItem('FOLDER_PROCESS_FLOW') != '{}') {
        const tempData = JSON.parse(window.localStorage.getItem('FOLDER_PROCESS_FLOW')).configValues;
        if (tempData.length > 0) {
          this.deptConfigData = JSON.parse(window.localStorage.getItem('FOLDER_CONFIG_DETAILS'));
          if (this.deptConfigData) {
            this.populateConfigData(this.deptConfigData);
          } else {
            const name = this.previousFolderName;
            const pos = _.findIndex(tempData, function (o) { return o.deptName == name; });
            if (pos != -1) {
              window.localStorage.FOLDER_CONFIG_DETAILS = JSON.stringify(tempData[pos]);
              this.deptConfigData = tempData[pos];
              this.populateConfigData(tempData[pos]);
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
    var level = this.currentLevel;
    if (tempData.details.length > 0) {
      //fetch project key and display project drop down
      var pPos = _.findIndex(tempData.details, function (o) { return o.level == level + 1; });
      if (pPos != -1) {
        var details = tempData.details[pPos];
        if ('project' === details.name) {
          this.getProjectListinIt();
          window.localStorage.projectLevel = details.level;
          // get data from config for sorting;
          this.getDesignSortList();
          if (_.isArray(details.folderName) && details.folderName.length > 0) {
            const getPreFolderPos = _.indexOf(details.folderName, this.previousFolderName);
            if (getPreFolderPos !== -1) {
              this.projectFlag = true;
              if (tempData.deptName !== 'Design') {
                this.tableFlag = true;
              } else {
                this.tableFlag = false;
              }
            } else {
              this.tableFlag = true;
              this.projectFlag = false;
            }
          } else {
            this.tableFlag = false;
            this.projectFlag = true;
          }
        } else {
          this.tableFlag = true;
          this.projectFlag = false;
        }
      } else {
        this.tableFlag = true;
        if (this.selectedProjectData) {
          this.getProjectListinIt();
          this.projectFlag = true;
        } else {
          this.projectFlag = false;

        }
      }
    }
  }
  getOrganiztions() {
    this.organisationService.getOrganization()
      .pipe().subscribe(res => {

      }, (error: any) => {
        console.error('error', error);
      })
  }
  compareObjects(o1: any, o2: any): boolean {
    return o1.name === o2.name && o1.id === o2.id;
  }
  getProjectListinIt() {
    this.projectService.getProjects(this.orgId)
      .pipe().subscribe(res => {
        var proj = JSON.parse(window.localStorage.files_project);
        if (proj) {
          this.fileForm.get('formProject').setValue(proj);
        }
        if (res.length > 0) {
          this.projectlist = res;
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
      })
  }
  /*
    * on Select project 
    * check for deparment config 
    * after select project create folder with project id
    * if exist show table or shoe icons  
  */
  getSingleProject(list) {
    this.selectedProjectData = list.value;
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
          body.name = this.createProjectNumber(res.length + 1) + '-' + this.selectedProjectData.name;
          this.createProjectFolder(body, this.selectedProjectData);
        });
    } else {
      console.log('Design');
      // else normal folder creation
      this.createProjectFolder(body, this.selectedProjectData);
    }
  }

  createProjectFolder(body, row) {
    if (this.deptConfigData.iconFlag) {
      this.designDeptFlag = true;
    } else {
      this.designDeptFlag = false;
    }
    this.fileManagerService.saveFolder(body)
      .pipe().subscribe(res => {
        if (this.designDeptFlag) {
          this.getIconFoldersByApi(row);
        } else {
          this.tableFlag = true;
          this.getSingleFolder();
        }
      }, (error: any) => {
        console.log('error', error);
        // if exist then show tbales otherwise show erro
        if ('Folder exist' === error.message) {
          if (this.designDeptFlag) {
            this.getIconFoldersByApi(row);
          } else {
            this.tableFlag = true;
            this.getSingleFolder();
          }
        }
      });
  }
  getIconFoldersByApi(row) {
    this.folderListLoading = true;
    this.fileManagerService.getAllFolders('filter[_projectId]=' + row._id + '&filter[name]=' + row.name + '&filter[_departmentId]=' + this.deptId)
      .pipe().subscribe(res => {
        this.getIconsFolder(res[0]._id);
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
      })
  }
  openFolderDialog() {
    let dialogRef = this.dialog.open(FolderCreateDialogComponent, {
      width: '600px',
      data: {
        '_parentId': this.fileId,
        'orgId': this.orgId,
        'deptId': this.deptId
      }
    }).afterClosed()
      .subscribe(response => {
        if (response === 'success') {
          this.getSingleFolder();
        }
      });
  }

  openShareDialog(element?) {
    if (element.type == 'file') {
      let dialogRef = this.dialog.open(FileShareDialogComponent, {
        width: '600px',
        data: {
          'fileId': element._id
        }
      }).afterClosed()
        .subscribe(response => {
          if (response === 'success') {
            this.getSingleFolder();
          }
        });
    }
  }

  openMailDialog(element) {
    if (element.type == 'file') {
      let dialogRef = this.dialog.open(FileMailDialogComponent, {
        width: '600px',
        data: {
          'fileId': element._id
        }
      }).afterClosed()
        .subscribe(response => {
          if (response === 'success') {
            this.getSingleFolder();
          }
        });
    }
  }


  getSingleFolder() {
    this.fileManagerService.getSingleFile(this.fileId)
      .pipe().subscribe(res => {
        this.dataSource = new MatTableDataSource(res);
      }, (error: any) => {
        console.error('error', error);
      })
  }
  getFiles(folder) {
    this.fileListLoading = true;
    this.fileManagerService.getFiles(folder._id)
      .pipe().subscribe(res => {
        this.filesData = res;
        this.fileListLoading = false;
      }, (error: any) => {
        console.error('error', error);
        this.fileListLoading = false;
      })
  }

  //this method for get iocn in html passing file extension
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
    if (data.type === 'folder') {
      const path = '/dashboard/file-manager/' + this.orgId + "/" + this.deptId + "/" + data._id;
      let top = 0;
      let stack = JSON.parse(window.localStorage.getItem('stack'));
      if (stack.length == 0) {
        top = 0
      } else {
        top = parseInt(stack[stack.length - 1].top)
      }
      let json = {
        name: data.name,
        path: this.currentUrl,
        top: top + 1,
      };
      stack.push(json);
      window.localStorage.stack = JSON.stringify(stack);
      // route to dept folder list
      this.router.navigate([path]).then(() => {
        this.ngOnInit();
      });
    }
  }

  //click on icon
  getClickedByIcon(value) {
    this.clickedIconName = value.name;
    this.folderDetailsDataOption = value;
    if (this.orgId && this.deptId && value) {
      if (value.type === 'folder') {
        this.projectFlag = false;
        let stack = JSON.parse(window.localStorage.getItem('stack'));
        let json = {
          name: value.name,
          path: this.currentUrl,
          top: parseInt(stack[stack.length - 1].top) + 1
        };
        stack.push(json);
        window.localStorage.stack = JSON.stringify(stack);
        const path = '/dashboard/file-manager/' + this.orgId + "/" + this.deptId + "/" + value._id;
        // route to dept folder list
        this.router.navigate([path]).then(() => {
          this.ngOnInit();
        });
      }
    }
  }
  goBackButton() {
    if (!_.isEmpty(this.fullPathDisplay)) {
      let temp = this.fullPathDisplay.pop();
      if (window.localStorage.projectLevel < temp.top) {
        // window.localStorage.files_iconArray = JSON.stringify('');
        window.localStorage.files_project = JSON.stringify('');
        this.projectFlag = false;
      }
      const path = temp.path;
      window.localStorage.stack = JSON.stringify(this.fullPathDisplay);
      this.router.navigate([path]).then(() => {
        this.ngOnInit();
      });
    }
  }
  backHomePage() {
    var homeBack = JSON.parse(window.localStorage.getItem('stack'));
    const path = homeBack[0].path;
    this.router.navigate([path]).then(() => {
      this.ngOnInit();
    });
  }
  //this method for route navigation 
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
      body.path = 'https://s3.ap-south-1.amazonaws.com/' + this.orgId + '/' + body.savedFileName;
      //this.getAssingedUser(json);
      this.onSaveFile(body)
    }, (error: any) => {
      console.log('erro' + JSON.stringify(error));
    });
  }
  onSaveFile(body: any) {
    this.fileManagerService.saveFile(body)
      .pipe().subscribe(res => {
        this.getSingleFolder();
      }, (error: any) => {
        if ('Folder exist' === error.message) {
          this.onFileReplcaeDailog(body);
        } else {
          console.log('error', error);
        }
      });
  }
  onFileReplcaeDailog(body) {
    let dialogRef = this.dialog.open(ConfirmDialogComponent, {
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
          this.getSingleFolder();
        }, (error: any) => {
          console.log('error', error);
        });
    }
  }
  getLogs(data: any) {
    debugger;
    if (data.type == 'file') {
      this.fileDetails = data;
      console.log(this.fileDetails, "this.fileDetails")
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
  //contract departmetn project increament
  createProjectNumber(number) {
    var str = '' + number;
    var count = 0;
    var padArray = [{ len: 1, size: 2 }, { len: 2, size: 1 }, { len: 3, size: 0 }]
    var findSize = _.find(padArray, function (item) {
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

}
