import { Injectable, Type } from '@angular/core';
import { UserDetailsComponent } from '../../components/core/dashboard/user/user-details/user-details.component';
import { OrganisationDetailsComponent } from '../../components/core/dashboard/organisation/organisation-details/organisation-details.component';
import { RoleDetailsComponent } from '../../components/core/dashboard/role/role-details/role-details.component';
import { DepartmentDetailsComponent } from '../../components/core/dashboard/department/department-details/department-details.component';
import { UserDashDetailsComponent } from '../../components/core/dashboard/user-dashboard/user-dash-details/user-dash-details.component';

@Injectable()
export class WidgetService {
	widgets: { [id: string]: Type<{}> } = {
		'app-user-details': UserDetailsComponent,
		'app-organisation-details': OrganisationDetailsComponent,
		'app-role-details': RoleDetailsComponent,
		'app-department-details': DepartmentDetailsComponent,
		'app-user-dash-details': UserDashDetailsComponent
	};
}
