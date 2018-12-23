import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DynamicTableComponent } from './components/shared/dynamic-table/dynamic-table.component';
import { LoginComponent } from './components/core/login/login.component';
import { DashboardComponent } from './components/core/dashboard/dashboard.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MaterialModule} from "./modules/material.module";
import {WidgetModule} from "./modules/widget.module";
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
import { UserService } from './services/user/user.service';
import { ExpansionPanelComponent } from './components/shared/expansion-panel/expansion-panel.component';
import { UserCreateComponent } from './components/core/dashboard/user/user-create/user-create.component';
import { WidgetContainerComponent } from './components/shared/widget-container/widget-container.component';
import { OrganisationComponent } from './components/core/dashboard/organisation/organisation.component';

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
    ExpansionPanelComponent,
    UserCreateComponent,
    WidgetContainerComponent,
    OrganisationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    WidgetModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [D3Service, DashboardService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
