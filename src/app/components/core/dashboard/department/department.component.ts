import { Component, OnInit ,ViewChild} from '@angular/core';
import { DepartmentService } from '../../../../services/department/department.service';
import { DepartmentData, TableOptions } from '../../../../interfaces/interfaces';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { HistoryPopupComponent } from '../../../../components/shared/history-popup/history-popup.component'
import {merge as observableMerge, Subject} from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import {takeUntil} from 'rxjs/operators';

@Component({
	selector: 'app-department',
	templateUrl: './department.component.html',
	styleUrls: ['./department.component.scss']
})
export class DepartmentComponent implements OnInit {
	@ViewChild('tabGroup') tabGroup;

	departments: any;
	departmentDataOptions = [];
	historyData: any;
	selectedOrgId: string;
	depListSpinner: boolean;
    featuresCount : any;
	private unsubscribe: Subject<any> = new Subject();

	constructor(private departmentService: DepartmentService,
    public dialog: MatDialog,
    private router: Router,
    	private route: ActivatedRoute) { }

	ngOnInit() {
		observableMerge(this.route.params, this.route.queryParams).pipe(
      	takeUntil(this.unsubscribe))
      	.subscribe((params) => this.loadRoute(params));

	}

	public ngOnDestroy(): void {
		this.unsubscribe.next();
		this.unsubscribe.complete();
	}

	loadRoute(params: any) {
		if('orgID' in params) {
			this.selectedOrgId = params['orgID'];
			this.getDepartmentData();
		}
	}

	organizationChanged(org) {
		this.router.navigate([], {queryParams: {orgID: org.value ? org.value._id : org._id} , queryParamsHandling: 'merge'});
	}

	getDepartmentData() {
		this.depListSpinner = true;
		this.departmentService.getAll(this.selectedOrgId).pipe().subscribe(res => {
			this.departments = res;
			this.depListSpinner = false;
			var flength = 
			flength = this.departments.forEach((list) => {
				return (list._features && list._features.length)
			});
			this.departmentDataOptions = [
				{
					title: 'name', key: 'name', hideTitle: true, type: 'label'
				},
				{
					title: 'Features', key: 'flength'
				}
			]
		}, (error: any) => {
			console.error('error', error);
			this.depListSpinner = false;
		});
	}

	openDialog(data) {
		this.departmentService.getHistory().pipe().subscribe(res => {
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
		this.getDepartmentData()
	}
}
