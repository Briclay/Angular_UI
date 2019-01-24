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
	
	departments: DepartmentData;
	departmentDataOptions = [];
	historyData: any;

	constructor(private departmentService: DepartmentService,
    public dialog: MatDialog) { }


	ngOnInit() {
		this.departmentService.getAll().pipe().subscribe(res => {
			this.departments = res;
			this.departmentDataOptions = [
			{
				title: 'name', key: 'name', hideTitle: true, type: 'label'
			}, 
			{
				title: 'Features', key: 'aaa'
			}
			]
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
