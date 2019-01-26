import { Component, OnInit, ViewChild } from '@angular/core';
import { RoleService } from './/role.service';
import { RoleData } from './interfaces';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { HistoryPopupComponent } from '../../../../components/shared/history-popup/history-popup.component'
import { DepartmentService } from '../../../../services/department/department.service';

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

	constructor(
		private roleService: RoleService,
		public dialog: MatDialog,
		private departmentService: DepartmentService,

	) { }

	ngOnInit() {

	}

	organizationChanged(org) {
		this.getRolesData(org.value ? org.value._id : org._id)
	}

	getRolesData(orgId) {
		this.selectedOrgId = orgId;
		this.roleListSpinner = true;
		this.roleService.getData(orgId).pipe().subscribe(res => {
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
		this.getRolesData(tabReq.orgId)
	}
}
