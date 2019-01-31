import { Component, OnInit } from '@angular/core';
import { ProjectService } from './project.service'
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
  orgId: string;
  projectLoading: boolean;
  displayedColumns: string[] = ['name', 'projectCode', 'budget', 'toatlUnit'];
  constructor(private projectService: ProjectService) {
    var org = JSON.parse(window.localStorage.authUserOrganisation);
    this.orgId = org._id;
    this.getProjects();
  }

  ngOnInit() {
    // this.getProjects();
  }

  getProjects() {
    this.projectService.getProjects(this.orgId).pipe().subscribe(res => {
      console.log('res', res);
      this.projectLoading = false;
      res.forEach((list) => { 
        list.displayLogo = list.imageUrls[0];
        list.unitNumber = list.units.reduce((accumulator, currentValue) => {
            return accumulator + currentValue.count;
        }, 0);
    })
      this.projects = res;
      this.projectDataOptions = [
                {
          title: 'Image', key: 'displayLogo', hideTitle: true, type: 'image'
        },
        {
          title: 'User Name', type: 'list', list: [
            { title: 'UserName', key: 'name', hideTitle: true, type: 'label' },
            { title: 'Address', key: 'projectDetails.location', hideTitle: true, type: 'label' },
            { title: 'Address', key: 'status', hideTitle: true, type: 'label', isStatus: true }
          ]
        },
        { title: 'Project Code', key: 'projectCode' },
        { title: 'Total Units', key: 'unitNumber' },
        { title: 'Budget', key: 'projectDetails.unitNumber' }]

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
