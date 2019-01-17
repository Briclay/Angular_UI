import { Injectable, Type } from '@angular/core';
import { UserDetailsComponent } from '../../components/core/dashboard/user/user-details/user-details.component';
import { OrganisationDetailsComponent } from '../../components/core/dashboard/organisation/organisation-details/organisation-details.component';
import { RoleDetailsComponent } from '../../components/core/dashboard/role/role-details/role-details.component';
import { DepartmentDetailsComponent } from '../../components/core/dashboard/department/department-details/department-details.component';
import { WorkRequestDetailsComponent } from '../../components/core/dashboard/work-request/work-request-details/work-request-details.component';
import {WorkOrderDetailsComponent} from '../../components/core/dashboard/work-order/work-order-details/work-order-details.component';
@Injectable()
export class WidgetService {
	widgets: { [id: string]: Type<{}> } = {
		'app-user-details': UserDetailsComponent,
		'app-organisation-details': OrganisationDetailsComponent,
		'app-role-details': RoleDetailsComponent,
		'app-department-details': DepartmentDetailsComponent,
		'app-work-request-details': WorkRequestDetailsComponent,
		'app-work-order-details': WorkOrderDetailsComponent
	};
}
