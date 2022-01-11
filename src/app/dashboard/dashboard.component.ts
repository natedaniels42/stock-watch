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
  stockList: {symbol: string, image: string}[] = [];
  currentStocks: any = [];
  historicalData: any = []; 

  constructor(private socketService: SocketService) { }

  ngOnInit(): void {
    this.socketService.listen('list').subscribe((data: any) => {
      this.stockList = data.symbols;
    })

    this.socketService.listen('live').subscribe((data: any) => {
      this.currentStocks = data.data;
    })

    this.socketService.listen('historical').subscribe((data: any) => {
      this.historicalData = data.data.stocks;
    })

    this.getCurrent();

    this.getHistorical(1440);

    setInterval(() => {
      this.timer = (this.timer + 1) % 20;
      if (this.timer === 0) {
        this.index = (this.index + 1) % 10;
      }
      if (this.timer % 2 === 0) {
        this.getCurrent();
      }

    }, 1000);
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

    this.socketService.emit('historical', {'request-type': 'historical', 'data': {'symbols': this.stockList, interval: data}});
  }
}
