import { Injectable, Type } from '@angular/core';
import { UserDetailsComponent } from '../../components/core/dashboard/user/user-details/user-details.component';

@Injectable()
export class WidgetService {
  widgets: { [id: string]: Type<{}> } = {
    'app-user-details': UserDetailsComponent
  };
}
