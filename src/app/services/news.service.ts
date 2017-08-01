import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class NewsService {

  constructor(private http: Http) { }
  getAll() {
    return this.http.get('https://projects.eao.gov.bc.ca/api/recentactivity')
      .map((res: Response) => res.json());
  }
  getRecentNews() {
    return this.http.get('https://projects.eao.gov.bc.ca/api/recentactivity')
      .map((res: Response) => res.json().slice(0, 4));
  }
}
