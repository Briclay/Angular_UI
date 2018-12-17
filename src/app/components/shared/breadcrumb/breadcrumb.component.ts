import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { distinctUntilChanged, filter, map } from 'rxjs/operators';
import {BreadCrumb} from "../../../interfaces/interfaces";
import {merge as observableMerge, Observable} from 'rxjs';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {
  breadcrumbs: BreadCrumb [];

  constructor(private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
  }
}
