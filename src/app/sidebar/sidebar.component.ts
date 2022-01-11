import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  @Input() stockList: {symbol: string, image: string}[] = [];
  @Output() historicalSearch = new EventEmitter();
  symbols: string[] = [];
  interval: number = 0;
  start: number = 0;
  end: number = 0;
  invalid: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  handleClick(event: Event) {
    const target = (event.target as HTMLElement);
    if (this.symbols.includes(target.id)) {
      this.symbols = this.symbols.filter(symbol => symbol !== target.id);
    } else {
      this.symbols.push(target.id);
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
        this.symbols = [];
        this.interval = 0;
        this.start = 0;
        this.end = 0;
    } else {
      console.log('something is wrong')
    }
  }

}
