import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DynamicTableComponent } from './components/shared/dynamic-table/dynamic-table.component';
import { LoginComponent } from './components/core/login/login.component';
import { DashboardComponent } from './components/core/dashboard/dashboard.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { UserComponent } from './components/core/dashboard/user/user.component';
import { SideNavComponent } from './components/shared/side-nav/side-nav.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { BreadcrumbComponent } from './components/shared/breadcrumb/breadcrumb.component';
import { ProjectsComponent } from './components/core/dashboard/projects/projects.component';
import { SettingsComponent } from './components/core/dashboard/settings/settings.component';
import { HomeComponent } from './components/core/dashboard/home/home.component';
import { BarChartComponent } from './components/shared/bar-chart/bar-chart.component';
import { D3Service } from 'd3-ng2-service';
import { DashboardService } from './services/dashboard/dashboard.service';
import { OrganizationService } from './services/organization/organization.service';
import { UserDashboardService } from './services/user-dashboard/user-dashboard.service';
import { DepartmentService } from './services/department/department.service';
import { ExpansionPanelComponent } from './components/shared/expansion-panel/expansion-panel.component';
import { UserCreateComponent } from './components/core/dashboard/user/user-create/user-create.component';
import { WidgetContainerComponent } from './components/shared/widget-container/widget-container.component';
import { OrganisationComponent } from './components/core/dashboard/organisation/organisation.component';
import { RoleComponent } from './components/core/dashboard/role/role.component';
import { PanelHeaderFilterComponent } from './components/shared/panel-header-filter/panel-header-filter.component';
import { WorkRequestComponent } from './components/core/dashboard/work-request/work-request.component';
import { ProjectModule } from './components/core/dashboard/projects/projects.module'
import { OrganisationCreateComponent } from './components/core/dashboard/organisation/organisation-create/organisation-create.component';
import { RoleCreateComponent } from './components/core/dashboard/role/role-create/role-create.component';
import { DepartmentComponent } from './components/core/dashboard/department/department.component';
import { UserDashboardComponent } from './components/core/dashboard/user-dashboard/user-dashboard.component';
import { NcmDashboardComponent } from './components/core/dashboard/ncm-dashboard/ncm-dashboard.component';
import { UserDashDetailsComponent } from './components/core/dashboard/user-dashboard/user-dash-details/user-dash-details.component';
import { FileManagerComponent } from './components/core/dashboard/file-manager/file-manager.component';
import { FileManagerConfigComponent } from './components/core/dashboard/file-manager/file-manager-config/file-manager-config.component';
import { FolderCreateDialogComponent } from './components/core/dashboard/file-manager/folder-create-dialog/folder-create-dialog.component';
import { WorkOrderComponent } from './components/core/dashboard/work-order/work-order.component';
import { FileShareDialogComponent } from './components/core/dashboard/file-manager/file-share-dialog/file-share-dialog.component'
import { FileMailDialogComponent } from './components/core/dashboard/file-manager/file-mail-dialog/file-mail-dialog.component'


//  all Briclay project Modules imports below
import { WorkOrderModule } from './components/core/dashboard/work-order/work-order.module';
import { RoleModule } from './components/core/dashboard/role/role.module';
import { SpinnerModule } from './components/shared/spinner/spinner.module';
import { MaterialModule } from "./modules/material.module";
import { WidgetModule } from "./modules/widget.module";
import { FileManagerModule } from './components/core/dashboard/file-manager/file-manager.module';
import { WorkRequestModule } from './components/core/dashboard/work-request/work-request.module';

import { HistoryPopupComponent } from './components/shared/history-popup/history-popup.component';
import { DesignDashboardComponent } from './components/core/dashboard/design-dashboard/design-dashboard.component';
import { FeaturePopupComponent } from './components/shared/feature-popup/feature-popup.component';
import { ForgotPasswordComponent } from './components/core/forgot-password/forgot-password.component';
import { ConfirmDialogComponent } from './components/shared/confirm-dialog/confirm-dialog.component';

import { LocalStorageSchema } from './schemas/local-storage.schema';
import { ProjectDatesComponent } from './components/core/dashboard/projects/project-dates/project-dates.component';
import { ProjectDetailsComponent } from './components/core/dashboard/projects/project-details/project-details.component';
import { ProjectPhasesComponent } from './components/core/dashboard/projects/project-phases/project-phases.component';
import { ProjectTeamsComponent } from './components/core/dashboard/projects/project-teams/project-teams.component';

@NgModule({
  declarations: [
    AppComponent,
    DynamicTableComponent,
    LoginComponent,
    DashboardComponent,
    UserComponent,
    SideNavComponent,
    HeaderComponent,
    BreadcrumbComponent,
    ProjectsComponent,
    SettingsComponent,
    HomeComponent,
    BarChartComponent,
    OrganisationComponent,
    RoleComponent,
    ExpansionPanelComponent,
    UserCreateComponent,
    WidgetContainerComponent,
    WorkRequestComponent,
    PanelHeaderFilterComponent,
    OrganisationCreateComponent,
    RoleCreateComponent,
    DepartmentComponent,
    UserDashboardComponent,
    NcmDashboardComponent,
    FileManagerComponent,
    FileManagerConfigComponent,
    WorkOrderComponent,
    HistoryPopupComponent,
    DesignDashboardComponent,
    FeaturePopupComponent,
    ForgotPasswordComponent,
    ConfirmDialogComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    MaterialModule,
    WidgetModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    ProjectModule,
    WorkRequestModule,
    WorkOrderModule,
    SpinnerModule,
    FileManagerModule
  ],
  entryComponents: [
    FolderCreateDialogComponent,
    FileShareDialogComponent,
    FileMailDialogComponent,
    HistoryPopupComponent,
    FeaturePopupComponent,
    ForgotPasswordComponent,
    ProjectDatesComponent,
    ProjectDetailsComponent,
    ProjectPhasesComponent,
    ProjectTeamsComponent
  ],
  providers: [D3Service, DashboardService, DepartmentService,
    OrganizationService, UserDashboardService,
    LocalStorageSchema],
  bootstrap: [AppComponent]
})
export class AppModule { }
