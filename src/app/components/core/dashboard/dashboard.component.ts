import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
	features : any;
	constructor() { 
	    this.features = JSON.parse(window.localStorage.getItem('_features'));
	}

  	ngOnInit() {
  	}

}
