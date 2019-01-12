import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {WorkOrderService} from './work-order.service';
import {MaterialModule} from '../../../../modules/material.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule, 
    FormsModule,
    MaterialModule
  ],
  declarations: [
  ],
  exports: [
    
  ],
  providers: [WorkOrderService]
})
export class WorkOrderModule {}