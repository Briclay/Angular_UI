import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FolderCreateDialogComponent } from './folder-create-dialog/folder-create-dialog.component';
import { FileShareDialogComponent } from './file-share-dialog/file-share-dialog.component';
import { FileConfigDetailsComponent } from './file-manager-config/file-config-details/file-config-details.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {MaterialModule} from '../../../../modules/material.module';
import { FilMailDialogComponent } from './fil-mail-dialog/fil-mail-dialog.component';
import { FileMailDialogComponent } from './file-mail-dialog/file-mail-dialog.component';
import { FileUploadDialogComponent } from './file-upload-dialog/file-upload-dialog.component';


@NgModule({
  declarations: [FolderCreateDialogComponent, FileShareDialogComponent, FileConfigDetailsComponent, FilMailDialogComponent, FileMailDialogComponent, FileUploadDialogComponent],
  exports: [
    FileConfigDetailsComponent
  ],
  entryComponents: [
    
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule
  ]
})
export class FileManagerModule { }
