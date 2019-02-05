import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/core/login/login.component';
import { ResetPasswordComponent } from './components/core/reset-password/reset-password.component';
import { ChangePasswordComponent } from './components/core/change-password/change-password.component';
import { DashboardComponent } from './components/core/dashboard/dashboard.component';
import { UserComponent } from './components/core/dashboard/user/user.component';
import { ProjectsComponent } from './components/core/dashboard/projects/projects.component';
import { SettingsComponent } from './components/core/dashboard/settings/settings.component';
import { HomeComponent } from './components/core/dashboard/home/home.component';
import { OrganisationComponent } from './components/core/dashboard/organisation/organisation.component';
import { WorkRequestComponent } from './components/core/dashboard/work-request/work-request.component';
import { WorkOrderComponent } from './components/core/dashboard/work-order/work-order.component';
import { RoleComponent } from './components/core/dashboard/role/role.component';
import { DepartmentComponent } from './components/core/dashboard/department/department.component';
import { UserDashboardComponent } from './components/core/dashboard/user-dashboard/user-dashboard.component';
import { NcmDashboardComponent } from './components/core/dashboard/ncm-dashboard/ncm-dashboard.component';
import { FileManagerComponent } from './components/core/dashboard/file-manager/file-manager.component';
import { DesignDashboardComponent } from './components/core/dashboard/design-dashboard/design-dashboard.component';
import { RootFolderComponent } from './components/core/dashboard/file-manager/root-folder/root-folder.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'change-password/:id', component: ChangePasswordComponent },
  {
    path: 'dashboard', component: DashboardComponent,
    children: [
      {
        path: 'home', component: HomeComponent, data: {
          breadcrumb: 'Home'
        }
      },
      {
        path: 'organisations', component: OrganisationComponent, data: {
          breadcrumb: 'Organisation'
        }
      },
      {
        path: 'roles', component: RoleComponent, data: {
          breadcrumb: 'Role'
        }
      },
      {
        path: 'departments', component: DepartmentComponent, data: {
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
        path: 'work-request', component: WorkRequestComponent, data: {
          breadcrumb: 'WorkRequest'
        }
      },

      {
        path: 'work-order', component: WorkOrderComponent, data: {
          breadcrumb: 'WorkOrder'
        }
      },

      {
        path: 'users', component: UserComponent, data: {
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
        path: 'file-manager/:orgId/:deptId/:fileId', component: FileManagerComponent, data: {
          breadcrumb: 'Users'
        }
      },
      {
        path: 'file-manager', component: RootFolderComponent, data: {
          breadcrumb: 'Users'
        }
      },
      {
        path: 'design-dashboard', component: DesignDashboardComponent, data: {
          breadcrumb: 'Users'
        }
      },
      /*{ path: '**', redirectTo: 'user', pathMatch: 'full'}*/
      {  path: '**', redirectTo: 'design-dashboard', pathMatch: 'full'  }
    ]
  },
  { path: '**', redirectTo: 'login', pathMatch: 'full' }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
