import { Component,Input,Output, OnInit,ViewChild,OnChanges,EventEmitter} from '@angular/core';
import { MatPaginator,MatSort,PageEvent } from '@angular/material';

@Component({
	selector: 'app-panel-header-filter',
	templateUrl: './panel-header-filter.component.html',
	styleUrls: ['./panel-header-filter.component.scss']
})
export class PanelHeaderFilterComponent implements OnInit,OnChanges
 {
	@ViewChild(MatPaginator) paginator: MatPaginator;   
  	@Input() length: length;
  	@Input() public pageSizeOptions: number[];
  	@Input() public data: data;
  	@Output() public dataFilter: EventEmitter<any> = new EventEmitter<any>();

    pageSize : number;

	constructor() { }

    ngOnChanges(){
		this.length = this.data && this.data.length;
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
