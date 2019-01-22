
import {merge as observableMerge, Observable} from 'rxjs';
import {
  Component,
  OnInit,
  Input,
  ViewChild,
  Output,
  EventEmitter,
  ElementRef,
  OnChanges,
  AfterViewInit
} from '@angular/core';
import {MatTableDataSource, MatSort, MatPaginator} from '@angular/material';
import {MatSnackBar} from '@angular/material';

import {TableOptionHeader, TableOptions} from "../../../interfaces/interfaces";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-dynamic-table',
  templateUrl: './dynamic-table.component.html',
  styleUrls: ['./dynamic-table.component.scss'],
})
export class DynamicTableComponent implements OnInit, OnChanges, AfterViewInit {
  /**
   * Set the sort after the view init since this component will
   * be able to query its view for the initialized sort.
   */
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  @Input() config: TableOptions; // table options contains the header, content and keys
  @Input() filter: boolean;
  @Input() cssStyle: object; // { key: value }
  @Input() defaultSortColumn: string;
  @Input() defaultSortOrder: string; // 'asc' | 'desc';
  @Input() snackBarText: string;
  @Input() pagination: boolean;
  @Input() pageSizeOptions = [50, 100, 200];
  @Input() GACategory: string;
  @Input() disableSort: boolean;
  @Input() pageSize: number;

  @Output() rowClick = new EventEmitter();
  @Output() onDelete = new EventEmitter();
  @Output() onArchive = new EventEmitter();

  public dataSource: any;
  public queryParams: any;

  constructor(
    public snackBar: MatSnackBar,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    observableMerge(this.route.queryParams).subscribe(params => this.queryParams = params);
  }

  ngAfterViewInit() {
    this.sortDataInit();
  }

  handleRowClick(data) {
    this.rowClick.emit(data);
  }

  ngOnChanges() {
    console.log('config', this.config)
    if (this.config && this.config.content) {
       this.dataSource = new MatTableDataSource(this.config.content);
    }
    this.sortDataInit();
  }

  sortDataInit() {
    if (this.dataSource) {
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    }
  }

  applyFilter(filterValue: string) {
    if (this.dataSource) {
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }
  }


  public deleteItem(element, index): void {
    this.config.content.splice(index, 1);
    this.dataSource = new MatTableDataSource(this.config.content);
    this.onDelete.emit(this.config.content);
    this.dataSource.paginator = this.paginator;
  }

}
