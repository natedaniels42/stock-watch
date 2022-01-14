import { Component, OnInit } from '@angular/core';
import { SocketService } from '../socket.service';

import { HistoricalData, HistoricalSearch, Stock, StockInfo } from '../Interfaces';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  index: number = 0;
  timer: number = 0;
  dark: boolean = false;
  stockList: StockInfo[] = [];
  currentStocks: Stock[] = [];
  historicalData: HistoricalData[] = []; 
  interval: number = 0;
  historicalSearch: HistoricalSearch = {
    symbols: [],
    start: 0,
    end: 0,
    interval: 0
  }

  constructor(private socketService: SocketService) { }

  /**
   * Implements the socketService listeners for 'list', 'live', and 'historical
   * Calls this.getCurrent to emit the 'live' call to socket
   * Makes an initial call to the socket to get starter historical data of Ford and AT&T
   * for the past week at an interval of one day
   * Sets up an interval to call to the socket every 2 seconds to get live data
   * @returns - void
   */
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
      this.interval = data.interval;
      console.log('Historical Data');
      console.log(this.historicalData);
    })

    this.getCurrent();

    this.getHistorical({
      symbols: ['F', 'T'],
      start: Date.now() - 604800000,
      end: Date.now(),
      interval: 1440});

    /**
     * Interval to set timed calls to the socket to retrieve live data
     * Every 2 seconds the live data is retrieved
     * Every 20 seconds the index is moved forward 1 spot to update the stocks displayed
     */
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

  /**
   * Receives the result of the toggleMode method in the sidebar component and sets
   * the dark property to that value
   * @param value - a boolean
   * @returns - void
   */
  setDarkMode(value: boolean): void {
    this.dark = value;
    console.log(this.dark);
  }

  /**
   * Shifts the index property forward or backward by one depending on which button is clicked
   * Receives the value of the handleClick method in the secondary chart container component
   * Calls the socket to get the live data with new index and resets the timer so the
   * charts won't change immediately
   * @param value - a number
   * @returns - void
   */
  moveIndex(value: number): void {
    this.index += value;
    if (this.index === -1) {
      this.index = 9;
    } else if (this.index === 10) {
      this.index = 0;
    }
    this.timer = 0;
    this.getCurrent();
  }

  /**
   * Calls to the socket to get live data
   * @return - void
   */
  getCurrent(): void {
    // Pato: This function is difficult to read/understand, might help to make some variables =>
    // let my_interval = (this.index + 1) % 10
    this.socketService.emit('live', {'request-type': 'live', 'data': [this.index, (this.index + 1) % 10, (this.index + 2) % 10]});
  }

  /**
   * Calls to the socket to get historical data
   * @param data - HistoricalSearch interface
   * @param event - optional Event
   * @returns - void
   */
  getHistorical(data: HistoricalSearch, event?: Event): void {
    if (event) {
      event.preventDefault();
    }

    this.socketService.emit('historical', {'request-type': 'historical', 'data': data});
  }
}
