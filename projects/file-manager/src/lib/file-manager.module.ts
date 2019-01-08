import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FileManagerComponent } from './file-manager.component';
import {FileManageRoutingModule} from './file-manager-routig-module';

@NgModule({
  declarations: [FileManagerComponent],
  imports: [
    FileManageRoutingModule,
    NgbModule.forRoot()
  ],
  exports: [
    FileManagerComponent
  ]
})
export class FileManagerModule { }
