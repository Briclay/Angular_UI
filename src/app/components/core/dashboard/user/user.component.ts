import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../services/user/user.service'
import { UserData, TableOptions } from '../../../../interfaces/interfaces';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  users: UserData;
  userDataOptions: TableOptions;
  
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userDataOptions = { header: [], keys: [], content: [] };
    this.userService.getUser().pipe().subscribe(res => {
      this.users = res;
      this.userDataOptions = {
          header: [
            {title: 'User Name'}, 
            {title: 'Role'},
            {title: 'Department'},
            {title: 'EmailId'}, 
            {title: 'Mobile'}, 
            {title: 'CreatedBy'}, 
            {title: 'Created Date'}, 
            {title: '', type: 'icon', iconType: 'remove'}],
          keys: ['username', 'userType', 'department', 'email', 'phone', 'createdAt'],
          content: res.data
        };
    });
  }

}
