import { Component, OnInit } from '@angular/core';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { ProjectService } from './project.service';
import { merge as observableMerge, Subject } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';

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
  orgID: string;
  projectLoading: boolean;
  displayedColumns: string[] = ['name', 'projectCode', 'budget', 'toatlUnit'];
  private unsubscribe: Subject<any> = new Subject();

  constructor(
    private projectService: ProjectService,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    observableMerge(this.route.params, this.route.queryParams).pipe(
      takeUntil(this.unsubscribe))
      .subscribe((params) => this.loadRoute(params));
  }

  loadRoute(params: any) {
    if ('orgID' in params) {
      this.orgID = params['orgID'];
      this.getProjects();
    }
  }
  getProjects() {
    this.projectService.getProjects(this.orgID).pipe().subscribe(res => {
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

  organizationChanged(org: any) {
    this.router.navigate([], { queryParams: { orgID: org.value ? org.value._id : org._id }, queryParamsHandling: 'merge' });
  }

  tabSwitch(index) {
    this.getProjects();
  }

}
