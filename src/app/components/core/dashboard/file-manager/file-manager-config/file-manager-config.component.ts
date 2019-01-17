import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../projects/project.service';
import { FileManagerService } from "../file-manager.service";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogConfig
} from '@angular/material';
import {FolderCreateDialogComponent} from '../folder-create-dialog/folder-create-dialog.component'
@Component({
  selector: 'app-file-manager-config',
  templateUrl: './file-manager-config.component.html',
  styleUrls: ['./file-manager-config.component.scss']
})
export class FileManagerConfigComponent implements OnInit {
  organizations: any[] = [
    { value: 'organizations-1', viewValue: 'Organizations-1' },
    { value: 'organizations-2', viewValue: 'Organizations-2' },
    { value: 'organizations-3', viewValue: 'Organizations-3' }
  ];
  projectlist: any;
  selectedProjectStatus = {
    logoImageUrl: "assets/images/building-2.jpg",
    name: 'list'
  }
  folderData: any;
  subFolderData: any;
  selectedProjectData: any;
  filesData: any;
  filesDetailsData: any;
  productOption: any;
  folderListLoading: boolean;
  subFolderListLoading: boolean;
  fileListLoading: boolean;
  fileListDetialsLoading: boolean;
  constructor(
    private projectService: ProjectService,
    private fileManagerService: FileManagerService,
    private dialog: MatDialog) { }

  ngOnInit() {
    this.getProjectListinIt();
    this.getAllFolders();
  }

  getProjectListinIt(orgId?) {
    this.projectService.getProjects('filter[_organisationId]=' + '5a5844cd734d1d61613f7066')
      .pipe().subscribe(res => {
        if (res.data.length > 0) {
          this.projectlist = res.data;
        }
      }, (error: any) => {
        console.error('error', error);
      })
  }

  getSingleProject(list) {
    this.projectService.getSingleProjects(list.value)
      .pipe().subscribe(res => {
        if (res.data) {
          this.selectedProjectData = res.data;
          this.productOption = {
            header: [
              { title: 'BHK ' },
              { title: 'No.' },
              { title: 'Area (SFT)' }],
            keys: ['bhk', 'count', 'area'],
            content: res.data.product
          };

        }
      }, (error: any) => {
        console.error('error', error);
      })
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
        '_parentId': list ? list._id : '',
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
        this.subFolderListLoading = false;

      }, (error: any) => {
        console.error('error', error);
        this.subFolderListLoading = false;
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
  getIcon(name, type) {
    if (name.toLowerCase() == 'folder')
      return "assets/images/6.png"
    else {
      if (type.toLowerCase() == 'doc' || type.toLowerCase() == 'docx')
        return "assets/images/1.png"
      else
        if (type.toLowerCase() == 'xls' || type.toLowerCase() == "xlsx")
          return "assets/images/7.png"
      if (type.toLowerCase() == 'pdf')
        return "assets/images/2.png"
      else
        if (type.toLowerCase() == "png" || "jpg" == type.toLowerCase() || type.toLowerCase() == "gif" || type.toLowerCase() == "pgm")
          return "assets/images/imge.png"
        else
          return "assets/images/file.png"
    }
  }

  getFileDetails(fileList) {
    this.fileListDetialsLoading = true;
    this.fileManagerService.getFiles(fileList._id)
      .pipe().subscribe(res => {
        this.filesDetailsData = res;
        this.fileListDetialsLoading = false;

      }, (error: any) => {
        console.error('error', error);
        this.fileListDetialsLoading = false;
      })
  }
}
