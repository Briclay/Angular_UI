import { Component, OnInit } from '@angular/core';
import { RoleService } from './/role.service';
import { RoleData } from './interfaces';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss']
})

export class RoleComponent implements OnInit {
		
  	roles: RoleData;
  	roleDataOptions = [];
		roleListSpinner: boolean;

    constructor(private roleService: RoleService) { }
	  ngOnInit() {
	    
  	}

		organizationChanged(org) {
			this.roleListSpinner = true;
			this.roleService.getData(org._id).pipe().subscribe(res => {
	    this.roles = res;
			this.roleListSpinner = false;
			this.roleDataOptions = [
		        {
		        	title: 'roleNane', key: 'name', hideTitle: true, type: 'label'
		        }, 
		        {
					title: 'Features', key: 'features'
				},
				{
					title: 'Approvals', key: 'approvals'
				}
			]
			}, (error: any) => {
        console.error('error', error);
        this.roleListSpinner = false;
      });
		}
}
  		