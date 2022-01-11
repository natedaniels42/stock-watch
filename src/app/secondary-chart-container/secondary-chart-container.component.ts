import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'secondary-chart-container',
  templateUrl: './secondary-chart-container.component.html',
  styleUrls: ['./secondary-chart-container.component.scss']
})
export class SecondaryChartContainerComponent implements OnInit {
  @Input() currentStocks: any = [];
  @Output() indexEvent = new EventEmitter();
  colors: string[] = ['red', 'green', 'yellow'];

  constructor() { }

  ngOnInit(): void {
  }

  handleClick(value: number) {
    this.indexEvent.emit(value);
  }
}
