import { Component, OnInit } from '@angular/core';
import { PlatformLocation } from '@angular/common'
import { ProjectService } from '../../projects/project.service';
import { OrganisationService } from '../../organisation/organisation.service';
import { FileManagerService } from "../file-manager.service";
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import * as _ from 'lodash';

import { MatDialog, MatTableDataSource } from '@angular/material';
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
    logoImageUrl: "assets/images/building-2.jpg",
    name: 'list'
  };
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
  displayedColumns: string[] = ['type', 'name', 'createdAt', 'version', 'logs', 'email', 'share'];
  constructor(
    private projectService: ProjectService,
    private fileManagerService: FileManagerService,
    private dialog: MatDialog,
    private organisationService: OrganisationService,
    private route: ActivatedRoute,
    private router: Router,
    private location: PlatformLocation,
    private http: HttpClient
  ) {
    this.route.params.subscribe(params => {
      this.orgId = params['orgId'];
      this.deptId = params['deptId'];
      this.fileId = params['fileId'];
    });
    //restric browser back button
    location.onPopState(() => {
      window.history.forward();
    });
  }

  folderConfigData() {
      var tempValue =this.localStack.pop();
      console.log('tempValue'+JSON.stringify(tempValue));
       if(tempValue){
        this.currentLevel = tempValue.top;
        this.previousFolderName = tempValue.name;
       }
  }
  ngOnInit() {
    this.currentUrl = this.router.url;
    this.localStack = JSON.parse(window.localStorage.getItem('stack'));
    this.fullPathDisplay = JSON.parse(window.localStorage.getItem('stack'));
    this.folderConfigData();
    this.getProjectListinIt();
    this.getSingleFolder();
  }

  getOrganiztions() {
    this.organisationService.getOrganization()
      .pipe().subscribe(res => {
      
      }, (error: any) => {
        console.error('error', error);
      })
  }

  getProjectListinIt(orgId?) {
    this.projectService.getProjects('filter[_organisationId]=' + this.orgId)
      .pipe().subscribe(res => {
        this.projectlist = res;
      }, (error: any) => {
        console.error('error', error);
      })
  }

  getSingleProject(list) {
    console.log('list.value' + JSON.stringify(list.value))
    this.selectedProjectData = list.value;;
  }

  getAllFolders() {
    this.folderListLoading = true;
    this.fileManagerService.getAllFolders()
      .pipe().subscribe(res => {
        this.folderData = res;
        this.folderListLoading = false;
      }, (error: any) => {
        console.error('error', error);
        this.folderListLoading = false;
      })

  }

  openFolderDialog(list?) {
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
          return "assets/fileManager/7.png"
      if (fileExt.toLowerCase() == 'pdf')
        return "assets/fileManager/pdf.png"
      else
        if (fileExt.toLowerCase() == "png" || "jpg" == fileExt.toLowerCase() || fileExt.toLowerCase() == "gif" || fileExt.toLowerCase() == "pgm")
          return "assets/fileManager/img.png"
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
  goBackButton() {
    if (!_.isEmpty(this.fullPathDisplay)) {
      let temp = this.fullPathDisplay.pop();
      const path = temp.path;
      window.localStorage.stack = JSON.stringify(this.fullPathDisplay);
      this.router.navigate([path]).then(() => {
        this.ngOnInit();
      });
    }
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
      body.path = 'https://s3.ap-south-1.amazonaws.com/' + this.orgId + '/' + response.savedFileName;
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
        if ('File exist !' === error.message) {
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
          console.log('res' + JSON.stringify(res));
          this.getSingleFolder();
        }, (error: any) => {
          console.log('error', error);
        });
    }
  }
  getLogs(data: any) {
    if (data.type == 'file') {
      this.fileDetails = data;
    }
  }

}
