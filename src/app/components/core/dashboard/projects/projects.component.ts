import { Component, OnInit } from '@angular/core';
import {ProjectService} from './project.service'

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  projectDataOptions = [];
  projects: any = {
    data: []
  };
  constructor(private projectService: ProjectService) { }

  ngOnInit() {
    this.projectService.getProjects('filter[_organisationId]=' + '5a5844cd734d1d61613f7066').pipe().subscribe(res => {
      console.log('res',res)
      this.projects = res;
      this.projectDataOptions = [
        {
          title: 'Image', key: 'logoImageUrl', hideTitle: true, type: 'image'
        },
        {
          title: 'User Name', type: 'list', list: [
            { title: 'UserName', key: 'name', hideTitle: true, type: 'label' },
            { title: 'Address', key: 'projectDetails.location', hideTitle: true, type: 'label' },
            { title: 'Address', key: 'projectDetails.projectStatus', hideTitle: true, type: 'label' }
          ]
        },
        { title: 'Project Code', key: 'projectCode' },
        { title: 'Total Units', key: 'projectDetails.unitNumber' },
        { title: 'Budget', key: 'projectDetails.unitNumber' }]
    });
  }

}
