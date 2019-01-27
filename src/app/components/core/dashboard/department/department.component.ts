import { Component, OnInit ,ViewChild} from '@angular/core';
import { DepartmentService } from '../../../../services/department/department.service';
import { DepartmentData, TableOptions } from '../../../../interfaces/interfaces';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { HistoryPopupComponent } from '../../../../components/shared/history-popup/history-popup.component'

@Component({
	selector: 'app-department',
	templateUrl: './department.component.html',
	styleUrls: ['./department.component.scss']
})
export class DepartmentComponent implements OnInit {
	
	departments: any;
	departmentDataOptions = [];
	historyData: any;
	selectedOrgId: string;
	depListSpinner: boolean;

	constructor(private departmentService: DepartmentService,
    public dialog: MatDialog) { }

	ngOnInit() {
	}

	organizationChanged(org) {
		this.selectedOrgId = org._id;
		this.depListSpinner = true;
		this.departmentService.getAll(org._id).pipe().subscribe(res => {
			this.departments = res;
			this.depListSpinner = false;
			this.departments.forEach((list) => list.features = (list.access && list.access.length));
			this.departmentDataOptions = [
				{
					title: 'name', key: 'name', hideTitle: true, type: 'label'
				},
				{
					title: 'Features', key: 'features'
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
}
