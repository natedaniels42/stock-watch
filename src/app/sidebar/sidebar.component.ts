import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  @Input() stockList: {symbol: string, image: string}[] = [];
  @Output() historicalSearch = new EventEmitter();
  @Output() darkModeToggle = new EventEmitter();
  symbols: string[] = ['F', 'T'];
  interval: number = 0;
  start: number = 0;
  end: number = 0;
  invalid: boolean = false;
  dark: boolean = false;
  activeSymbols = [true,true,false,false,false,false,false,false,false,false];
  activeIntervals = [false, false, false, false];

  constructor() { }

  ngOnInit(): void {
  }

  toggleMode() {
    this.dark ? this.dark = false : this.dark = true;
    this.darkModeToggle.emit(this.dark);
  }

  handleClick(event: Event) {
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

  handleChange(event: Event) {
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

  handleIntervalClick(event: Event) {
    this.interval = Number((event.target as HTMLElement).id);
    console.log(this.interval);
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
        break;
    }
  }

  handleSubmit(event: Event) {
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
    } else {
      console.log('something is wrong')
    }
  }

}
