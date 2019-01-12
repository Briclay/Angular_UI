import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WidgetService } from './../services/widget/widget.service';
import { UserDetailsComponent } from '../components/core/dashboard/user/user-details/user-details.component';
import { OrganisationDetailsComponent } from '../components/core/dashboard/organisation/organisation-details/organisation-details.component';
import { RoleDetailsComponent } from '../components/core/dashboard/role/role-details/role-details.component';
import { DepartmentDetailsComponent } from '../components/core/dashboard/department/department-details/department-details.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {MaterialModule} from "./material.module";
import {SpinnerModule} from "../components/shared/spinner/spinner.module";
import {WorkRequestDetailsComponent} from '../components/core/dashboard/work-request/work-request-details/work-request-details.component';
import {WorkOrderDetailsComponent} from '../components/core/dashboard/work-order/work-order-details/work-order-details.component';

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
    WorkOrderDetailsComponent
  ],
  exports: [
    UserDetailsComponent, 
    OrganisationDetailsComponent, 
    RoleDetailsComponent,
    DepartmentDetailsComponent, 
    WorkRequestDetailsComponent,
    WorkOrderDetailsComponent
  ],
  entryComponents: [
    UserDetailsComponent,
    OrganisationDetailsComponent,
    RoleDetailsComponent,
    DepartmentDetailsComponent,
    WorkRequestDetailsComponent,
    WorkOrderDetailsComponent
  ],
  providers: [WidgetService]
})
export class WidgetModule {}
