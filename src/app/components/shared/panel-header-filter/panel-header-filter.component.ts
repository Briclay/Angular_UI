import { Component,Input,Output, OnInit,ViewChild,OnChanges,EventEmitter} from '@angular/core';
import { MatPaginator,MatSort,PageEvent } from '@angular/material';

@Component({
	selector: 'app-panel-header-filter',
	templateUrl: './panel-header-filter.component.html',
	styleUrls: ['./panel-header-filter.component.scss']
})
export class PanelHeaderFilterComponent implements OnInit,OnChanges{
	@ViewChild(MatPaginator) paginator: MatPaginator;   
  	@Input() public pageSizeOptions: number[];
  	@Input() public data: any;
  	//@Input() public length: any;
  	@Output() public dataFilter: EventEmitter<any> = new EventEmitter<any>();
    
    pageIndex : number;
    pageSize : number;
    length : any
	constructor() { }

    ngOnChanges(){
    	if(this.data && this.data.length > 0){
			this.length = this.data
    	}
		//this.length = this.data && this.data.length;
		this.pageSize = this.pageSize;
		this.pageSizeOptions = [5, 10, 25, 100];
    }

    filterdData(event){
	    this.dataFilter.emit(event)
	}
    
	ngOnInit() {
		//console.log(this.data, 'this.dataSource')
	}

	setPageSizeOptions(setPageSizeOptionsInput: string) {
		this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
	}
}
