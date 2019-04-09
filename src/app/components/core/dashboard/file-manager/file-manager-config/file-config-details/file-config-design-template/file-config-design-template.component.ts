import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-file-config-design-template',
  templateUrl: './file-config-design-template.component.html',
  styleUrls: ['./file-config-design-template.component.scss']
})
export class FileConfigDesignTemplateComponent implements OnInit {
  @Input()
  public folderDetailsDesignDataOption: any;
  logsData: any;
  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: any) {
    console.log(this.folderDetailsDesignDataOption,'this.folderDetailsDesignDataOption')
    this.logsData = this.folderDetailsDesignDataOption;
  }

}
