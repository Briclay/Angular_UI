import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { FileManagerComponent } from './file-manager.component';

const routes: Routes = [
  {
    path: 'file-manager', component: FileManagerComponent, children: [
      
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class FileManageRoutingModule {
}
