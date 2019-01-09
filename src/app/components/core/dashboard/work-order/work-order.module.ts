import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {WorkOrderService} from './work-order.service';
import {MaterialModule} from '../../../../modules/material.module';
import { WorkOrderDetailsComponent } from './work-order-details/work-order-details.component'

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule, 
    FormsModule,
    MaterialModule
  ],
  declarations: [
  WorkOrderDetailsComponent],
  exports: [
    WorkOrderDetailsComponent
  ],
  providers: [WorkOrderService]
})
export class WorkOrderModule {}