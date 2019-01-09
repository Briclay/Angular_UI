import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { WorkRequestService } from './work-request.service';
import { MaterialModule } from '../../../../modules/material.module';
import { WorkRequestDetailsComponent } from './work-request-details/work-request-details.component'

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule
  ],
  declarations: [
    WorkRequestDetailsComponent
  ],
  exports: [
    WorkRequestDetailsComponent
  ],
  providers: [WorkRequestService]
})
export class WorkRequestModule { }