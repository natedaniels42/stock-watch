import { Component, OnInit, Input } from '@angular/core';
import { NewsService } from '../news.service';

@Component({
  selector: 'news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {
  @Input() stockList: string[] = []
  newsResults: any = []; 
  constructor(public newsService: NewsService) { }

  ngOnInit(): void {
  }

  handleChange(event: Event) {
    console.log((event.target as HTMLSelectElement).value)
    this.newsService.searchNews((event.target as HTMLSelectElement).value)
      .then((response: any) => {
        this.newsResults = response.data;
        console.log(this.newsResults);
      })
  }

}
