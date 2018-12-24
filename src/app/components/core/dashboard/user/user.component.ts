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
  userDataOptions = [];

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getUser().pipe().subscribe(res => {
      this.users = res;
      this.userDataOptions = [
        {
          title: 'Image', key: 'profileImageUrl', hideTitle: true, type: 'image'
        },
        {
          title: 'User Name', type: 'list', list: [
            { title: 'UserName', key: 'username', hideTitle: true, type: 'label' },
            { title: 'Address', key: 'address.city', hideTitle: true, type: 'label' }
          ]
        },
        { title: 'Role', key: 'userType' },
        { title: 'Department', key: 'department' },
        { title: 'Email', key: 'email' }]
    });
  }

}
