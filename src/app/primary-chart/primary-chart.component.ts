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
      plot_bgcolor: 'rgba(0,0,0,0)',
      paper_bgcolor: 'rgba(0,0,0,0)',
      candlestickmode: 'group',
      dragmode: 'zoom',
      showlegend: true,
      showgrid: false,
      legend: {
        orientation: 'h',
        y: 10
      },
      xaxis: {
        showgrid: false,
        autorange: true,
        zeroline: false,
        title: 'Date',
        reangeselector: {
          x: 0, 
          y: 1.2,
          xanchor: 'left',
          font: {size: 8},
        }
      },
      yaxis: {
        title: 'Amount',
        autorange: true,
        zeroline: false
      }
    },
    config: {
      responsive: true,
      displayModeBar: false
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
      const random1 = Math.floor(Math.random() * 255);
      const random2 = Math.floor(Math.random() * 255);
      const random3 = Math.floor(Math.random() * 255);
      const random4 = Math.floor(Math.random() * 255);
      const random5 = Math.floor(Math.random() * 255);
      const random6 = Math.floor(Math.random() * 255);
      return {
        title: data.name,
        x: xAxis,
        high: high,
        low: low,
        open: open,
        close: close,
        increasing: {line: {color: `rgb(${random1}, ${random2}, ${random3})`}},
        decreasing: {line: {color: `rgb(${random4}, ${random5}, ${random6})`}},
        line: {color: 'blue'},
        type: 'candlestick',
        xaxis: 'x',
        yaxis: 'y'
      }
    })
  }

}
