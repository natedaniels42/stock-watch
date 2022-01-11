import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'primary-chart',
  templateUrl: './primary-chart.component.html',
  styleUrls: ['./primary-chart.component.scss']
})
export class PrimaryChartComponent implements OnChanges {
  @Input() historicalData: any = []; 
  graph: any = {
    data: [],
    layout: {
      dragmode: 'zoom',
      showlegend: true,
      xaxis: {
        autorange: true,
        title: 'Date',
        reangeselector: {
          x: 0, 
          y: 1.2,
          xanchor: 'left',
          font: {size: 8},
          buttons: [{
            step: 'month',
            stepmode: 'backward',
            count: 1,
            label: '1 month'
          }, {
            step: 'all',
            label: 'All dates'
          }]
        }
      },
      yaxis: {
        autorange: true,
      }
    }
  }
  constructor() { }

  ngOnChanges(): void {
    this.graph.data = this.historicalData.map((data: any) => {
      const xAxis = data.data.map((time: any) => new Date(time.timestamp));
      const high = data.data.map((time: any) => time.high);
      const low = data.data.map((time: any) => time.low);
      const open = data.data.map((time: any) => time.open);
      const close = data.data.map((time: any) => time.close);

      return {
        x: xAxis,
        high: high,
        low: low,
        open: open,
        close: close,
        increasing: {line: {color: 'green'}},
        decreasing: {line: {color: 'red'}},
        line: {color: 'blue'},
        type: 'candlestick',
        xaxis: 'x',
        yaxis: 'y'
      }
    })
  }

}
