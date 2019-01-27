import { Component, OnInit } from '@angular/core';
import { FileManagerService } from "../file-manager.service";
import { MatTableDataSource } from '@angular/material';
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
  constructor(
    private fileManagerService: FileManagerService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.currentUrl = this.router.url;
  }

  ngOnInit() {
  
    this.getSubFolder();
  }
  getSubFolder() {
    this.loading = true;
    this.fileManagerService.getAllFolders('')
      .pipe().subscribe(res => {
        this.dataSource = new MatTableDataSource(res);
        this.loading = false;
        if (res.length > 0) {
          this.setConfigData(res[0])
        }
      }, (error: any) => {
        this.loading = false;
        console.error('error', error);
      })
  }
  setConfigData(data: any) {
    this.fileManagerService.getConfig('filter[_organisationId]=' + data._organisationId + '&filter[configKey]=FOLDER_PROCESS_FLOW')
      .pipe().subscribe(res => {
        window.localStorage.FOLDER_PROCESS_FLOW = JSON.stringify(res[0]);
      }, (error: any) => {
        console.error('error', error);
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
      window.localStorage.FOLDER_CONFIG_DETAILS= JSON.stringify('');
      // route to dept folder list
      this.router.navigate([path]).then(() => {
        this.ngOnInit();
      });
    }
  }
}
