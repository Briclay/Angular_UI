import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkRequestService } from './work-request.service';
import { WorkRequestDetailsComponent } from './work-request-details/work-request-details.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    
  ],
  exports: [
    
  ],
  providers: [WorkRequestService]
})
export class WorkRequestModule { }