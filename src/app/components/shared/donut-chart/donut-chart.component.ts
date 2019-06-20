import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { D3, D3Service, Selection } from "d3-ng2-service";
import * as d3 from "d3-ng2-service";


@Component({
  selector: 'app-donut-chart',
  templateUrl: './donut-chart.component.html',
  styleUrls: ['./donut-chart.component.scss']
})
export class DonutChartComponent implements OnInit {
  @ViewChild('donutChart') private donutChart: ElementRef;
  private d3: D3;
  public donutChartData = [{
    id: 0,
    label: 'water',
    value: 20,
    color: 'red',
  }, {
    id: 1,
    label: 'land',
    value: 20,
    color: 'blue',
  }, {
    id: 2,
    label: 'sand',
    value: 30,
    color: 'green',
  }, {
    id: 3,
    label: 'grass',
    value: 20,
    color: 'yellow',
  }, {
    id: 4,
    label: 'earth',
    value: 10,
    color: 'pink',
  }];

  private d3Svg: Selection<d3.BaseType, any, HTMLElement, undefined>;
  constructor(private d3Service: D3Service, element: ElementRef) {
     
  }

  ngOnInit() {
    
  }

  
}
