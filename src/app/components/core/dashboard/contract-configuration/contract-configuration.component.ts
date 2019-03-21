import { Component, OnInit ,ViewChild} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {merge as observableMerge, Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-contract-configuration',
  templateUrl: './contract-configuration.component.html',
  styleUrls: ['./contract-configuration.component.scss']
})
export class ContractConfigurationComponent implements OnInit {
	

  constructor(private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
  }

}
