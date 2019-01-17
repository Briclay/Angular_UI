import { Component, OnInit } from '@angular/core';
import { ProjectService } '../../projects/project.service'
@Component({
  selector: 'app-file-manager-config',
  templateUrl: './file-manager-config.component.html',
  styleUrls: ['./file-manager-config.component.scss']
})
export class FileManagerConfigComponent implements OnInit {
  organizations: any[] = [
    { value: 'organizations-1', viewValue: 'Organizations-1' },
    { value: 'organizations-2', viewValue: 'Organizations-2' },
    { value: 'organizations-3', viewValue: 'Organizations-3' }
  ];
  projectlist: any;
  selectedProjectStatus = {
    logoImageUrl: "assets/images/building-2.jpg",
    name: 'list'
  }
  selectedProjectData: any;
  productOption: any;
  constructor(private projectService: ProjectService) { }

  ngOnInit() {
    this.getProjectListinIt();
  }

  getProjectListinIt(orgId?) {
    this.projectService.getProjects('filter[_organisationId]=' + '5a5844cd734d1d61613f7066')
      .pipe().subscribe(res => {
        if (res.data.length > 0) {
          this.projectlist = res.data;
        }
      }, (error: any) => {
        console.error('error', error);
      })
  }

  getSingleProject(list) {
    this.projectService.getSingleProjects(list.value)
      .pipe().subscribe(res => {
        if (res.data) {
          this.selectedProjectData = res.data;
          this.productOption = {
            header: [
              { title: 'BHK ' },
              { title: 'No.' },
              { title: 'Area (SFT)' }],
            keys: ['bhk', 'count', 'area'],
            content: res.data.product
          };

        }
      }, (error: any) => {
        console.error('error', error);
      })
  }

}
