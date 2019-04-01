import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WidgetService } from './../services/widget/widget.service';
import { UserDetailsComponent } from '../components/core/dashboard/user/user-details/user-details.component';
import { OrganisationDetailsComponent } from '../components/core/dashboard/organisation/organisation-details/organisation-details.component';
import { RoleDetailsComponent } from '../components/core/dashboard/role/role-details/role-details.component';
import { DepartmentDetailsComponent } from '../components/core/dashboard/department/department-details/department-details.component';
import { UserDashDetailsComponent } from '../components/core/dashboard/user-dashboard/user-dash-details/user-dash-details.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {MaterialModule} from "./material.module";
import {SpinnerModule} from "../components/shared/spinner/spinner.module";
import {WorkRequestDetailsComponent} from '../components/core/dashboard/work-request/work-request-details/work-request-details.component';
import {WorkOrderDetailsComponent} from '../components/core/dashboard/work-order/work-order-details/work-order-details.component';
import {IssueTrackerDetailsComponent} from '../components/core/dashboard/inter-department-tracker/inter-department-tracker-details/inter-department-tracker-details.component';
import { DocumentListDetailsComponent } from '../components/core/dashboard/document-list/document-list-details/document-list-details.component';
import { DocumentListMoreDetailsComponent } from '../components/core/dashboard/document-list/document-list-details/document-list-more-details/document-list-more-details.component';
import { DocumentListCreateComponent } from '../components/core/dashboard/document-list/document-list-create/document-list-create.component';
import { NcmDetailsComponent } from '../components/core/dashboard/ncm/ncm-details/ncm-details.component';
import { NcmCreateComponent } from '../components/core/dashboard/ncm/ncm-create/ncm-create.component';
import { OpportunityDetailsComponent } from '../components/core/dashboard/ncm/ncm-details/opportunity-details/opportunity-details.component';
import { ContractConfigurationDetailComponent } from '../components/core/dashboard/contract-configuration/contract-configuration-detail/contract-configuration-detail.component';
import { ContractConfigurationCreateComponent } from '../components/core/dashboard/contract-configuration/contract-configuration-create/contract-configuration-create.component';
import { BpdListCreateComponent } from '../components/core/dashboard/bpd-list/bpd-list-create/bpd-list-create.component';
import { ProjectCreateComponent } from '../components/core/dashboard/projects/project-create/project-create.component';
import { NewComponent } from '../components/core/login/new/new.component';
import { ContractManagementDetailsComponent } from '../components/core/dashboard/contract-management-dashboard/contract-management-details/contract-management-details.component';


@NgModule({
  imports: [
    CommonModule, 
    MaterialModule, 
    ReactiveFormsModule, 
    FormsModule,
    SpinnerModule
  ],
  declarations: [
    UserDetailsComponent,
    OrganisationDetailsComponent,
    RoleDetailsComponent,
    DepartmentDetailsComponent,
    WorkRequestDetailsComponent,
    WorkOrderDetailsComponent,
    UserDashDetailsComponent,
    IssueTrackerDetailsComponent,
    DocumentListDetailsComponent,
    DocumentListMoreDetailsComponent,
    DocumentListCreateComponent,
    NcmDetailsComponent,
    NcmCreateComponent,
    OpportunityDetailsComponent,
    ContractConfigurationDetailComponent,
    ContractConfigurationCreateComponent,
    BpdListCreateComponent,
    ProjectCreateComponent,
    NewComponent,
    ContractManagementDetailsComponent
  ],
  exports: [
    UserDetailsComponent, 
    OrganisationDetailsComponent, 
    RoleDetailsComponent,
    DepartmentDetailsComponent, 
    WorkRequestDetailsComponent,
    WorkOrderDetailsComponent,
    UserDashDetailsComponent,
    IssueTrackerDetailsComponent,
    DocumentListDetailsComponent,
    DocumentListMoreDetailsComponent,
    DocumentListCreateComponent,
    NcmDetailsComponent,
    NcmCreateComponent,
    OpportunityDetailsComponent,
    ContractConfigurationDetailComponent,
    ContractConfigurationCreateComponent,
    BpdListCreateComponent,
    ProjectCreateComponent,
    NewComponent,
    ContractManagementDetailsComponent
  ],
  entryComponents: [
    UserDetailsComponent,
    OrganisationDetailsComponent,
    RoleDetailsComponent,
    DepartmentDetailsComponent,
    WorkRequestDetailsComponent,
    WorkOrderDetailsComponent,
    UserDashDetailsComponent,
    IssueTrackerDetailsComponent,
    DocumentListDetailsComponent,
    DocumentListMoreDetailsComponent,
    DocumentListCreateComponent,
    NcmDetailsComponent,
    NcmCreateComponent,
    OpportunityDetailsComponent,
    ContractConfigurationDetailComponent,
    ContractConfigurationCreateComponent,
    BpdListCreateComponent,
    ProjectCreateComponent,
    NewComponent,
    ContractManagementDetailsComponent
  ],
  providers: [WidgetService]
})
export class WidgetModule {}
