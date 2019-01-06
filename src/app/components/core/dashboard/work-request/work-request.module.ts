import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {WorkRequestService} from './work-request.service';
import {MaterialModule} from '../../../../modules/material.module'

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
  providers: [WorkRequestService]
})
export class WorkRequestModule {}