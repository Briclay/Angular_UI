import { Component, OnInit } from '@angular/core';
import { ProjectService } from './project.service';
import { merge as observableMerge, Subject } from 'rxjs';
import { MatTableDataSource } from '@angular/material';
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
  orgId: string;
  orgID: string;
  projectLoading: boolean;
  displayedColumns: string[] = ['name', 'projectCode', 'budget', 'toatlUnit'];
  private unsubscribe: Subject<any> = new Subject();

  constructor(
    private projectService: ProjectService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    var org = JSON.parse(window.localStorage.authUserOrganisation);
    this.orgId = org._id;
    this.getProjects();
  }

  ngOnInit() {
    observableMerge(this.route.params, this.route.queryParams).pipe(
      takeUntil(this.unsubscribe))
      .subscribe((params) => this.loadRoute(params));
  }

  loadRoute(params: any) {
    if ('orgID' in params) {
      this.orgId = params['orgID'];
      this.getProjects();
    }
  }
  getProjects() {
    this.projectService.getProjects(this.orgId).pipe().subscribe(res => {
      console.log('res', res);
      this.projectLoading = false;
      this.projects = res;
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
