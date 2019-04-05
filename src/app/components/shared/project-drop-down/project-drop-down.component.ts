import { Component, OnInit, Input, Output, EventEmitter ,OnChanges} from '@angular/core';
import { ProjectService } from '../../core/dashboard/projects/project.service';
import { MatSnackBar } from '@angular/material';

@Component({
	selector: 'app-project-drop-down',
	templateUrl: './project-drop-down.component.html',
	styleUrls: ['./project-drop-down.component.scss']
})
export class ProjectDropDownComponent implements OnInit,OnChanges {
	@Input() public value: any;

	projectlist: any;
	orgId: string;
	selectedProj: any;
	authUserOrganisation : any;

	constructor(private projectService : ProjectService,
		private snackBar : MatSnackBar) { }
	@Output() selectProjects = new EventEmitter();
	ngOnInit() {
		console.log(this.value, 'data')
		this.authUserOrganisation = JSON.parse(window.localStorage.getItem('authUserOrganisation'));
       	this.orgId = this.authUserOrganisation._id;
       	this.getProjectListinIt();
	}

	getProjectListinIt() {
		this.projectService.getProjects(this.orgId)
	      .pipe().subscribe(res => {
  	        this.selectedProj = res[0];
          	this.projectlist = res;
          	console.log(this.projectlist, "projects")
  	        this.selectProjects.emit(this.selectedProj)
	      }, (error: any) => {
	        console.error('error', error);
	        this.snackBar.open(error.message, 'project', {
	          duration: 2000,
	        });
	      })
	}

	projectChanged(proj) {
		if(proj) {
			this.selectProjects.emit(proj)
		}
	}
}
