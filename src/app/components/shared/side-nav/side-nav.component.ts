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
  permission : any;
  otherModuleView =false;
  superadminAccess = false;
  dasbhaords = [ 'design', 'user','contracts','operations', 'ncm' ]
  dasbhaordByDep : any;
  hideAccess = false;
  userAccess : any;
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
    this.permission = JSON.parse(window.localStorage.getItem('access'));
    let allPermission = this.generatePermissions();
    console.log(allPermission, 'allPermission')
    window.localStorage.setItem('permission', JSON.stringify(allPermission));
    this.userAuth = JSON.parse(window.localStorage.getItem('authUser'));
    this.currentUserType = this.userAuth && this.userAuth.userType.toLowerCase().replace(/\s+/g, '-');
    this.currentDepartmentName =  this.userAuth && this.userAuth._departmentId.name.toLowerCase().replace(/\s+/g, '-');
	
    this.dasbhaords.forEach(v =>{
      if(v === this.currentDepartmentName){
        this.dasbhaordByDep = this.currentDepartmentName;
        console.log(this.dasbhaordByDep,'this.dasbhaordByDep')
      }
      else if(this.currentDepartmentName === 'test-depratment'){
        this.dasbhaordByDep = 'ncm';
      }
    })
  }

	ngOnInit() {
    if (this.currentUserType === "admin" && this.currentDepartmentName === "design"){
      this.coreViewOnly = true;
    }
    if(this.currentUserType === "user" ){
      let array = []
      this.permission.forEach(p => {
        this.allAccess.forEach(ac => {
          if(p._featureId.name === ac.name){
            array.push(p)
            this.access = array;
          }
        })
      })
      this.coreViewOnly = false;
      //this.hideAccess = false;
    }
    else{
      this.permission && this.permission.length > 0 && this.permission.forEach(v => {
        if(v._featureId.name === "Folder" || v._featureId.name === "File"){
          console.log('v')
        }
        else{
          this.access.push(v)
        }
      })
    }
  }

 generatePermissions () {
    const permissions = {};
    this.permission.forEach(f => {
        const returnObj = {};
        const resources = f.rules;
        resources.forEach(resource => {
          const url = resource.resources;
          let urlType = 'ALL';
          if (url.indexOf(':') !== -1) {
            urlType = 'ONE';
          }
          returnObj[urlType] = {};
          resource.permissions.filter(p => p.defaultFlag).forEach(p => {
            const action = p.reqKey;
            returnObj[urlType][action] = url;
          });
        });
      let feature = f._featureId ? f._featureId.name :'Organisation';
      permissions[feature] = returnObj;
    });
    return permissions;
  };
}
