import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProjectService } from './services/project.service';
import { NewsService } from './services/news.service';

import { News } from './models/news';
import { ProjectComponent } from './project/project.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [ProjectService, NewsService]
})
export class AppComponent implements OnInit {
  recentNews: Array<News>;
  hostname: String;
  constructor(private newsService: NewsService, private _router: Router) {
    // Used for sharing links.
    this.hostname = encodeURI(window.location.href.replace(/\/$/, ''));
  }

  scrollToTop() {
    window.scrollTo(0, 0);
  }

  ngOnInit() {
    this._router.events.subscribe((url: any) => {
      if (url.url === '/') {
        this.newsService.getRecentNews().subscribe(
          data => { this.recentNews = data; },
          error => console.log(error)
        );
      } else {
        this.recentNews = null;
      }
      document.body.scrollTop = 0;
    });

  }
}
