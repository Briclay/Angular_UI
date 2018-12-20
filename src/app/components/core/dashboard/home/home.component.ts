import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../../../services/dashboard/dashboard.service';
import { ChartData } from '../../../../interfaces/interfaces';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private dashboardService: DashboardService) { }
  ChartData: ChartData[];
  ngOnInit() {
    this.dashboardService.getData().pipe().subscribe(res => {
      this.ChartData = res;
    });
  }

}
