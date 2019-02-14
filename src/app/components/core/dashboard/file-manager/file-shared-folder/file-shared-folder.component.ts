import { Component, OnInit } from '@angular/core';
import { FileManagerService } from '../file-manager.service';
import { MatDialog, MatSnackBar , MatTableDataSource } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import * as _ from 'lodash';
import { PlatformLocation } from '@angular/common';

@Component({
	selector: 'app-file-shared-folder',
	templateUrl: './file-shared-folder.component.html',
	styleUrls: ['./file-shared-folder.component.scss']
})
export class FileSharedFolderComponent implements OnInit {

	public dataSource: any;
	displayedColumns: string[] = ['type', 'name', 'createdAt', 'version'];
	sharedData : any;
	loading = false;
	folderId : string;
  fullPathDisplay : any;
  currentUrl : string;
	localStack : any;    
  fileDetails : any;
  isLoading : boolean;
  viewLog =false;
	constructor(
		private fileManagerService: FileManagerService,
		private route: ActivatedRoute,
		private snackBar : MatSnackBar,
		private router: Router,
    private location: PlatformLocation) { 
		/*this.route.params.subscribe(params => {
			this.folderId = params['folderId'];
		});*/
	/*	location.onPopState(() => {
      window.history.back();
    });*/
	}

	ngOnInit() {
		this.getRootShareFiles()
		this.currentUrl = this.router.url;
		/*this.localStack = JSON.parse(window.localStorage.getItem('stack'));*/
		this.fullPathDisplay = JSON.parse(window.localStorage.getItem('stack'));
		if(this.folderId)
    	this.getSingleFolder(this.folderId);
  }
  backHomePage (){
  	const path = '/dashboard/file-manager/shared-folder/'
    this.router.navigate([path]);/**/
    /*const homeBack = JSON.parse(window.localStorage.getItem('stack'));
    const path = homeBack[0].path;
    this.router.navigate([path]).then(() => {
      //this.ngOnInit();
    });*/
  }

  goBackButton() {
  	this.fullPathDisplay = JSON.parse(window.localStorage.getItem('stack'));
    if (!_.isEmpty(this.fullPathDisplay)) {
    	this.fullPathDisplay.pop();
      const temp = this.fullPathDisplay[this.fullPathDisplay.length - 1];
      const path = temp.path;
      	this.folderId = temp._id
      window.localStorage.stack = JSON.stringify(this.fullPathDisplay);
      this.router.navigate([path]).then(() => {
        if(this.folderId)
       this.getSingleFolder(this.folderId)
      });
    }
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

  getRootShareFiles() {
  	this.loading = true;
  	this.fileManagerService.rootShareFiles()
  	.pipe().subscribe(res => {
  		this.dataSource = new MatTableDataSource(res);
    //this.sharedData = res;
    console.log(res, "resSharedFiles")
    this.loading = false;
    }, (error: any) => {
    	this.loading = false;
    	this.snackBar.open(error.message, 'Shared', {
    		duration: 3000,
    	});
    });
  }

  getSingleFolder(id) {
  	this.isLoading = true;
  	this.fileManagerService.getShareFileByFolderID(id)
  	.pipe().subscribe(res => {
  		this.isLoading = false;
  		this.dataSource = new MatTableDataSource(res);
  	}, (error: any) => {
  		this.snackBar.open(error.message, 'Folder', {
  			duration: 3000,
  		});
  		console.error('error', error);
  	});
  }

  getLogs(data: any) {
    if (data.type === 'file') {
      this.fileDetails = data;
      console.log(this.fileDetails, 'this.fileDetails');
    }
  }

  recursiveCall(data) {
  	this.folderId = data._id
  	if (data.type === 'folder') {
  		const path = '/dashboard/file-manager/shared-folder/'+ data._id;
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
  			_id: data._id
  		};
  		//if (stack.indexOf(json) == -1) {
  			stack.push(json);
  		//}
  		window.localStorage.stack = JSON.stringify(stack);
      // route to dept folder list
      this.router.navigate([path]).then(() => {
      	this.getSingleFolder(this.folderId)
      });
      //this.getSingleFolder(this.folderId)
    }
    if(data.type ===  'file'){
      this.viewLog = true;
      this.getLogs(data)
    }
  }
}
