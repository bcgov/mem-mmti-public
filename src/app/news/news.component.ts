import { Component, OnInit } from '@angular/core';
import {News} from '../models/news';
import {NewsService} from '../services/news.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {
	results: Array<News>;
  loading: boolean;
  constructor(private newsService: NewsService) { }

  ngOnInit() {
    this.loading = true;
  	this.newsService.getAll().subscribe(
      data => {
        this.results = data;
        this.loading = false;
      },
      error => console.log(error)
    );
  }

}
