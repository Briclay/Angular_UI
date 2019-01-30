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
  dashboardViewOnly = false;
  coreViewOnly = false;
  
  allfeatures : any[] = [
    {
      "description": "Organisation feature to manage organisations update activity",
      "deleteFlag": false,
      "activeFlag": true,
      "_id": "5c4c8677fa54e07be980eb72",
      "name": "Organisation",
      "baseRoute": "/organisations",
      "rules": [
      {
        "permissions": [
        {
          "_id": "5c4c8677fa54e07be980eb79",
          "userKey": "List",
          "reqKey": "GET",
          "defaultFlag": false
        },
        {
          "_id": "5c4c8677fa54e07be980eb78",
          "userKey": "Save",
          "reqKey": "POST",
          "defaultFlag": false
        }
        ],
        "_id": "5c4c8677fa54e07be980eb77",
        "resources": "/organisations"
      },
      {
        "permissions": [
        {
          "_id": "5c4c8677fa54e07be980eb76",
          "userKey": "View",
          "reqKey": "GET",
          "defaultFlag": true
        },
        {
          "_id": "5c4c8677fa54e07be980eb75",
          "userKey": "Update",
          "reqKey": "PUT",
          "defaultFlag": false
        },
        {
          "_id": "5c4c8677fa54e07be980eb74",
          "userKey": "Delete",
          "reqKey": "DELETE",
          "defaultFlag": false
        }
        ],
        "_id": "5c4c8677fa54e07be980eb73",
        "resources": "/organisations/:id"
      }
      ],
      "createdAt": "2019-01-26T16:10:31.327Z",
      "updatedAt": "2019-01-26T16:10:31.327Z",
      "__v": 0
    },
    {
      "description": "Department feature to manage departments update activity",
      "deleteFlag": false,
      "activeFlag": true,
      "_id": "5c4c8684fa54e07be980eb7a",
      "name": "Department",
      "baseRoute": "/departments",
      "rules": [
      {
        "permissions": [
        {
          "_id": "5c4c8684fa54e07be980eb81",
          "userKey": "List",
          "reqKey": "GET",
          "defaultFlag": true
        },
        {
          "_id": "5c4c8684fa54e07be980eb80",
          "userKey": "Save",
          "reqKey": "POST",
          "defaultFlag": false
        }
        ],
        "_id": "5c4c8684fa54e07be980eb7f",
        "resources": "/departments"
      },
      {
        "permissions": [
        {
          "_id": "5c4c8684fa54e07be980eb7e",
          "userKey": "View",
          "reqKey": "GET",
          "defaultFlag": true
        },
        {
          "_id": "5c4c8684fa54e07be980eb7d",
          "userKey": "Update",
          "reqKey": "PUT",
          "defaultFlag": false
        },
        {
          "_id": "5c4c8684fa54e07be980eb7c",
          "userKey": "Delete",
          "reqKey": "DELETE",
          "defaultFlag": false
        }
        ],
        "_id": "5c4c8684fa54e07be980eb7b",
        "resources": "/departments/:id"
      }
      ],
      "createdAt": "2019-01-26T16:10:44.411Z",
      "updatedAt": "2019-01-26T16:10:44.411Z",
      "__v": 0
    },
    {
      "description": "Role feature to manage roles update activity",
      "deleteFlag": false,
      "activeFlag": true,
      "_id": "5c4c868dfa54e07be980eb82",
      "name": "Role",
      "baseRoute": "/roles",
      "rules": [
      {
        "permissions": [
        {
          "_id": "5c4c868dfa54e07be980eb89",
          "userKey": "List",
          "reqKey": "GET",
          "defaultFlag": true
        },
        {
          "_id": "5c4c868dfa54e07be980eb88",
          "userKey": "Save",
          "reqKey": "POST",
          "defaultFlag": false
        }
        ],
        "_id": "5c4c868dfa54e07be980eb87",
        "resources": "/roles"
      },
      {
        "permissions": [
        {
          "_id": "5c4c868dfa54e07be980eb86",
          "userKey": "View",
          "reqKey": "GET",
          "defaultFlag": true
        },
        {
          "_id": "5c4c868dfa54e07be980eb85",
          "userKey": "Update",
          "reqKey": "PUT",
          "defaultFlag": false
        },
        {
          "_id": "5c4c868dfa54e07be980eb84",
          "userKey": "Delete",
          "reqKey": "DELETE",
          "defaultFlag": false
        }
        ],
        "_id": "5c4c868dfa54e07be980eb83",
        "resources": "/roles/:id"
      }
      ],
      "createdAt": "2019-01-26T16:10:53.183Z",
      "updatedAt": "2019-01-26T16:10:53.183Z",
      "__v": 0
    },
    {
      "description": "User feature to manage users update activity",
      "deleteFlag": false,
      "activeFlag": true,
      "_id": "5c4c8697fa54e07be980eb8a",
      "name": "User",
      "baseRoute": "/users",
      "rules": [
      {
        "permissions": [
        {
          "_id": "5c4c8697fa54e07be980eb91",
          "userKey": "List",
          "reqKey": "GET",
          "defaultFlag": true
        },
        {
          "_id": "5c4c8697fa54e07be980eb90",
          "userKey": "Save",
          "reqKey": "POST",
          "defaultFlag": false
        }
        ],
        "_id": "5c4c8697fa54e07be980eb8f",
        "resources": "/users"
      },
      {
        "permissions": [
        {
          "_id": "5c4c8697fa54e07be980eb8e",
          "userKey": "View",
          "reqKey": "GET",
          "defaultFlag": true
        },
        {
          "_id": "5c4c8697fa54e07be980eb8d",
          "userKey": "Update",
          "reqKey": "PUT",
          "defaultFlag": false
        },
        {
          "_id": "5c4c8697fa54e07be980eb8c",
          "userKey": "Delete",
          "reqKey": "DELETE",
          "defaultFlag": false
        }
        ],
        "_id": "5c4c8697fa54e07be980eb8b",
        "resources": "/users/:id"
      }
      ],
      "createdAt": "2019-01-26T16:11:03.371Z",
      "updatedAt": "2019-01-26T16:11:03.371Z",
      "__v": 0
    },
    {
      "description": "Project feature to manage projects update activity",
      "deleteFlag": false,
      "activeFlag": true,
      "_id": "5c4c86a9fa54e07be980eb92",
      "name": "Project",
      "baseRoute": "/projects",
      "rules": [
      {
        "permissions": [
        {
          "_id": "5c4c86a9fa54e07be980eb99",
          "userKey": "List",
          "reqKey": "GET",
          "defaultFlag": true
        },
        {
          "_id": "5c4c86a9fa54e07be980eb98",
          "userKey": "Save",
          "reqKey": "POST",
          "defaultFlag": false
        }
        ],
        "_id": "5c4c86a9fa54e07be980eb97",
        "resources": "/projects"
      },
      {
        "permissions": [
        {
          "_id": "5c4c86a9fa54e07be980eb96",
          "userKey": "View",
          "reqKey": "GET",
          "defaultFlag": true
        },
        {
          "_id": "5c4c86a9fa54e07be980eb95",
          "userKey": "Update",
          "reqKey": "PUT",
          "defaultFlag": false
        },
        {
          "_id": "5c4c86a9fa54e07be980eb94",
          "userKey": "Delete",
          "reqKey": "DELETE",
          "defaultFlag": false
        }
        ],
        "_id": "5c4c86a9fa54e07be980eb93",
        "resources": "/projects/:id"
      }
      ],
      "createdAt": "2019-01-26T16:11:21.886Z",
      "updatedAt": "2019-01-26T16:11:21.886Z",
      "__v": 0
    }
  ]
	constructor() { 
    //this.allfeatures = JSON.parse(window.localStorage.getItem('_features'));
    this.userAuth = JSON.parse(window.localStorage.getItem('authUser'));
    this.currentUserType = this.userAuth.userType;
    this.currentDepartmentName = this.userAuth._departmentId.name;
    console.log(this.allfeatures, "allfeatures")
	}

	ngOnInit() {
    if (this.currentUserType === "user" && this.currentDepartmentName === "design"){
      this.coreViewOnly = true;
    }
	}
}
