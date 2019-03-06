import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material';
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
  @ViewChild('tabGroup') tabGroup;

  projectDataOptions = [];
  public dataSource: any;
  projects = [];
  selectedOrgId: string;
  projectLoading = false;
  orgID: any;
  displayedColumns: string[] = ['name', 'projectCode', 'budget', 'toatlUnit'];
  private unsubscribe: Subject<any> = new Subject();

  constructor(
    private projectService: ProjectService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    var org = JSON.parse(window.localStorage.authUserOrganisation);
    this.orgID = org._id;
  }

  ngOnInit() {
    this.getProjects();
    // observableMerge(this.route.params, this.route.queryParams).pipe(
    //   takeUntil(this.unsubscribe))
    //   .subscribe((params) => this.loadRoute(params));
  }

  public ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  // loadRoute(params: any) {
  //   if ('orgID' in params) {
  //     this.selectedOrgId = params['orgID'];
  //     this.getProjects();
  //   }
  // }

  // organizationChanged(org: any) {
  //   this.router.navigate([], { queryParams: { orgID: org.value ? org.value._id : org._id }, queryParamsHandling: 'merge' });
  // }

  getProjects() {
    this.projectLoading = true;
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
            { title: 'Address', key: 'projectDetails.blocks', hideTitle: true, type: 'label' },
            { title: 'Status', key: 'status', hideTitle: true, type: 'label', isStatus: true }
          ]
        },
        { title: 'Project Code', key: 'projectCode' },
        { title: 'Total Units', key: 'unitNumber' },
        { title: 'Budget', key: 'projectDetails.unitNumber' }]

    }, (error: any) => {
      console.error('error', error);
      this.projectLoading = false;
    });
  }

  tabSwitch(tabReq) {
    this.tabGroup.selectedIndex = tabReq.index;
    this.getProjects();
  }

}
