import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkRequestService } from './work-request.service';
import { WorkRequestDetailsComponent } from './work-request-details/work-request-details.component';
import { WorkCategoryDialogComponent } from './work-request-details/work-category-dialog/work-category-dialog.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    
  WorkCategoryDialogComponent],
  exports: [
    
  ],
  providers: [WorkRequestService]
})
export class WorkRequestModule { }