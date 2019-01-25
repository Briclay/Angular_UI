import { Component, OnInit } from '@angular/core';
import { PlatformLocation } from '@angular/common'
import { ProjectService } from '../../projects/project.service';
import { OrganisationService } from '../../organisation/organisation.service';
import { FileManagerService } from "../file-manager.service";
import { ActivatedRoute, Router } from '@angular/router';

import * as _ from 'lodash';

import { MatDialog, MatTableDataSource } from '@angular/material';
import { FolderCreateDialogComponent } from '../folder-create-dialog/folder-create-dialog.component';
import { FileShareDialogComponent } from '../file-share-dialog/file-share-dialog.component';
import { FileMailDialogComponent } from '../file-mail-dialog/file-mail-dialog.component';


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
  selectedOrg: any;
  selectedProjectID: string;
  public dataSource: any;
  folderData: any;
  subFolderData: any;
  selectedProjectData: any;
  filesData: any;
  filesDetailsData: any;
  folderDetailsDataOption: any;
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
  displayedColumns: string[] = ['type', 'name', 'createdAt', 'version'];
  constructor(
    private projectService: ProjectService,
    private fileManagerService: FileManagerService,
    private dialog: MatDialog,
    private organisationService: OrganisationService,
    private route: ActivatedRoute,
    private router: Router,
    private location: PlatformLocation
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

  ngOnInit() {
    //get current url
    this.currentUrl = this.router.url;
    this.getOrganiztions();
    this.getSingleFolder();
    this.localStack = JSON.parse(window.localStorage.getItem('stack'));
    console.log('local' + JSON.stringify(this.localStack));

  }

  getOrganiztions() {
    this.organisationService.getOrganization()
      .pipe().subscribe(res => {
        this.selectedOrg = res[0];
        this.organizations = res;
        this.getProjectListinIt();

      }, (error: any) => {
        console.error('error', error);
      })
  }

  getProjectListinIt(orgId?) {
    this.projectService.getProjects('filter[_organisationId]=' + this.selectedOrg._id)
      .pipe().subscribe(res => {
        this.projectlist = res;
      }, (error: any) => {
        console.error('error', error);
      })
  }

  getSingleProject(list) {
    this.selectedProjectID = list.value;
    this.projectService.getSingleProjects(list.value)
      .pipe().subscribe(res => {
        this.selectedProjectData = res;
        this.productOption = {
          header: [
            { title: 'BHK ' },
            { title: 'No.' },
            { title: 'Area (SFT)' }],
          keys: ['bhk', 'count', 'area'],
          content: res.units
        };

      }, (error: any) => {
        console.error('error', error);
      })
  }

  getAllFolders() {
    this.folderListLoading = true;
    this.fileManagerService.getAllFolders()
      .pipe().subscribe(res => {
        this.folderData = res;
        console.log(res, "folderData")
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

  openShareDialog(fileList?) {
    let dialogRef = this.dialog.open(FileShareDialogComponent, {
      width: '600px',
      data: {
        '_parentId': fileList ? fileList._id : '',
        'orgId': '5a5844cd734d1d61613f7066',
        'deptId': '5a5844cd734d1d61613f7066'
      }
    }).afterClosed()
      .subscribe(response => {
        if (response === 'success') {
          this.getAllFolders();
        }
      });
  }

  openMailDialog(fileList?) {
    let dialogRef = this.dialog.open(FileMailDialogComponent, {
      width: '600px',
      data: {
        '_parentId': fileList ? fileList._id : '',
        'orgId': '5a5844cd734d1d61613f7066',
        'deptId': '5a5844cd734d1d61613f7066'
      }
    }).afterClosed()
      .subscribe(response => {
        if (response === 'success') {
          this.getAllFolders();
        }
      });
  }

  getSubFolder(list) {
    this.subFolderListLoading = true;
    this.fileManagerService.getAllFolders(list._id)
      .pipe().subscribe(res => {
        this.subFolderData = res;
        console.log(res, 'subFolderData')
        /* this.subFolderData = {
           header: [
             { title: 'Name.' },
             { title: 'Created ' },
             { title: 'Created By ' },
             { title: 'Version.' },
             { title: '.' }],
           keys: ['name', 'createdAt', 'accessFlag','version'],
           content: res
         };*/

        this.subFolderListLoading = false;

      }, (error: any) => {
        console.error('error', error);
        this.subFolderListLoading = false;
      })
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
    console.log('data' + JSON.stringify(data));
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
    // let len = this.localStack.length - 1;
    //  let path = this.localStack[len].path;
    //console.log(' this.localStack'+JSON.stringify( this.localStack));
    if (!_.isEmpty(this.localStack)) {
      let temp = this.localStack.pop();
      const path = temp.path;
      console.log('path' + JSON.stringify(path));
      window.localStorage.stack = JSON.stringify(this.localStack);
      this.router.navigate([path]).then(() => {
        this.ngOnInit();
      });
    }

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
      console.log('file' + file);
      console.log('fileName' + fileName);

      this.fileManagerService.getS3Url('file-name=' + fileName + '&file-type=' + file.type + '&_organisationId=' + this.orgId)
        .pipe().subscribe(res => {
          console.log('res' + JSON.stringify(res));
          let json = {
            _organisationId: this.orgId,
            _departmentId: this.deptId,
            _folderId: this.fileId,
            name: file.name,
            type: 'file',
            fileExt: fileExt[fileExt.length - 1],
            path: res.url,
            size: file.size,
            message: "File uploaded by " + this.selectedOrg._id,
            details: "file original name is " + file.name
          };
          this.fileManagerService.saveFile(json)
            .pipe().subscribe(res => {
              console.log('res'+JSON.stringify(res));
              // this.getAllFolders();
            }, (error: any) => {
            });
        }, (error: any) => {
        });
    } else {
      console.log('false');
    }
  }

  getFileSize(value) {
    if (value) {
      if (value < 1024) {
        return (value).toFixed(2) + ' B';
      } else if (value >= 1024 && value < 1048576) {
        return (value / 1024).toFixed(2) + ' Kb';
      } else if (value >= 1048576 && value < 1073741824) {
        return (value / (1024 * 1024)).toFixed(2) + ' Mb';
      } else {
        return (value / (1024 * 1024 * 1024)).toFixed(2) + ' Gb';
      }
    } else {
      return value;
    }
  }
}
