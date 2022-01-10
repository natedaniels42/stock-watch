import { Component, OnInit } from '@angular/core';
import { SocketService } from './socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'StockWatch';
  index: number = 0;
  stockList: string[] = [];
  currentStocks: any = [];
  historicalData: any = []; 

  constructor(private socketService: SocketService) {  }

  ngOnInit() {
    this.socketService.listen('list').subscribe((data: any) => {
      this.stockList = data.symbols;
    })

    this.socketService.listen('live').subscribe((data: any) => {
      this.currentStocks = data.data;
    })

    this.socketService.listen('historical').subscribe((data: any) => {
      this.historicalData = data.stocks;
    })

    this.getCurrent();

    setInterval(() => {
      this.getCurrent();
    }, 5000);
  }

  getCurrent() {
    this.socketService.emit('live', {'request-type': 'live', 'data': [this.index, (this.index + 1) % 10, (this.index + 2) % 10]});
    this.index = (this.index + 1) % 10;
  }

  getHistorical(data: any, event: Event) {
    event.preventDefault();
    this.socketService.emit('historical', {'request-type': 'historical', 'data': {'symbols': /*this.stockList*/ ['F'], interval: data}});
  }
}
