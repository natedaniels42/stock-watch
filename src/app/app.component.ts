import { Component, OnInit } from '@angular/core';
import { SocketService } from './socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'StockWatch';
  stockList: string[] = [];

  constructor(private socketService: SocketService) {  }

  ngOnInit() {
    this.socketService.listen('list').subscribe((data: any) => {
      console.log(data);
    })
  }
}
