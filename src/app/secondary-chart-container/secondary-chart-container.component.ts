import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Stock } from '../Interfaces';

@Component({
  selector: 'secondary-chart-container',
  templateUrl: './secondary-chart-container.component.html',
  styleUrls: ['./secondary-chart-container.component.scss']
})
export class SecondaryChartContainerComponent implements OnInit {
  @Input() currentStocks: Stock[] = [];
  @Input() dark: boolean = false;
  @Output() indexEvent = new EventEmitter();
  colors: string[] = ['red', 'green', 'yellow'];

  constructor() { }

  ngOnInit(): void {
  }

  /**
   * Takes in a number based on the button clicked and sends that back to the 
   * dashboard component 
   * @param value - a number
   * @returns - void
   */
  handleClick(value: number): void {
    this.indexEvent.emit(value);
  }
}
