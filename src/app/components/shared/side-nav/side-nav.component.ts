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
  access =[];
  otherModuleView =false;
  superadminAccess = false;
  dasbhaords = [ 'design', 'user','contracts','operations' ]
  dasbhaordByDep : any;
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
    let permission = JSON.parse(window.localStorage.getItem('access'));
    permission && permission.length > 0 && permission.forEach(v => {
     if(v._featureId.name === "Folder" || v._featureId.name === "File"){
       console.log('v')
     }
     else{
      this.access.push(v)
     }
    })
    console.log(this.access,"this.access")
    this.userAuth = JSON.parse(window.localStorage.getItem('authUser'));
    this.currentUserType = this.userAuth && this.userAuth.userType.toLowerCase().replace(/\s+/g, '-');
    this.currentDepartmentName =  this.userAuth && this.userAuth._departmentId.name.toLowerCase().replace(/\s+/g, '-');
	
    this.dasbhaords.forEach(v =>{
      if(v === this.currentDepartmentName){
        this.dasbhaordByDep = this.currentDepartmentName;
        console.log(this.dasbhaordByDep,'this.dasbhaordByDep')
      }
    })
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
