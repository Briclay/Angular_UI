import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from './user.service'
import { UserData, TableOptions } from '../../../../interfaces/interfaces';
import { merge as observableMerge, Subject } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  @ViewChild('tabGroup') tabGroup;
  users: UserData;
  userDataOptions = [];
  orgID: string;
  loading: boolean;
  pageIndex : number = 0;
  pageSize : number = 5;
  private unsubscribe: Subject<any> = new Subject();

  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    observableMerge(this.route.params, this.route.queryParams).pipe(
      	takeUntil(this.unsubscribe))
      	.subscribe((params) => this.loadRoute(params));
  }

  dataPaginatorChange(event){
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
  }

  loadRoute(params: any) {
		if('orgID' in params) {
			this.orgID = params['orgID'];
			this.getUsers();
		}
	}

  organizationChanged(org) {
    this.router.navigate([], { queryParams: { orgID: org.value ? org.value._id : org._id }, queryParamsHandling: 'merge' });
  }
/*method to get user*/
  getUsers() {
    this.loading = true;
    this.userService.getUser(this.orgID).pipe().subscribe(res => {
      this.loading = false;
      this.users = res;
      this.userDataOptions = [
        {
          title: 'Image', key: 'profileImageUrl', hideTitle: true, type: 'image'
        },
        {
          title: 'User Name', type: 'list', list: [
            { title: 'UserName', key: 'username', hideTitle: true, type: 'label' }
          ]
        },
        { title: 'Role', key: 'userType' },
        { title: 'Department', key: 'department' },
        { title: 'Email', key: 'email' }]
    }, (error: any) => {
			console.error('error', error);
			this.loading = false;
		});
  }
  tabSwitch(tabReq) {
		this.tabGroup.selectedIndex = tabReq.index;
		this.getUsers()
	}
}
