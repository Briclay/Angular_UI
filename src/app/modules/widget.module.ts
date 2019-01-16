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

@NgModule({
  imports: [
    CommonModule, 
    MaterialModule, 
    ReactiveFormsModule, 
    FormsModule
  ],
  declarations: [
    UserDetailsComponent,
    OrganisationDetailsComponent,
    RoleDetailsComponent,
    DepartmentDetailsComponent,
    UserDashDetailsComponent
  ],
  exports: [UserDetailsComponent,UserDashDetailsComponent, OrganisationDetailsComponent, RoleDetailsComponent,DepartmentDetailsComponent],
  entryComponents: [
    UserDetailsComponent,
    OrganisationDetailsComponent,
    RoleDetailsComponent,
    DepartmentDetailsComponent,
    UserDashDetailsComponent
  ],
  providers: [WidgetService]
})
export class WidgetModule {}
