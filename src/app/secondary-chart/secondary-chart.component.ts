import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'secondary-chart',
  templateUrl: './secondary-chart.component.html',
  styleUrls: ['./secondary-chart.component.scss']
})
export class SecondaryChartComponent implements OnInit {
  @Input() stock: any = {};
  @Input() color: string = '';
  secondaryChart: any = {};

  constructor() { }

  ngOnInit(): void {
    const currentData = this.stock.data.slice(this.stock.data.length - 30, this.stock.data.length);
    const xAxis = currentData.map((point: any) => new Date(point.timestamp));
    const yAxis = currentData.map((point: any) => point.amount);
    const currentPrice = currentData[currentData.length - 1].amount;

    this.secondaryChart = {
      data: [{
        x: xAxis,
        y: yAxis,
        mode: 'lines',
        line: {
          color: this.color
        }
      }],
      layout: {
        title: {
          text: `${this.stock.name} $${currentPrice}`,
          xanchor: 'center',
          y: 0.1,
          yanchor: 'top'
        },
        plot_bgcolor: 'rgba(0,0,0,0)',
        paper_bgcolor: 'rgba(0,0,0,0)',
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
      }
    }
  }

}
