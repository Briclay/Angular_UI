import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//import { NcmDetailsComponent } from './ncm-details/ncm-details.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NcmService } from './ncm.service';
import { MaterialModule } from '../../../../modules/material.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule
  ],
  declarations: [
    //NcmDetailsComponent
  ],
  exports: [
    //NcmDetailsComponent
  ],
  providers: [NcmService]
})

export class NcmModule { }