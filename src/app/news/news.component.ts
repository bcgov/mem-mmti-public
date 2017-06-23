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
  constructor(private newsService: NewsService) { }

  ngOnInit() {
  	this.newsService.getAll().subscribe(
      data => { this.results = data; },
      error => console.log(error)
    );
  }

}
