import { Component, OnInit } from '@angular/core';
import { MatDialog,  MatSnackBar } from '@angular/material';
import { AuthService } from '../../../services/auth.service';
import { NotificationService } from '../../../services/notification/notification.service';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

	userAuth : any;
	userImage : any;
	userName : any;
	isLoading  = false;
	notificationsAll = []
	notifications = [
	{ 
		"id" : "1" ,
		"userName" : "Mohit",
		"message" : "Text here with the basic information of the message" ,
		"date" : "12/01/2018",
		"time" : "11.00am",
	    "newFlag": true,
	    "readFlag": false
	},
	{ 
		"id" : "2" ,
		"userName" : "Sonal Verma",
		"message" : "Text here with the basic information of the message" ,
		"date" : "12/01/2018",
		"time" : "8.25pm",
	    "newFlag": false,
	    "readFlag": true
	},
	{ 
		"id" : "3" ,
		"userName" : "Korshal",
		"message" : "Text here with the basic information of the message" ,
		"date" : "12/01/2018",
		"time" : "9.00am",
	    "newFlag": true,
	    "readFlag": false
	},
	{ 
		"id" : "4" ,
		"userName" : "Roshan",
		"message" : "Text here with the basic information of the message" ,
		"date" : "12/01/2018",
		"time" : "8.00am",
	    "newFlag": false,
	    "readFlag": true
	}
	]

	constructor(private auth: AuthService,
		private snackBar : MatSnackBar,
		private notificationService : NotificationService){}

	ngOnInit() {
		this.userAuth = JSON.parse(window.localStorage.getItem('authUser'));
		this.userName = this.userAuth.displayName ? this.userAuth.displayName : "";
		this.userImage = this.userAuth.profileImageUrl ? this.userAuth.profileImageUrl : "./assets/images/avatars/profile.jpg";
	    this.getAllNotification();
	}

	getAllNotification() {
		this.isLoading = true;
		this.notificationService.getAll().pipe().subscribe(response => {
			console.log(response, 'response.message')
			this.isLoading = false;
		}, (error: any) => {
			this.isLoading = false;
			this.snackBar.open(error.message, 'Notification', {
				duration: 2000,
			});
		});
	}

	updateNotification(row){
		let obj  = {
		    "newFlag": false,
		    "readFlag": true
		}
		this.notificationService.update(row.id, obj).pipe().subscribe(response => {
			console.log(response, 'response.message')
		}, (error: any) => {
			this.snackBar.open(error.message, 'Notification', {
				duration: 2000,
			});
		});
	}
}
