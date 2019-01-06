import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/core/login/login.component';
import { DashboardComponent } from './components/core/dashboard/dashboard.component';
import { UserComponent } from './components/core/dashboard/user/user.component';
import { ProjectsComponent } from './components/core/dashboard/projects/projects.component';
import { SettingsComponent } from './components/core/dashboard/settings/settings.component';
import { HomeComponent } from './components/core/dashboard/home/home.component';
import { OrganisationComponent } from './components/core/dashboard/organisation/organisation.component';
import {WorkRequestComponent} from './components/core/dashboard/work-request/work-request.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard', component: DashboardComponent,
    children: [
      {
        path: 'home', component: HomeComponent, data: {
          breadcrumb: 'Home'
        }
      },
      {
        path: 'organisation', component: OrganisationComponent, data: {
          breadcrumb: 'Organisation'
        }
      },
      {
        path: 'settings', component: SettingsComponent, data: {
          breadcrumb: 'Settings'
        }
      },
      {
        path: 'projects', component: ProjectsComponent, data: {
          breadcrumb: 'Projects'
        }
      },
      {
        path: 'work-request', component: WorkRequestComponent, data: {
          breadcrumb: 'WorkRequest'
        }
      },
      {
        path: 'user', component: UserComponent, data: {
          breadcrumb: 'Users'
        }
      },
      { path: '**', redirectTo: 'user', pathMatch: 'full' }
    ]
  },
  { path: '**', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
