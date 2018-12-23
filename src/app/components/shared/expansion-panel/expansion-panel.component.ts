import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-expansion-panel',
  templateUrl: './expansion-panel.component.html',
  styleUrls: ['./expansion-panel.component.scss']
})
export class ExpansionPanelComponent implements OnInit {
  @Input() expansionPanelOptions: any;
  @Input() data: any; 
  constructor() { }

  ngOnInit() {
  }

}
