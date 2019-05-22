import { Component, OnInit,Output, Input, ViewChild,EventEmitter } from '@angular/core';
import { MatDialog,MatPaginator } from '@angular/material';
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
  @ViewChild(MatPaginator) paginator: MatPaginator;    

  pageIndex : number = 0;
  pageSize : number = 5;
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
  
  dataPaginatorChange(event){
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
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
      res && res.length > 0 && res.forEach((list) => {
        list.displayLogo =  list.imageUrls && list.imageUrls.length > 0 && list.imageUrls[0];
        list.unitNumber = list.units && list.units.length >0 && list.units.reduce((accumulator, currentValue) => {
          return accumulator + currentValue.count;
        }, 0);
        list.loc = list.projectDetails && list.projectDetails.location && list.projectDetails.location
        list.block = list.projectDetails && list.projectDetails.blocks && list.projectDetails.blocks
      })
      this.projects = res;
      console.log(res,"allProjects")
      this.projectDataOptions = [
        {
          title: 'Image', key: 'displayLogo', hideTitle: true, type: 'image'
        },
        {
          title: 'User Name', type: 'list', list: [
            { title: 'UserName', key: 'name', hideTitle: true, type: 'label' },
            { title: 'Address', key: 'loc', hideTitle: true, type: 'label' },
            { title: 'Address', key: 'block', hideTitle: true, type: 'label' },
            { title: 'Status', key: 'status', hideTitle: true, type: 'label', isStatus: true }
          ]
        },
        { title: 'Project Code', key: 'projectCode' },
        { title: 'Total Units', key: 'unitNumber' },
        { title: 'Budget', key: '' }]

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
