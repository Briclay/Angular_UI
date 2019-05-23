import { Component, OnInit } from '@angular/core';
import { FeedbackComponent } from './feedback/feedback.component';
import { MatDialog,  MatSnackBar ,MAT_DIALOG_DATA } from '@angular/material';


@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
	features : any;
	constructor(private snackBar: MatSnackBar, 
		private dialog : MatDialog,) { 
		this.features = JSON.parse(window.localStorage.getItem('_features'));
	}

	ngOnInit() {
		this.openDetailsDialog();
		
	}
	openDetailsDialog() {
		let dialogRef = this.dialog.open(FeedbackComponent, {
			width: '700px',
			height:'540px',
      //data: vvv
  }).afterClosed()
		.subscribe(response => {
		});
	}
}
