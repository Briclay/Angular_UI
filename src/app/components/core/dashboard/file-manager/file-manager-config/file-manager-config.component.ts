import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../projects/project.service';
import { OrganisationService } from '../../organisation/organisation.service';
import { FileManagerService } from "../file-manager.service";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogConfig,
  MatTableDataSource
} from '@angular/material';
import { FolderCreateDialogComponent } from '../folder-create-dialog/folder-create-dialog.component';
import { FileShareDialogComponent } from '../file-share-dialog/file-share-dialog.component';
import { FileMailDialogComponent } from '../file-mail-dialog/file-mail-dialog.component';

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

  constructor(
    private projectService: ProjectService,
    private fileManagerService: FileManagerService,
    private dialog: MatDialog,
    private organisationService: OrganisationService) { }

  ngOnInit() {
    this.getOrganiztions();
    this.getAllFolders();
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
        /*  this.dataSource = new MatTableDataSource(this.folderData);*/        
        /*this.folderData = {
          header: [
            { title: 'Name.' },
            { title: 'Created ' },
            { title: 'Created By ' },
            { title: 'Version.' },
            { title: '.' }],
          keys: ['name', 'createdAt', 'accessFlag','version'],
          content: res
        };*/
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

  getFiles(folder) {
    this.fileListLoading = true;
    this.fileManagerService.getFiles(folder._id)
      .pipe().subscribe(res => {
        this.filesData = res;
        /*this.filesData = {
          header: [
            { title: 'Name.' },
            { title: 'Created ' },
            { title: 'Created By ' },
            { title: 'Version.' },
            { title: '.' }],
          keys: ['name', 'createdAt', 'accessFlag','version'],
          content: res
        };*/
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

      this.fileManagerService.getS3Url('file-name=' + fileName + '&file-type=' + file.type + '&_organisationId=' + this.selectedOrg._id)
        .pipe().subscribe(res => {
          let json = {
            _organisationId: this.selectedOrg._id,
            _departmentId: '5a5844cd734d1d61613f7066', 
            _folderId: fileList ? fileList._id : '',
            _projectId: this.selectedProjectID,
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
              this.getAllFolders();
            }, (error: any) => {
            });
        }, (error: any) => {
        });
    } else {
      console.log('false');
    }
  }
}
