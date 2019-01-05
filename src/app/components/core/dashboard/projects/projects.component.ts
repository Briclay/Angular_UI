import { Component, OnInit } from '@angular/core';
import {ProjectService} from './project.service'

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  projectDataOptions = [];
  constructor(private projectService: ProjectService) { }

  ngOnInit() {
    this.projectService.getProjects().pipe().subscribe(res => {
      console.log('res',res)
      this.projectDataOptions = [
        {
          title: 'Image', key: 'profileImageUrl', hideTitle: true, type: 'image'
        },
        {
          title: 'User Name', type: 'list', list: [
            { title: 'UserName', key: 'username', hideTitle: true, type: 'label' },
            { title: 'Address', key: 'address.city', hideTitle: true, type: 'label' }
          ]
        },
        { title: 'Role', key: 'userType' },
        { title: 'Department', key: 'department' },
        { title: 'Email', key: 'email' }]
    });
  }

}
