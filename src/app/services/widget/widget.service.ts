import { Injectable, Type } from '@angular/core';
import { UserDetailsComponent } from '../../components/core/dashboard/user/user-details/user-details.component';
import { OrganisationDetailsComponent } from '../../components/core/dashboard/organisation/organisation-details/organisation-details.component';
import { RoleDetailsComponent } from '../../components/core/dashboard/role/role-details/role-details.component';

@Injectable()
export class WidgetService {
	widgets: { [id: string]: Type<{}> } = {
		'app-user-details': UserDetailsComponent,
		'app-organisation-details': OrganisationDetailsComponent,
		'app-role-details': RoleDetailsComponent
	};
}
