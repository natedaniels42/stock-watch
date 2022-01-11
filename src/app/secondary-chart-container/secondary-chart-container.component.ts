import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'secondary-chart-container',
  templateUrl: './secondary-chart-container.component.html',
  styleUrls: ['./secondary-chart-container.component.scss']
})
export class SecondaryChartContainerComponent implements OnInit {
  @Input() currentStocks: any = [];
  
  constructor() { }

  ngOnInit(): void {
  }

}
