import { Component, OnInit } from '@angular/core';
import { OrganizationService } from '../../../../services/organization/organization.service';
import { OrganizationData, TableOptions } from '../../../../interfaces/interfaces';

@Component({
  selector: 'app-organisation',
  templateUrl: './organisation.component.html',
  styleUrls: ['./organisation.component.scss']
})

export class OrganisationComponent implements OnInit {
    
    organisations: OrganizationData;
    organisationDataOptions = [];

    constructor(private organisationService: OrganizationService) { }
    ngOnInit() {
      this.organisationService.getData().pipe().subscribe(res => {
      this.organisations = res;
     this.organisationDataOptions = [
        {title: 'orgName', key: 'orgName', hideTitle: true, type: 'label' 
        },
        {
          title: 'Plan', key: 'subsciption.plan',
        }, {
          title: 'Valid till', key: 'entities.validtill'
        }, {
          title: 'Entities', key: 'entities.count'
        }]
      });
    }
}
      