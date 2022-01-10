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

  constructor(private socketService: SocketService) {  }

  ngOnInit() {
    this.socketService.listen('list').subscribe((data: any) => {
      this.stockList = data.symbols;
    })

    this.socketService.listen('live').subscribe((data: any) => {
      this.currentStocks = data;
    })

    this.getCurrent();

    setInterval(() => {
      this.getCurrent();
    }, 5000);
  }

  getCurrent() {
    this.socketService.emit('live', [this.index, (this.index + 1) % 10, (this.index + 2) % 10]);
    this.index = (this.index + 1) % 10;
  }
}
