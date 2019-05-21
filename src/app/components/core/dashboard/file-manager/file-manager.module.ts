import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FolderCreateDialogComponent } from './folder-create-dialog/folder-create-dialog.component';
import { FileShareDialogComponent } from './file-share-dialog/file-share-dialog.component';
import { FileConfigDetailsComponent } from './file-manager-config/file-config-details/file-config-details.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {MaterialModule} from '../../../../modules/material.module';
import { FileMailDialogComponent } from './file-mail-dialog/file-mail-dialog.component';
import { FileUploadDialogComponent } from './file-upload-dialog/file-upload-dialog.component';
import { RootFolderComponent } from './root-folder/root-folder.component';
import {SpinnerModule} from '../../../shared/spinner/spinner.module';
import { FileConfigDesignTemplateComponent } from './file-manager-config/file-config-details/file-config-design-template/file-config-design-template.component';
import { FileConfigContractTemplateComponent } from './file-manager-config/file-config-details/file-config-contract-template/file-config-contract-template.component';
import { FileSharedFolderComponent } from './file-shared-folder/file-shared-folder.component';
import { UploadPopupComponent } from './file-manager-config/upload-popup/upload-popup.component';
//import { FileUploadPopupComponent } from './file-manager-config/file-config-details/file-upload-popup/file-upload-popup.component'


@NgModule({
  declarations: [FolderCreateDialogComponent, FileShareDialogComponent, FileConfigDetailsComponent,
   FileMailDialogComponent, FileUploadDialogComponent, RootFolderComponent, FileConfigDesignTemplateComponent, FileConfigContractTemplateComponent, FileSharedFolderComponent, UploadPopupComponent],
  exports: [
    FileConfigDetailsComponent,
    FileConfigDesignTemplateComponent,
    FileConfigContractTemplateComponent
  ],
  entryComponents: [
  UploadPopupComponent
    
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    SpinnerModule
  ]
})
export class FileManagerModule { }
