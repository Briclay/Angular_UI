import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {
  
  userAuth : any;
  currentUserType : any;
  currentDepartmentName : any;
  coreViewOnly = false;
  access : any;
  superadminAccess = false;
  allAccess = [
      {
        "_id": "5c4c8684fa54e07be980eb7a",
        "resources": "/departments",
        "name" : "Department"
            
      },
      {
        "_id": "5c4c8684fa54e07be980eb7a",
        "resources": "/roles",
        "name" : "Role"
            
      },
      {
        "_id": "5c4c8684fa54e07be980eb7a",
        "resources": "/organisations",
        "name" : "Organisation"
            
      },
      {
        "_id": "5c4c8684fa54e07be980eb7a",
        "resources": "/users",
        "name" : "User"
      },
      {
        "_id": "5c4c8684fa54e07be980eb7a",
        "resources": "/projects",
        "name" : "Project"
      }
  ]

	constructor() { 
    this.access = JSON.parse(window.localStorage.getItem('access'));
    console.log(this.access,"this.access")
    this.userAuth = JSON.parse(window.localStorage.getItem('authUser'));
    this.currentUserType = this.userAuth.userType.toLowerCase().replace(/\s+/g, '-');
    this.currentDepartmentName = this.userAuth._departmentId.name.toLowerCase().replace(/\s+/g, '-');
	}

	ngOnInit() {
    if (this.currentUserType === "admin" && this.currentDepartmentName === "design"){
      this.coreViewOnly = true;
    }
    if(this.currentUserType === "superadmin"){
      this.superadminAccess = true;
      console.log( this.superadminAccess)
    }
  }
}
