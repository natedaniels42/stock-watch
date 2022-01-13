import { Component, OnInit } from '@angular/core';
import { SocketService } from '../socket.service';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  index: number = 0;
  timer: number = 0;
  dark: boolean = false;
  stockList: {symbol: string, image: string}[] = [];
  currentStocks: any = [];
  historicalData: any = []; 
  historicalSearch = {
      symbols: [],
      start: 0,
      end: 0,
      interval: 0
    }
  constructor(private socketService: SocketService) { }

  ngOnInit(): void {
    this.socketService.listen('list').subscribe((data: any) => {
      this.stockList = data.symbols;
    })
    
    this.socketService.listen('live').subscribe((data: any) => {
      this.currentStocks = data.data;
      console.log(this.currentStocks);
    })

    this.socketService.listen('historical').subscribe((data: any) => {
      this.historicalData = data.data.stocks;
      console.log('Historical Data');
      console.log(this.historicalData);
    })

    this.getCurrent();

    this.getHistorical({
      symbols: ['F', 'T'],
      start: Date.now() - 604800000,
      end: Date.now(),
      interval: 1440});

    // setInterval(() => {
    //   this.timer = (this.timer + 1) % 20;
    //   if (this.timer === 0) {
    //     this.index = (this.index + 1) % 10;
    //   }
    //   if (this.timer % 2 === 0) {
    //     this.getCurrent();
    //   }

    // }, 1000);
  }

  setDarkMode(value: boolean) {
    this.dark = value;
    console.log(this.dark);
  }

  moveIndex(value: number) {
    this.index += value;
    if (this.index === -1) {
      this.index = 9;
    } else if (this.index === 10) {
      this.index = 0;
    }
    this.timer = 0;
    this.getCurrent();
  }

  getCurrent() {
    this.socketService.emit('live', {'request-type': 'live', 'data': [this.index, (this.index + 1) % 10, (this.index + 2) % 10]});
  }

  getHistorical(data: any, event?: Event) {
    if (event) {
      event.preventDefault();
    }

    this.socketService.emit('historical', {'request-type': 'historical', 'data': data});
  }
}
