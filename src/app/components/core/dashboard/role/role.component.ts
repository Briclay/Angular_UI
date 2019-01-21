import { Component, OnInit } from '@angular/core';
import { RoleService } from '../../../../services/role/role.service';
import { RoleData, TableOptions } from '../../../../interfaces/interfaces';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { HistoryPopupComponent } from '../../../../components/shared/history-popup/history-popup.component'

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss']
})

export class RoleComponent implements OnInit {
		
  	roles: RoleData;
  	roleDataOptions = [];
  	historyData: any;

    constructor(private roleService: RoleService,
    	    public dialog: MatDialog) { }
	  ngOnInit() {
	    this.roleService.getData().pipe().subscribe(res => {
	    this.roles = res;
			this.roleDataOptions = [
		        {
		        	title: 'name', key: 'name', hideTitle: true, type: 'label'
		        }, 
		        {
					title: 'Features', key: 'features'
				},
				{
					title: 'Approvals', key: 'approvals'
				}
			]
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
}
  		