import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  
  constructor(private http: HttpClient) { }

  public searchNews(value: string) {
    return new Promise((resolve, reject) => {
      this.http.get(`https://api.marketaux.com/v1/news/all?symbols=${value}&filter_entities=true&language=en&api_token=RHgijdhwvXFZSiNEw3YdE5XnwpvkOTh1hbT6ecjH`).subscribe(
        (response) => {
          resolve(response);
        }, (err) => {
          reject(err);
        }
      )
    })
  }
}
