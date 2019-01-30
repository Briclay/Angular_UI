import { Component, OnInit } from '@angular/core';
import {ProjectService} from './project.service'
import { MatDialog, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  projectDataOptions = [];
  public dataSource: any;
  projects: any = {
    data: []
  };
  orgId:string;
  projectLoading: boolean;
  displayedColumns: string[] = ['name','projectCode','budget','toatlUnit'];
  constructor(private projectService: ProjectService) { 
    var org=JSON.parse(window.localStorage.authUserOrganisation);
    this.orgId = org._id;
    this.getProjects();
  }

  ngOnInit() {
   // this.getProjects();
  }

  getProjects() {
    this.projectService.getProjects( this.orgId).pipe().subscribe(res => {
      console.log('res',res);
      this.projectLoading = false;
      this.projects = res;
      this.dataSource = new MatTableDataSource(res);
    }, (error: any) => {
        console.error('error', error);
        this.projectLoading = false;
      });
  }
  tabSwitch(index) {
    this.getProjects();
  }

}
