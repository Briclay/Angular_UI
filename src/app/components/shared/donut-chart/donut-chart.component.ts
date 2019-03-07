import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { D3, D3Service, Selection } from "d3-ng2-service";
import * as d3 from "d3-ng2-service";

const data = [
  {
    "label": "Pending Approval",
    "value": 25
  },
  {
    "label": "Approved",
    "value": 75
  }
]

@Component({
  selector: 'app-donut-chart',
  templateUrl: './donut-chart.component.html',
  styleUrls: ['./donut-chart.component.scss']
})
export class DonutChartComponent implements OnInit {
  @ViewChild('donutChart') private donutChart: ElementRef;
  private d3: D3;
  private d3Svg: Selection<d3.BaseType, any, HTMLElement, undefined>;
  constructor(private d3Service: D3Service, element: ElementRef) {
    this.d3 = d3Service.getD3();
  }

  ngOnInit() {
    this.getChart();
  }

  getChart() {
    const pieValue = d => d.value;
    const colorValue = d => d.label;
    const colorLabel = 'label';
    const margin = { left: 20, right: 400, top: 1, bottom: 1 };

    let d3: any = this.d3;
    let svg = d3.select(this.donutChart.nativeElement);
    const width = svg.attr('width');
    const height = svg.attr('height');
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const pie = d3.pie().value(pieValue);
    const arc = d3.arc()
      .innerRadius(innerHeight / 4)
      .outerRadius(innerHeight / 2);

    const g = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);
    const pieG = g.append('g')
      .attr('transform', `translate(${innerWidth / 2},${innerHeight / 2})`);
    const colorLegendG = g.append('g')
      .attr('transform', `translate(${innerWidth + 60}, 150)`);

    colorLegendG.append('text')
      .attr('class', 'legend-label')
      .attr('x', -30)
      .attr('y', -40)
      .text(colorLabel);

    const colorScale = d3.scaleOrdinal()
      .range(d3.schemeCategory10);

    /*const colorLegend = d3.legendColor()
      .scale(colorScale)
      .shape('circle');*/

    const row = d => {
      d.value = +d.value;
      return d;
    };

    colorScale.domain(data.map(colorValue));

    const arcs = pie(data);

    pieG.selectAll('path').data(arcs)
      .enter().append('path')
      .attr('d', arc)
      .attr('fill', d => colorScale(colorValue(d.data)));

    colorLegendG.call(colorScale)
      .selectAll('.cell text')
      .attr('dy', '0.1em');
  }

}
