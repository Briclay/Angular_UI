import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-operations-dashboard',
  templateUrl: './operations-dashboard.component.html',
  styleUrls: ['./operations-dashboard.component.scss']
})
export class OperationsDashboardComponent implements OnInit {
	 user: any;
	 userId : any;
	 usrType : any;
  orgData : any;
   orgID : any;
  userName : any;
    roleName : any;
     profileImageUrl = "";

  constructor() {
  this.user = JSON.parse(window.localStorage.getItem('authUser')); 
      this.userId = this.user._id;
      this.usrType = this.user.userType;
      this.userName = this.user.displayName;
      this.roleName = this.user._roleId.name;
      this.profileImageUrl = this.user.profileImageUrl ? this.user.profileImageUrl : "./assets/images/avatars/profile.jpg";
      this.orgData = JSON.parse(window.localStorage.getItem('authUserOrganisation'));
      this.orgID = this.orgData._id; }

  ngOnInit() {
  }

}
