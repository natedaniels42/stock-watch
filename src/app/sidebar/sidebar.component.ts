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
  interval: string = '';
  start: string = '';
  end: string = '';
  dark: boolean = false;
  expand: boolean = false;
  activeSymbols: boolean[] = [true,true,false,false,false,false,false,false,false,false];
  
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
   * On submit the symbols, start, end, and interval are all checked to see if they are
   * valid
   * If so, the start and end property are converted into timestamps  
   * The symbols and interval properties as wellas the timestamps are sent to the 
   * dashboard component to call the socketService to get historical data
   * @param event - Event
   * @returns - void
   */
  handleSubmit(event: Event): void {
    event.preventDefault();

    if (this.symbols.length > 0 
      && this.start
      && this.end
      && this.interval) {
        const startTimestamp = Date.parse(this.start);
        const endTimestamp = Date.parse(this.end);
        const intervalInt = Number(this.interval);
        this.historicalSearch.emit({
          symbols: this.symbols,
          start: startTimestamp,
          end: endTimestamp,
          interval: intervalInt
        });
        this.start = '';
        this.end = '';
        this.interval = ''; 
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
