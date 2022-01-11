import { Component, OnChanges, Input } from '@angular/core';

@Component({
  selector: 'secondary-chart',
  templateUrl: './secondary-chart.component.html',
  styleUrls: ['./secondary-chart.component.scss']
})
export class SecondaryChartComponent implements OnChanges {
  @Input() stock: any = {};
  secondaryChart: any = {};

  constructor() { }

  ngOnChanges(): void {
    
    const currentData = this.stock.data.slice(this.stock.data.length - 10, this.stock.data.length);
    const xAxis = currentData.map((point: any) => new Date(point.timestamp));
    const yAxis = currentData.map((point: any) => point.amount);
    const currentPrice = currentData[currentData.length - 1].amount;

    this.secondaryChart = {
      data: [{
        x: xAxis,
        y: yAxis,
        mode: 'lines'
      }],
      layout: {
        title: `${this.stock.name} $${currentPrice}`,
        xaxis: {
          showgrid: false,
          showticklabels: false,
          zeroline: false
        },
        yaxis: {
          showgrid: false,
          showticklabels: false,
          zeroline: false
        }
      },
      config: {
        responsive: true,
        displayModeBar: false
      }
    }
  }

}
