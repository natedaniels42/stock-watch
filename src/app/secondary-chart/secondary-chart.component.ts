import { Component, OnInit, Input } from '@angular/core';
import { SecondaryChart, Stock } from '../Interfaces';

@Component({
  selector: 'secondary-chart',
  templateUrl: './secondary-chart.component.html',
  styleUrls: ['./secondary-chart.component.scss']
})
export class SecondaryChartComponent implements OnInit {
  @Input() stock: Stock = {
    name: '',
    symbol: '',
    image: '',
    data: []
  };
  @Input() color: string = '';
  @Input() dark: boolean = false;
  secondaryChart: SecondaryChart = {
    data: [],
    layout: {
      title: {
        text: '',
        fontSize: '10px',
        xanchor: 'center',
        y: 0.1,
        yanchor: 'top'
      },
      plot_bgcolor: 'rgba(0,0,0,0)',
      paper_bgcolor: 'rgba(0,0,0,0)',
      autosize: true,
      titlefont: {
        color: '#b0a4dc',
      },
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
    },
    style: {
      height: '100%'
    }
  };

  constructor() { }

  /**
   * Takes in the updated stock data and updates the chart data and title
   * @returns - void
   */
  ngOnInit(): void {
    const currentData = this.stock.data;
    // Converts timestamps into readable date information
    const xAxis = currentData.map((point: any) => new Date(point.timestamp).toString());
    const yAxis = currentData.map((point: any) => point.amount);
    const currentPrice = currentData[currentData.length - 1].amount;

    this.secondaryChart.data = [{
      x: xAxis,
      y: yAxis,
      mode: 'lines',
      line: {
        color: this.color
      }
    }]
    this.secondaryChart.layout.title.text = `${this.stock.name} $${currentPrice}`.toUpperCase(); 
  }
}
