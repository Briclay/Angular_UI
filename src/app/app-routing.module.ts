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
import { FileSharedFolderComponent } from './components/core/dashboard/file-manager/file-shared-folder/file-shared-folder.component';
import { IssueTrackerComponent } from './components/core/dashboard/inter-department-tracker/inter-department-tracker.component';
import { RegisterComponent } from './components/core/register/register.component';
import { DocumentListComponent } from './components/core/dashboard/document-list/document-list.component';
import { NcmComponent } from './components/core/dashboard/ncm/ncm.component';
import { BpdListComponent } from './components/core/dashboard/bpd-list/bpd-list.component';
import { ContractConfigurationComponent } from './components/core/dashboard/contract-configuration/contract-configuration.component';
import { ContractManagementDashboardComponent } from './components/core/dashboard/contract-management-dashboard/contract-management-dashboard.component';
import { OperationsDashboardComponent } from './components/core/dashboard/operations-dashboard/operations-dashboard.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
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
        path: 'contracts-dashboard', component: UserDashboardComponent, data: {
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
        path: 'file-manager/shared-folder', component: FileSharedFolderComponent, data: {
          breadcrumb: 'Users'
        }
      },
       {
        path: 'file-manager/shared-folder/:id', component: FileSharedFolderComponent, data: {
          breadcrumb: 'Users'
        }
      },
      {
        path: 'design-dashboard', component: DesignDashboardComponent, data: {
          breadcrumb: 'Users'
        }
      },
      {
        path: 'operations-dashboard', component: OperationsDashboardComponent, data: {
          breadcrumb: 'Users'
        }
      },
       {
        path: 'contract-management-dashboard', component: ContractManagementDashboardComponent, data: {
          breadcrumb: 'Users'
        }
      },{
        path: 'inter-department-tracker', component: IssueTrackerComponent, data: {
          breadcrumb: 'Users'
        }
      },
      {
        path: 'document-list', component: DocumentListComponent, data: {
          breadcrumb: 'Users'
        }
      },
      {
        path: 'ncm', component: NcmComponent, data: {
          breadcrumb: 'Users'
        }
      },
      {
        path: 'contract-configuration', component: ContractConfigurationComponent, data: {
          breadcrumb: 'Users'
        }
      },
      {
        path: 'bpd-list', component: BpdListComponent, data: {
          breadcrumb: 'Users'
        }
      },
      /*{ path: '**', redirectTo: 'user', pathMatch: 'full'}*/
      {  path: '**', redirectTo: 'dashboard', pathMatch: 'full'  }
    ]
  },
  { path: '**', redirectTo: 'login', pathMatch: 'full' }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
