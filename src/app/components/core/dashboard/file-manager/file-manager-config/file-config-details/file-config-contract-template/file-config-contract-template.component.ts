import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-file-config-contract-template',
  templateUrl: './file-config-contract-template.component.html',
  styleUrls: ['./file-config-contract-template.component.scss']
})
export class FileConfigContractTemplateComponent implements OnInit {
	@Input()
  public folderDetailsContractDataOption: any;
  logsData:any;
  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: any) {
    this.logsData = this.folderDetailsContractDataOption;
  }

}
