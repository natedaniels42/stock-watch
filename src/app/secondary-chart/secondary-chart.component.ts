import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'secondary-chart',
  templateUrl: './secondary-chart.component.html',
  styleUrls: ['./secondary-chart.component.scss']
})
export class SecondaryChartComponent implements OnInit {
  @Input() stock: any = {};
  
  constructor() { }

  ngOnInit(): void {
  }

}
