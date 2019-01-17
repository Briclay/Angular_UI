import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/core/login/login.component';
import { DashboardComponent } from './components/core/dashboard/dashboard.component';
import { UserComponent } from './components/core/dashboard/user/user.component';
import { ProjectsComponent } from './components/core/dashboard/projects/projects.component';
import { SettingsComponent } from './components/core/dashboard/settings/settings.component';
import { HomeComponent } from './components/core/dashboard/home/home.component';
import { OrganisationComponent } from './components/core/dashboard/organisation/organisation.component';
import { RoleComponent } from './components/core/dashboard/role/role.component';
import { DepartmentComponent } from './components/core/dashboard/department/department.component';
import { UserDashboardComponent } from './components/core/dashboard/user-dashboard/user-dashboard.component';
import { NcmDashboardComponent } from './components/core/dashboard/ncm-dashboard/ncm-dashboard.component';
import { FileManagerComponent } from './components/core/dashboard/file-manager/file-manager.component';

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
        path: 'role', component: RoleComponent, data: {
          breadcrumb: 'Role'
        }
      },
      {
        path: 'department', component: DepartmentComponent, data: {
          breadcrumb: 'department'
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
        path: 'user', component: UserComponent, data: {
          breadcrumb: 'Users'
        }
      },
      {
        path: 'user-dashboard', component: UserDashboardComponent, data: {
          breadcrumb: 'Users'
        }
      },
      {
        path: 'ncm-dashboard', component: NcmDashboardComponent, data: {
          breadcrumb: 'Users'
        }
      },
      {
        path: 'file-manager', component: FileManagerComponent, data: {
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
