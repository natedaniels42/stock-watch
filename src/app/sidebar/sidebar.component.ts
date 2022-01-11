import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  @Input() stockList: {symbol: string, image: string}[] = []
  symbols: string[] = []
  interval: number = 0;
  start: string = '';
  end: string = '';

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

}
