import { Component, OnInit } from '@angular/core';
import { RoleService } from '../../../../services/role/role.service';
import { RoleData, TableOptions } from '../../../../interfaces/interfaces';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss']
})

export class RoleComponent implements OnInit {
		
  	roles: RoleData;
  	roleDataOptions = [];

    constructor(private roleService: RoleService) { }
	  ngOnInit() {
	    this.roleService.getData().pipe().subscribe(res => {
	      this.roles = res;
			this.roleDataOptions = [
		        {
		        	title: 'roleNane', key: 'roleNane', hideTitle: true, type: 'label'
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
}
  		