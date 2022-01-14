import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { StockInfo } from '../Interfaces';

@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  @Input() stockList: StockInfo[] = [];
  @Output() historicalSearch = new EventEmitter();
  @Output() darkModeToggle = new EventEmitter();
  symbols: string[] = ['F', 'T'];
  interval: number = 0;
  start: number = 0;
  end: number = 0;
  invalid: boolean = false;
  dark: boolean = false;
  expand: boolean = false;
  activeSymbols: boolean[] = [true,true,false,false,false,false,false,false,false,false];
  activeIntervals: boolean[] = [false, false, false, false];
  
  constructor() { }

  ngOnInit(): void {
  }

  /**
   * Toggles the value of the dark propert between true and false
   * Sends the value to the dashboard component
   * @returns - void
   */
  toggleMode(): void {
    this.dark ? this.dark = false : this.dark = true;
    this.darkModeToggle.emit(this.dark);
  }

  /**
   * When clicking on a stock symbol in the HTML, the specific index of activeSymbols
   * is toggled between true and false.
   * If it is turned to true, the symbol is added to the symbols array
   * If it is turned to false, the symbol is removed from the symbols array
   * @param event - Event
   * @returns - void
   */
  handleClick(event: Event): void {
    const target = (event.target as HTMLElement);
    const index = this.stockList.map(stock => stock.symbol).indexOf(target.id);
    console.log(index);
    if (this.symbols.includes(target.id)) {
      this.symbols = this.symbols.filter(symbol => symbol !== target.id);
      this.activeSymbols[index] = false;
    } else {
      this.symbols.push(target.id);
      this.activeSymbols[index] = true;
    }
    console.log(this.symbols);
  }

  /**
   * When the input changes, the value is converted into a timestamp
   * If the start input is changed the start property is set to the value
   * If the end input is changed the end property is set to the value
   * If the start value is greater than the end value the invalid property is set to true
   * @param event - Event
   * @returns - void
   */
  handleChange(event: Event): void {
    const target = (event.target as HTMLInputElement);
    const timestamp = Date.parse(target.value);
    if (target.id === 'start') {
      this.start = timestamp;
    } else {
      this.end = timestamp;
    }

    if (this.start > this.end && this.end !== 0) {
      this.invalid = true;
    }
    console.log([this.start, this.end]);
  }

  /**
   * On click the id of the clicked event is checked against the value of the interval 
   * property
   * If they are the same, interval is set to zero.  If not, interval is set to the id
   * Active intervals is updated depending on the value of interval to allow for CSS to 
   * show the active interval button
   * @param event - Event
   * @returns - void 
   */
  handleIntervalClick(event: Event): void {
    this.interval = Number((event.target as HTMLElement).id) === this.interval 
      ? 0 : Number((event.target as HTMLElement).id);
    console.log(this.interval);
    console.log(`Start: ${this.start}`);
    console.log(`End: ${this.end}`);
    switch(this.interval) {
      case 5:
        this.activeIntervals = [true, false, false, false];
        break;
      case 15:
        this.activeIntervals = [false, true, false, false];
        break;
      case 60:
        this.activeIntervals = [false, false, true, false];
        break;
      case 1440:
        this.activeIntervals = [false, false, false, true];
        break;
      default:
        this.activeIntervals = [false, false, false, false];
        break;
    }
  }

  /**
   * On submit the symbols, start, end, and interval are all checked to see if they are
   * valid
   * If so, they are sent to the dashboard component to call the socketService to get
   * historical data
   * @param event - Event
   * @returns - void
   */
  handleSubmit(event: Event): void {
    event.preventDefault();

    if (this.symbols.length > 0 
      && this.start < this.end 
      && this.start
      && this.end
      && this.interval) {
        this.historicalSearch.emit({
          symbols: this.symbols,
          start: this.start,
          end: this.end,
          interval: this.interval
        });
        this.start = 0;
        this.end = 0;
        this.interval = 0;
        this.activeIntervals = [false, false, false, false];    
      } else {
      console.log('something is wrong')
    }
  }

  /**
   * Toggles expand property
   * @returns - void
   */
  handleExpand(): void {
    this.expand ? this.expand = false : this.expand = true;
  }
}
