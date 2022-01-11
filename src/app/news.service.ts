import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  api_key: string = 'RHgijdhwvXFZSiNEw3YdE5XnwpvkOTh1hbT6ecjH'
  url: string = `https://api.marketaux.com/v1/news/all?symbols=T&filter_entities=true&language=en&api_token=${this.api_key}`
  
  constructor(private http: HttpClient) { }

  public searchNews() {
    return new Promise((resolve, reject) => {
      this.http.get(this.url).subscribe(
        (response) => {
          resolve(response);
        }, (err) => {
          reject(err);
        }
      )
    })
  }
}
