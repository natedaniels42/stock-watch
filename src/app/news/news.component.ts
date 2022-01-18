import { Component, OnInit, Input } from '@angular/core';
import { StockInfo } from '../Interfaces';
import { NewsService } from '../news.service';

@Component({
  selector: 'news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {
  @Input() stockList: StockInfo[] = []
  @Input() dark: boolean = false;
  newsResults: any = []; 
  constructor(public newsService: NewsService) { }

  /**
   * Makes a call to the NewsService to get news stories on a random stock
   * Timeout is set to wait for stockList to be populated
   * @returns - void
   */
  ngOnInit(): void {
    setTimeout(() => {
      const random = Math.floor(Math.random() * 10);
      this.getNews(this.stockList[random].symbol);
    }, 1000)
  }

  /**
   * Calls the newsService to get news data on the selected stock from the select input
   * in the HTML and sets the result to the newsResults property
   * @param value - string
   * @returns - void
   */
  getNews(value: string): void {
    this.newsService.searchNews(value)
      .then((response: any) => {
        this.newsResults = response.data;
      })
  }

  /**
   * Calls the newsService to get results on the chosen stock
   * Occurs on a change event on the select element in HTML
   * @param event - Event
   * @returns - void
   */
  handleChange(event: Event): void {
    this.getNews((event.target as HTMLSelectElement).value);
  }

}
