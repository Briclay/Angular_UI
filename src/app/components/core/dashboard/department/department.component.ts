import { Component, OnInit } from '@angular/core';
import { DepartmentService } from '../../../../services/department/department.service';
import { DepartmentData, TableOptions } from '../../../../interfaces/interfaces';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss']
})
export class DepartmentComponent implements OnInit {
		
  	departments: DepartmentData;
  	departmentDataOptions = [];

    constructor(private departmentService: DepartmentService) { }
	  ngOnInit() {
	    this.departmentService.getData().pipe().subscribe(res => {
	    this.departments = res;
			this.departmentDataOptions = [
		        {
		        	title: 'DepartmenName', key: 'departmentName', hideTitle: true, type: 'label'
		        }, 
		        {
					title: 'Features', key: 'features'
				}
			]
	    });
  	}
}
  		