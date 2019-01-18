import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FolderCreateDialogComponent } from './folder-create-dialog/folder-create-dialog.component';
import { FileShareDialogComponent } from './file-share-dialog/file-share-dialog.component';

@NgModule({
  declarations: [FolderCreateDialogComponent, FileShareDialogComponent],
  exports: [
  ],
  imports: [
    CommonModule
  ]
})
export class FileManagerModule { }
