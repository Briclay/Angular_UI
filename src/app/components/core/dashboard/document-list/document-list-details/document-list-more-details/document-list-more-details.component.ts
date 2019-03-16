import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-document-list-more-details',
	templateUrl: './document-list-more-details.component.html',
	styleUrls: ['./document-list-more-details.component.scss']
})
/*export class DocumentListMoreDetailsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}*/
export class DocumentListMoreDetailsComponent implements OnInit {
	
	projectLoading  = false;
	projID:any;
	selectedProjId:any;
	documentListDataOptions :any;
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
	constructor( ) { 
		
	}
	ngOnInit() {
		this.getDocumentListData()

	}

	
	
	getDocumentListData() {
		/*this.projectLoading = true;*/
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
	
	

}

