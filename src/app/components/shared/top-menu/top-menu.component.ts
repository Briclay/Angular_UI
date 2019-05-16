import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.scss']
})
export class TopMenuComponent implements OnInit {
  
  userDep : any;
  permission : any;
  constructor() {
      this.permission = JSON.parse(window.localStorage.getItem('permission'));
 }

  ngOnInit() {
    let authUserDepartment = JSON.parse(window.localStorage.authUserDepartment)
    this.userDep = authUserDepartment && authUserDepartment.name
  }

}
