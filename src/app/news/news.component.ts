import { Component, OnInit, Input } from '@angular/core';
import { NewsService } from '../news.service';

@Component({
  selector: 'news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {
  @Input() stockList: {symbol: string, image: string}[] = []
  @Input() dark: boolean = false;
  newsResults: any = []; 
  constructor(public newsService: NewsService) { }

  ngOnInit(): void {
    setTimeout(() => {
      const random = Math.floor(Math.random() * 10);
      // this.getNews(this.stockList[random].symbol);
    }, 100)
  }

  getNews(value: string) {
    this.newsService.searchNews(value)
      .then((response: any) => {
        this.newsResults = response.data;
        console.log(this.newsResults);
      })
  }

  handleChange(event: Event) {
    console.log((event.target as HTMLSelectElement).value);
    this.getNews((event.target as HTMLSelectElement).value);
  }

}
