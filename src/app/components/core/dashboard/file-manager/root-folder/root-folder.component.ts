import { filter } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { FileManagerService } from "../file-manager.service";
import { MatTableDataSource, MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root-folder',
  templateUrl: './root-folder.component.html',
  styleUrls: ['./root-folder.component.scss']
})
export class RootFolderComponent implements OnInit {
  public dataSource: any;
  currentUrl: string;
  displayedColumns: string[] = ['type', 'name', 'createdAt', 'version'];
  loading: boolean;
  org: any;
  dept: any;
  authUser: any;
  constructor(
    private fileManagerService: FileManagerService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.currentUrl = this.router.url;
    this.org = JSON.parse(window.localStorage.authUserOrganisation);
    this.dept = JSON.parse(window.localStorage.authUserDepartment);
    this.authUser = JSON.parse(window.localStorage.authUser);
  }

  ngOnInit() {
    this.getSubFolder();
  }
  getSubFolder() {
    console.log('this.authUser.userType', this.authUser.userType);
    if (this.authUser.userType === 'SUPERADMIN') {
      var filter = 'filter[_parentId]=';
    } else {
      if (this.authUser.userType === 'ADMIN') {
        var filter = 'filter[_organisationId]=' + this.org._id + '&filter[name]=' + this.org.name;
      } else {
        var filter = 'filter[_organisationId]=' + this.org._id + '&filter[_departmentId]=' + this.dept._id + '&filter[name]=' + this.dept.name;

      }
    }
    this.loading = true;
    this.fileManagerService.getAllFolders(filter)
      .pipe().subscribe(res => {
        if (this.authUser.userType === 'ADMIN') {
          if (res.length > 0) {
            this.adminFolder(res);
          }
        } else {
          this.dataSource = new MatTableDataSource(res);
        }
        this.loading = false;
        if (res.length > 0) {
          this.setConfigData(res[0]);
        } else {
          this.snackBar.open('No data found', 'Folder', {
            duration: 2000,
          });
        }
      }, (error: any) => {
        this.loading = false;
        console.error('error', error);
        this.snackBar.open('error', 'Folder', {
          duration: 2000,
        });
      })
  }
  adminFolder(data) {
    var filter = 'filter[_organisationId]=' + this.org._id + '&filter[_parentId]=' + data[0]._id;
    this.fileManagerService.getAllFolders(filter)
      .pipe().subscribe(res => {
        if (res.length > 0) {
          this.dataSource = new MatTableDataSource(res);
        } else {
          this.snackBar.open('No data found', 'Folder', {
            duration: 2000,
          });
        }
        this.loading = false;
      }, (error: any) => {
        this.loading = false;
        this.snackBar.open(error.message, 'Folder', {
          duration: 2000,
        });
        console.error('error', error);
      })
  }
  setConfigData(data: any) {
    this.fileManagerService.getConfig('filter[_organisationId]=' + data._organisationId + '&filter[configKey]=FOLDER_PROCESS_FLOW')
      .pipe().subscribe(res => {
        if (res.length > 0) {
          window.localStorage.FOLDER_PROCESS_FLOW = JSON.stringify(res[0]);
        } else {
         window.localStorage.FOLDER_PROCESS_FLOW = JSON.stringify({});
          this.snackBar.open('NO config data found !', 'Folder Config', {
            duration: 2000,
          });
        }
      }, (error: any) => {
        console.error('error', error);
        this.snackBar.open(error.message, 'Folder Config', {
          duration: 2000,
        });
      })
  }
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
  routeFielManger(data) {
    if (data.type === 'folder') {
      const path = '/dashboard/file-manager/' + data._organisationId + "/" + data._departmentId + "/" + data._id;
      let top = 1;
      let stack = []
      let json = {
        name: data.name,
        path: this.currentUrl,
        top: top,
      };
      stack.push(json);
      window.localStorage.stack = JSON.stringify(stack);
      window.localStorage.FOLDER_CONFIG_DETAILS = JSON.stringify('');
      window.localStorage.files_project = JSON.stringify('');
      window.localStorage.files_iconArray = JSON.stringify('');
      window.localStorage.projectLevel = JSON.stringify('');
      // route to dept folder list
      this.router.navigate([path]).then(() => {
        this.ngOnInit();
      });
    }
  }

  routeSharedFolder (){
    const path = '/dashboard/file-manager/shared-folder/';
    let top = 1;
    let stack = []
    let json = {
      name: 'Shared',
      path: this.currentUrl,
      top: top,
    };
    stack.push(json);
    window.localStorage.stack = JSON.stringify(stack);
    this.router.navigate([path])
  }
}
