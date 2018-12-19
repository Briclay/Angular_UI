import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { D3, D3Service, Selection } from "d3-ng2-service";
import * as d3 from "d3-ng2-service";
declare var moment: any;
export interface LinesChartData {
  name: string;
  color: string;
  values: { date: string, value: number }[];
}
@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit {
  cols = ["station"];
  @ViewChild('barChart') private linesChart: ElementRef;
  @Input() barChartData: Array<LinesChartData>;
  private d3: D3;
  private d3Svg: Selection<d3.BaseType, any, HTMLElement, undefined>;
  constructor(private d3Service: D3Service, element: ElementRef) {
    this.d3 = d3Service.getD3();
  }

  ngOnInit() {
    this.drawBarChart()
  }

  drawBarChart() {
    let chartData = [];
    this.barChartData.forEach((list, index) => {
      let listData = {}
      listData['station'] = list.name;
      list.values.forEach((values, indexValues) => {
        let date = moment(values.date).format("YYYY-MM-DD");
        listData[date] = values.value;
        if (this.cols.indexOf(date) === -1) {
          this.cols.push(date);
        }
      });
      chartData.push(listData);
    })
    let d3: any = this.d3;
    let svg = d3.select(this.linesChart.nativeElement),
      margin = { top: 20, right: 20, bottom: 30, left: 40 },
      width = +svg.attr("width") - margin.left - margin.right,
      height = +svg.attr("height") - margin.top - margin.bottom,
      g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    let x0 = d3.scaleBand()
      .rangeRound([0, width])
      .paddingInner(0.1);

    let x1 = d3.scaleBand()
      .padding(0.05);

    let y = d3.scaleLinear()
      .rangeRound([height, 0]);

    let z = d3.scaleOrdinal()
      .range(['#1967d2', '#ea4335', '#fbbc05', '#34a853', '#ea4335', '#c51162']);
    let keys = this.cols.slice(1);
    x0.domain(chartData.map(function (d) { return d.station; }));
    x1.domain(keys).rangeRound([0, x0.bandwidth()]);
    y.domain([0, d3.max(chartData, function (d) { return d3.max(keys, function (key) { return d[key]; }); })]).nice();

    g.append("g")
      .selectAll("g")
      .data(chartData)
      .enter().append("g")
      .attr("transform", function (d) { return "translate(" + x0(d.station) + ",0)"; })
      .selectAll("rect")
      .data(function (d) { return keys.map(function (key) { return { key: key, value: d[key] }; }); })
      .enter().append("rect")
      .attr("x", function (d) { return x1(d.key); })
      .attr("y", function (d) { return y(d.value); })
      .attr("width", x1.bandwidth())
      .attr("height", function (d) { return height - y(d.value); })
      .attr("fill", function (d) { return z(d.key); });

    g.append("g")
      .attr("class", "axis")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x0));

    g.append("g")
      .attr("class", "axis")
      .call(d3.axisLeft(y).ticks(null, "s"))
      .append("text")
      .attr("x", 2)
      .attr("y", y(y.ticks().pop()) + 0.5)
      .attr("dy", "0.32em")
      .attr("fill", "#000")
      .attr("font-weight", "bold")
      .attr("text-anchor", "start")

    var legend = g.append("g")
      .attr("font-family", "sans-serif")
      .attr("font-size", 10)
      .attr("text-anchor", "end")
      .selectAll("g")
      .data(keys.slice().reverse())
      .enter().append("g")
      .attr("transform", function (d, i) { return "translate(0," + i * 20 + ")"; });

    legend.append("rect")
      .attr("x", width - 19)
      .attr("width", 19)
      .attr("height", 19)
      .attr("fill", z);

    legend.append("text")
      .attr("x", width - 24)
      .attr("y", 9.5)
      .attr("dy", "0.32em")
      .text(function (d) { return d; });
  }

}
