import { Component, OnInit, Input } from '@angular/core';
import { FileManagerService } from '../../file-manager.service'

@Component({
  selector: 'app-file-config-details',
  templateUrl: './file-config-details.component.html',
  styleUrls: ['./file-config-details.component.scss']
})
export class FileConfigDetailsComponent implements OnInit {
  @Input()
  public folderDetailsDataOption: any;
  public folderDetailsData: any;
  public folderListOption = [{
    label: 'Type', key: 'type', type: 'string'
  }, {
    label: 'Created By', key: 'type', type: 'string'
  }, {
    label: 'Created On', key: 'createdAt', type: 'date'
  }, {
    label: 'Modified By', key: 'type', type: 'string'
  }, {
    label: 'Modified On', key: 'updatedAt', type: 'date'
  }];
  public folderLoading: boolean;
  constructor(
    private fileManagerService: FileManagerService
  ) { }

  ngOnInit() {
  }

  ngOnChanges(changes: any) {
    // changes.prop contains the old and the new value...
    this.folderDetailsData = this.folderDetailsDataOption;
    if (this.folderDetailsDataOption.type === 'file') {
      this.folderLoading = true;
      this.fileManagerService.getSingleFile(this.folderDetailsDataOption)
        .pipe().subscribe((response: any) => {
          this.folderLoading = false;
          this.folderDetailsData = response;
          this.folderListOption = [{
            label: 'Type', key: 'type', type: 'string'
          }, {
            label: 'Size', key: 'size', type: 'string'
          }, {
            label: 'Created By', key: 'type', type: 'string'
          }, {
            label: 'Created On', key: 'createdAt', type: 'date'
          }, {
            label: 'Modified By', key: 'type', type: 'string'
          }, {
            label: 'Modified On', key: 'updatedAt', type: 'date'
          }]
        }, (error: any) => {
          console.error(error);
          this.folderLoading = false;
        });
    }


  }

}
