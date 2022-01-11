import { Component, OnInit } from '@angular/core';
import { SocketService } from '../socket.service';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  index: number = 0;
  stockList: string[] = [];
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
      this.getCurrent();
    }, 5000);
  }

  getCurrent() {
    this.socketService.emit('live', {'request-type': 'live', 'data': [this.index, (this.index + 1) % 10, (this.index + 2) % 10]});
    this.index = (this.index + 1) % 10;
  }

  getHistorical(data: any, event?: Event) {
    if (event) {
      event.preventDefault();
    }

    this.socketService.emit('historical', {'request-type': 'historical', 'data': {'symbols': this.stockList, interval: data}});
  }
}
