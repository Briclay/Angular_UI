import { Component, OnInit ,ViewChild} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {merge as observableMerge, Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
	selector: 'app-ncm',
	templateUrl: './ncm.component.html',
	styleUrls: ['./ncm.component.scss']
})
export class NcmComponent implements OnInit {
	@ViewChild('tabGroup') tabGroup;
	ncmListDataOptions :any;
	ncmListSpinner : boolean;
	ncmList  = [
	{

		username : "Vinay Kerur",
		userType : "Admin",
		department : "Operation",
		email:"xyz@weer.com"
	},
	{

		username : "Raj",
		userType : "Admin",
		department : "Design",
		email:"xyz@weer.com"
	}
	]


	private unsubscribe: Subject<any> = new Subject();
	constructor( private route: ActivatedRoute,
		private router: Router,) { }

	ngOnInit() {observableMerge(this.route.params, this.route.queryParams).pipe(
		takeUntil(this.unsubscribe))
	.subscribe((params) => this.loadRoute(params));
	this.getNcmListData()
}
public ngOnDestroy(): void {
	this.unsubscribe.next();
	this.unsubscribe.complete();
}
loadRoute(params: any) {
	if('projID' in params) {
		//this.selectedProjId = params['projID'];
		this.getNcmListData();
	}
} 

getNcmListData() {
	/*this.projectLoading = true;*/


	this.ncmListDataOptions =[
	
	{
		title: 'User Name', type: 'list', list: [
		{ title: 'UserName', key: 'username', hideTitle: true, type: 'label' }
		]
	},
	{ title: 'Role', key: 'userType' },
	{ title: 'Department', key: 'department' },
	{ title: 'Email', key: 'email' }]
}

tabSwitch(tabReq) {
	this.tabGroup.selectedIndex = tabReq.index;
	this.getNcmListData()
}

}
