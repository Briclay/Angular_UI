import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ProjectService } from '../../core/dashboard/projects/project.service';
import { MatSnackBar } from '@angular/material';

@Component({
	selector: 'app-project-drop-down',
	templateUrl: './project-drop-down.component.html',
	styleUrls: ['./project-drop-down.component.scss']
})
export class ProjectDropDownComponent implements OnInit {
	projectlist: any;
	orgId: string;
	selectedProj: any;
	authUserOrganisation : any;

	constructor(private projectService : ProjectService,
		private snackBar : MatSnackBar) { }
	@Output() selectProjects = new EventEmitter();
	ngOnInit() {
		this.authUserOrganisation = JSON.parse(window.localStorage.getItem('authUserOrganisation'));
       	this.orgId = this.authUserOrganisation._id;
       	this.getProjectListinIt();
	}

	getProjectListinIt() {
		this.projectService.getProjects(this.orgId)
	      .pipe().subscribe(res => {
          	this.projectlist = res;
          	console.log(this.projectlist, "projects")
	      }, (error: any) => {
	        console.error('error', error);
	        this.snackBar.open(error.message, 'project', {
	          duration: 2000,
	        });
	      })
	}

	projectChanged(proj) {
		/*if (proj) {
          this.fileForm.get('formProject').setValue(proj);
        }
        if (res.length > 0) {
          this.projectlist = res;
        } else {
          // this.snackBar.open('No data found', 'project', {
          //   duration: 2000,
          // });
        }*/
		if(proj) {
			this.selectProjects.emit(proj)
		}
	}
}
