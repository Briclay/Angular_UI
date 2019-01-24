import { Component, OnInit, Input } from '@angular/core';
import { UserDashboardService } from '../../../../services/user-dashboard/user-dashboard.service';
import { UserDashboardData, TableOptions } from '../../../../interfaces/interfaces';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss']
})
export class UserDashboardComponent implements OnInit {
    userWorkOrderData: UserDashboardData;
    userWorkOrderDataOptions = [];

    constructor(private userDashboardService: UserDashboardService) { }
    ngOnInit() {
      this.userDashboardService.getData().pipe().subscribe(res => {
      this.userWorkOrderData = res;
      this.userWorkOrderDataOptions = [
        {
          title: 'workRequestID', key: 'workRequestID', hideTitle: true, type: 'label'
        }, 
        {
          title: 'workOrderID', key: 'workOrderID', hideTitle: true, type: 'label'
        },
        {
          title: 'typeOfWork', key: 'typeOfWork', hideTitle: true, type: 'label'
        },
        {
          title: 'project', key: 'project', hideTitle: true, type: 'label'
        },
        {
          title: 'package', key: 'package', hideTitle: true, type: 'label'
        },
        {
          title: 'needByDate', key: 'needByDate', hideTitle: true, type: 'label'
        }
      ]
      });
    }

}

