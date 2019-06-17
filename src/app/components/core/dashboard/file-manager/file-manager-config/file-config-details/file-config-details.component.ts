import { Component, OnInit, Input } from '@angular/core';
import {UserService} from "../../../user/user.service";

@Component({
  selector: 'app-file-config-details',
  templateUrl: './file-config-details.component.html',
  styleUrls: ['./file-config-details.component.scss']
})
export class FileConfigDetailsComponent implements OnInit {
  @Input()
  public folderDetailsDataOption: any;
  logsData:any;
  uploadedBy : any;
  constructor(
    private userService: UserService) { }
  ngOnInit() {
  }
  ngOnChanges(changes: any) {
    this.logsData = this.folderDetailsDataOption;
    let id = this.logsData._createdBy;
    this.userService.getSingleUser(id).pipe().subscribe(res => {
    this.uploadedBy = res.displayName;
    }, (error: any) => {
      console.error('error', error);
    });

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
}
