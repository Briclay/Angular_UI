import { Component, OnInit ,ViewChild} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {merge as observableMerge, Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import { DocumentListService } from './document-list.service';

declare var moment: any;

@Component({
	selector: 'app-document-list',
	templateUrl: './document-list.component.html',
	styleUrls: ['./document-list.component.scss']
})

export class DocumentListComponent implements OnInit {
	@ViewChild('tabGroup') tabGroup;
	orgID:any;
	projectLoading  = false;
	projID:any;
	selectedProjData:any;
	documentListDataOptions =[];
	selectedProjId:any;
	
	
	list:any;
	depListSpinner: boolean;
	documentList  = [
	{

		name : "Architecture Drawing",
		createdDate : "14/02/2019",
		createdBy : "Test"
	},
	{

		name : "User 1",
		createdDate : "14/02/2019",
		createdBy : "Test1"
	}
	]

	private unsubscribe: Subject<any> = new Subject();
	constructor(  private route: ActivatedRoute,
		private router: Router,
		private documentListService: DocumentListService,) { 

		let orgDetails =  JSON.parse(window.localStorage.authUserOrganisation);
		this.orgID = orgDetails._id;

	}
	ngOnInit() {
		observableMerge(this.route.params, this.route.queryParams).pipe(
			takeUntil(this.unsubscribe))
		.subscribe((params) => this.loadRoute(params));
	         //moment(this.createdAt)
	     }
	     public ngOnDestroy(): void {
	     	this.unsubscribe.next();
	     	this.unsubscribe.complete();
	     }

	     loadRoute(params: any) {
	     	if('projectId' in params) {
	     		this.selectedProjId = params['projectId'];
	     		this.getDocumentListData( );
	     	}
	     }  		 


	     getDocumentListData() {
	     	/*this.projectLoading = true;*/ 
	     	this.depListSpinner = true;
	     	this.documentListService.getAll(this.selectedProjId,this.orgID).pipe().subscribe(res => {
	     		this.list = res;
	     		this.depListSpinner = false;
	     		console.log(res,"sdfsfsfdfffffff")
	     		
	     	}, (error: any) => {
	     		console.error('error', error);
	     		this.depListSpinner = false;
	     	});


	     	this.documentListDataOptions = [
	     	{
	     		title: 'name', key: 'name', hideTitle: true, type: 'label'
	     	},
	     	{
	     		title: 'createdDate', key: 'createdDate', hideTitle: true, type: 'label'
	     	},
	     	{
	     		title: 'createdBy', key: 'createdBy', hideTitle: true, type: 'label'
	     	},
	     	]
	     }

	     projectChanged(proj) {
	     	this.selectedProjData = proj.value;
	     	this.router.navigate([], { queryParams: { projectId: proj.value ? proj.value._id : proj._id }, queryParamsHandling: 'merge' });
            //this.selectedProjData=proj.value moment(new Date()).local().format("YYYY-MM-DD");
            console.log(proj, 'proj');
            this.selectedProjId=proj.value._id

        }
        tabSwitch(tabReq) {
        	this.tabGroup.selectedIndex = tabReq.index;
        	this.getDocumentListData()
        }

    }
