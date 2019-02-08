import { Component, OnInit } from '@angular/core';
import { FileManagerService } from '../file-manager.service';
import { MatDialog, MatTableDataSource, MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
	selector: 'app-file-shared-folder',
	templateUrl: './file-shared-folder.component.html',
	styleUrls: ['./file-shared-folder.component.scss']
})
export class FileSharedFolderComponent implements OnInit {

	public dataSource: any;
	displayedColumns: string[] = ['type', 'name', 'createdAt', 'version'];
	sharedData :any;
	loading = false;

	dummyData = [
	{
		"_parentId": "5c5496520923fa3e45bd9b5a",
		"type": "folder",
		"version": 1,
		"accessFlag": "Private",
		"systemCreated": false,
		"disable": false,
		"offline": false,
		"deleteFlag": false,
		"_id": "5c5496a70923fa3e45bd9b5b",
		"_organisationId": "5c548f8bf231a5447de94eee",
		"_departmentId": "5c54900e44f38b4498f8d9fd",
		"name": "Design",
		"message": "This is not system creatd folder",
		"sharedByUserId": [],
		"sharedByDepartmentId": [],
		"createdAt": "2019-02-01T18:57:43.183Z",
		"updatedAt": "2019-02-01T18:57:43.183Z",
		"__v": 0
	}
	]
	constructor(
		private fileManagerService: FileManagerService,
		private route: ActivatedRoute,
		private router: Router) { }

	ngOnInit() {
		this.getRootShareFiles()
	}

	goBack(){
		const path = '/dashboard/file-manager'
		this.router.navigate([path]);
	}

	getRootShareFiles() {
		//this.loading = true;
		this.dataSource = new MatTableDataSource(this.dummyData);
	   /* this.fileManagerService.rootShareFiles()
	      .pipe().subscribe(res => {
	        this.sharedData = res;
	        console.log(res, "resSharedFiles")
	        this.loading = false;
	      }, (error: any) => {
	        console.log('error', error);
	        this.loading = false;
	      });*/
	    }
	  }
