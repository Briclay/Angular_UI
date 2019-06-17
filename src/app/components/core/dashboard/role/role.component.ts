import { Component, OnInit, ViewChild } from '@angular/core';
import { RoleService } from './/role.service';
import { RoleData } from './interfaces';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { HistoryPopupComponent } from '../../../../components/shared/history-popup/history-popup.component'
import { DepartmentService } from '../../../../services/department/department.service';
import {merge as observableMerge, Subject} from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import {takeUntil} from 'rxjs/operators';

@Component({
	selector: 'app-role',
	templateUrl: './role.component.html',
	styleUrls: ['./role.component.scss']
})

export class RoleComponent implements OnInit {
	@ViewChild('tabGroup') tabGroup;
	roles: any;
	roleDataOptions = [];
	roleListSpinner: boolean;
	historyData: any;
	selectedOrgId: string;
	pageIndex : number = 0;
  	pageSize : number = 5;
	private unsubscribe: Subject<any> = new Subject();
	constructor(
		private router: Router,
    	private route: ActivatedRoute,
		private roleService: RoleService,
		public dialog: MatDialog,
		private departmentService: DepartmentService,
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

	public ngOnDestroy(): void {
		this.unsubscribe.next();
		this.unsubscribe.complete();
	}

	loadRoute(params: any) {
		if('orgID' in params) {
			this.selectedOrgId = params['orgID'];
			this.getRolesData();
		}
	}

	organizationChanged(org) {
		this.router.navigate([], {queryParams: {orgID: org.value ? org.value._id : org._id} , queryParamsHandling: 'merge'});
	}
    /*method to get Role*/
	getRolesData() {
		this.roleListSpinner = true;
		this.roleService.getData(this.selectedOrgId).pipe().subscribe(res => {
			this.roles = res;
			this.roleListSpinner = false;
			this.roles.forEach((list) => list.features = list.access.length);
			this.roleDataOptions = [
				{
					title: 'roleNane', key: 'name', hideTitle: true, type: 'label'
				},
				{
					title: 'Features', key: 'features'
				},
				{
					title: 'User Type', key: 'userType'
				}
			]
		}, (error: any) => {
			console.error('error', error);
			this.roleListSpinner = false;
		});
	}
//dialog of history
	openDialog(data) {
		this.roleService.getHistory().pipe().subscribe(res => {
			this.historyData = {
				header: [
					{ title: 'Name ' },
					{ title: 'Changed By' },
					{ title: 'Changed Date' }],
				keys: ['username', 'changedBy', 'changedDate'],
				content: res.data
			};
			const dialogRef = this.dialog.open(HistoryPopupComponent, {
				width: '450px',
				data: this.historyData
			});
			dialogRef.afterClosed().subscribe(result => {
				// TODO closed event
			});
		});
	}
   /*method to get department*/
	getDepartments() {
		this.departmentService.getDepartmentByOrg(`filter[_organisationId]=${this.selectedOrgId}` )
		.pipe().subscribe(res => {
				console.log('res', res)
			}, (error: any) => {
				console.error('error', error);
			});
	}

	tabSwitch(tabReq) {
		this.tabGroup.selectedIndex = tabReq.index;
		this.getRolesData()
	}
}
