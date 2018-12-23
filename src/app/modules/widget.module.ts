import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WidgetService } from './../services/widget/widget.service';
import { UserDetailsComponent } from '../components/core/dashboard/user/user-details/user-details.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {MaterialModule} from "./material.module";

@NgModule({
  imports: [
    CommonModule, 
    MaterialModule, 
    ReactiveFormsModule, 
    FormsModule
  ],
  declarations: [
    UserDetailsComponent
  ],
  exports: [UserDetailsComponent],
  entryComponents: [
    UserDetailsComponent
  ],
  providers: [WidgetService]
})
export class WidgetModule {}
