import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/core/login/login.component';
import { DashboardComponent } from './components/core/dashboard/dashboard.component';
import { UserComponent } from './components/core/dashboard/user/user.component';
import { ProjectsComponent } from './components/core/dashboard/projects/projects.component';
import { SettingsComponent } from './components/core/dashboard/settings/settings.component';
import { HomeComponent } from './components/core/dashboard/home/home.component';

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
