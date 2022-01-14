import { Component, Input, OnChanges } from '@angular/core';

import { HistoricalData, PrimaryChart } from '../Interfaces';

@Component({
  selector: 'primary-chart',
  templateUrl: './primary-chart.component.html',
  styleUrls: ['./primary-chart.component.scss']
})
export class PrimaryChartComponent implements OnChanges {
  @Input() historicalData: HistoricalData[] = []; 
  @Input() dark: boolean = false;
  @Input() interval: number = 0;
  title: string = '';
  graph: PrimaryChart = {
    data: [],
    layout: {
      title: {
        text: `Stock Data on ${this.title} Intervals`,
        font: {
          color: '#b0a4dc'
        }
      },
      plot_bgcolor: 'rgba(0,0,0,0)',
      paper_bgcolor: 'rgba(0,0,0,0)',
      candlestickmode: 'group',
      dragmode: 'zoom',
      showlegend: true,
      showgrid: false,
      legend: {
        orientation: 'h',
        y: 10,
        font: {color: '#b0a4dc'}
      },
      xaxis: {
        type: {
          enumerated: 'multicategory'
        },
        tickangle: -45,
        showgrid: false,
        autorange: true,
        zeroline: false,
        title: 'Date',
        color: '#b0a4dc',
        rangeslider: {
          visible: false,
          x: 0, 
          y: 1.2,
          xanchor: 'left',
          font: {size: 8},
        }
      },
      yaxis: {
        title: '$USD',
        color: '#b0a4dc', 
        autorange: true,
        zeroline: false
      }
    },
    config: {
      responsive: true,
      displayModeBar: false
    },
    style: {
      width: '100%'
    }
  }
  constructor() { }

  /**
   * Listens for changes to the historicalData and on change updates the graph property 
   * @returns - void
   */
  ngOnChanges(): void {
    // Sets title based on the length of the interval selected
    this.title = this.interval === 5 
      ? '5 Minute' : this.interval === 15 
      ? '15 Minute' : this.interval === 60
      ? '1 Hour' : '1 Day';
    // Sets graph title with title property incorporated
    this.graph.layout.title.text = `Stock Data on ${this.title} Intervals`;
    // Parses out arrays of the timestamp, high, low, open, and close properties to 
    // insert into graph data
    this.graph.data = this.historicalData.map((data: any) => {
      const xAxis = data.data.map((time: any) => new Date(time.timestamp));
      const high = data.data.map((time: any) => time.high);
      const low = data.data.map((time: any) => time.low);
      const open = data.data.map((time: any) => time.open);
      const close = data.data.map((time: any) => time.close);
      // 3 random numbers are generated to set the color for the graph
      const random1 = Math.floor(Math.random() * 255);
      const random2 = Math.floor(Math.random() * 255);
      const random3 = Math.floor(Math.random() * 255);
      return {
        name: data.symbol,
        x: xAxis,
        high: high,
        low: low,
        open: open,
        close: close,
        increasing: {line: {color: `rgba(${random1}, ${random2}, ${random3}, 1)`}},
        decreasing: {
          line: {
          color: `rgba(${random1}, ${random2}, ${random3}, 1)`,
          },
          fillcolor: `rgba(${random1}, ${random2}, ${random3}, .1)`
        },
        line: {color: 'blue'},
        type: 'candlestick',
        xaxis: 'x',
        yaxis: 'y'
      }
    })
  }
}
