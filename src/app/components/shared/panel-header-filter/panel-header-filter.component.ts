import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { OrganisationService } from '../../core/dashboard/organisation/organisation.service';

@Component({
  selector: 'app-panel-header-filter',
  templateUrl: './panel-header-filter.component.html',
  styleUrls: ['./panel-header-filter.component.scss']
})
export class PanelHeaderFilterComponent implements OnInit {
  organizations: any[] = [
    { value: 'organizations-1', viewValue: 'Organizations-1' },
    { value: 'organizations-2', viewValue: 'Organizations-2' },
    { value: 'organizations-3', viewValue: 'Organizations-3' }
  ];
  constructor(private organisationService: OrganisationService) { }
  @Output() selectOrganizaion = new EventEmitter();
  selectedOrg: any;
  ngOnInit() {
    this.getOrganiztions()
  }

  getOrganiztions() {
    this.organisationService.getOrganization()
      .pipe().subscribe(res => {
        this.selectedOrg = res[0]
        this.organizations = res;
      }, (error: any) => {
        console.error('error', error);
      })
  }

  organizationChanged(org) {
    console.log('org', org)
    this.selectOrganizaion.emit(org)
  }

}
