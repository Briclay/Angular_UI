import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FolderCreateDialogComponent } from './folder-create-dialog/folder-create-dialog.component';

@NgModule({
  declarations: [FolderCreateDialogComponent],
  exports: [
  ],
  imports: [
    CommonModule
  ]
})
export class FileManagerModule { }
