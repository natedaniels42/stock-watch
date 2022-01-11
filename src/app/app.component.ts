import { Component } from '@angular/core';
import { NewsService } from './news.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'StockWatch';

  constructor(public newsService: NewsService) {  }

  ngOnInit() {

  }

  handleClick(event: Event) {
    event.preventDefault();

    this.newsService.searchNews('TSLA')
      .then((response: any) => {
        console.log(response);
      })
  }
}
