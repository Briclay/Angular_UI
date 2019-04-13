import { Component, OnInit,Output, Input, ViewChild,EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {merge as observableMerge, Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import { NcmService } from './ncm.service';

@Component({
	selector: 'app-ncm',
	templateUrl: './ncm.component.html',
	styleUrls: ['./ncm.component.scss']
})

export class NcmComponent implements OnInit {
	@ViewChild('tabGroup') tabGroup;
	ncmListDataOptions : any;
	ncmListSpinner : boolean;
	orgID : string;
	ncmList : any;
	user : any;
	pageIndex : number = 0;
	pageSize : number = 5;
	private unsubscribe: Subject<any> = new Subject();

	constructor(
		private ncmService: NcmService,
		private route: ActivatedRoute,
		private router: Router) { }

	ngOnInit() {
    	this.user = JSON.parse(window.localStorage.authUser);
		// observableMerge(this.route.params, this.route.queryParams).pipe(
		// 	takeUntil(this.unsubscribe))
		// .subscribe((params) => this.loadRoute(params));
		this.getNcmListData()
	}
	public ngOnDestroy(): void {
		this.unsubscribe.next();
		this.unsubscribe.complete();
	}
	// loadRoute(params: any) {
	// 	if('projID' in params) {
	// 	this.selectedProjId = params['projID'];
	// 	this.getNcmListData();
	// 	}
	// 	this.getNcmListData();
	// } 

	dataPaginatorChange(event){
		this.pageIndex = event.pageIndex;
		this.pageSize = event.pageSize;
	}

	getNcmListData() {
		this.ncmListSpinner = true;
		this.ncmService.getNcm().pipe().subscribe(res => {
			this.ncmListSpinner = false;
			// res.length > 0 && res.forEach((list) => {
			// 	list.roleName = this.user._roleId.name;
			// })
			this.ncmList = res;
		})
		console.log(this.ncmList, 'ncmList')
		this.ncmListDataOptions = [
		{ title: 'UserName', key: 'user.name', hideTitle: true, type: 'label' },
		{ title: 'Department', key: 'depName' },
		{ title: 'Email', key: 'user.email' }]
	}

	tabSwitch(tabReq) {
		this.tabGroup.selectedIndex = tabReq.index;
		this.getNcmListData()
	}

}
