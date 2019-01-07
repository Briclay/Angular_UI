import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent implements OnInit {
  @Input()
  public diameter: number;
  constructor() { }

  ngOnInit() {
    if (this.diameter) {
      this.diameter = this.diameter >= 100 ? 1 : parseFloat((this.diameter / 100).toFixed(2));
    }
  }

}
