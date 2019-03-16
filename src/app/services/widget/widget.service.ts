import { Injectable, Type } from '@angular/core';
import { UserDetailsComponent } from '../../components/core/dashboard/user/user-details/user-details.component';
import { OrganisationDetailsComponent } from '../../components/core/dashboard/organisation/organisation-details/organisation-details.component';
import { RoleDetailsComponent } from '../../components/core/dashboard/role/role-details/role-details.component';
import { DepartmentDetailsComponent } from '../../components/core/dashboard/department/department-details/department-details.component';
import { WorkRequestDetailsComponent } from '../../components/core/dashboard/work-request/work-request-details/work-request-details.component';
import {WorkOrderDetailsComponent} from '../../components/core/dashboard/work-order/work-order-details/work-order-details.component';
import { UserDashDetailsComponent } from '../../components/core/dashboard/user-dashboard/user-dash-details/user-dash-details.component';
import { IssueTrackerDetailsComponent } from '../../components/core/dashboard/issue-tracker/issue-tracker-details/issue-tracker-details.component';
import { IssueTrackerCreateComponent } from '../../components/core/dashboard/issue-tracker/issue-tracker-create/issue-tracker-create.component';
import { DocumentListDetailsComponent } from '../../components/core/dashboard/document-list/document-list-details/document-list-details.component';
import { DocumentListMoreDetailsComponent } from '../../components/core/dashboard/document-list/document-list-details/document-list-more-details/document-list-more-details.component';
import { DocumentListCreateComponent } from '../../components/core/dashboard/document-list/document-list-create/document-list-create.component';
import { NcmDetailsComponent } from '../../components/core/dashboard/ncm/ncm-details/ncm-details.component';
import { OpportunityDetailsComponent } from '../../components/core/dashboard/ncm/ncm-details/opportunity-details/opportunity-details.component';
import { ContractConfigurationDetailComponent } from '../../components/core/dashboard/contract-configuration/contract-configuration-detail/contract-configuration-detail.component';
import { ContractConfigurationCreateComponent } from '../../components/core/dashboard/contract-configuration/contract-configuration-create/contract-configuration-create.component';
import { BpdListCreateComponent } from '../../components/core/dashboard/bpd-list/bpd-list-create/bpd-list-create.component';
@Injectable()
export class WidgetService {
	widgets: { [id: string]: Type<{}> } = {
		'app-user-details': UserDetailsComponent,
		'app-organisation-details': OrganisationDetailsComponent,
		'app-role-details': RoleDetailsComponent,
		'app-department-details': DepartmentDetailsComponent,
		'app-work-request-details': WorkRequestDetailsComponent,
		'app-work-order-details': WorkOrderDetailsComponent,
		'app-user-dash-details': UserDashDetailsComponent,
		'app-issue-tracker-details':IssueTrackerDetailsComponent,
		'app-issue-tracker-create' : IssueTrackerCreateComponent,
        'app-document-list-more-details':DocumentListMoreDetailsComponent,
        'app-document-list-details':DocumentListDetailsComponent,
        'app-document-list-create':DocumentListCreateComponent,
        'app-ncm-details':NcmDetailsComponent,
        'app-opportunity-details':OpportunityDetailsComponent,
        'app-contract-configuration-detail':ContractConfigurationDetailComponent,
        'app-contract-configuration-create':ContractConfigurationCreateComponent,
        'app-bpd-list-create':BpdListCreateComponent

	};
}
