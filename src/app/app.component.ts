import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PageScrollConfig } from 'ng2-page-scroll';

import { HomeComponent } from './home/home.component';
import { NewsService } from './services/news.service';

import { News } from './models/news';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [NewsService]
})
export class AppComponent implements OnInit {
  recentNews: Array<News>;
  hostname: String;
  constructor(private newsService: NewsService, private _router: Router) {
    // Used for sharing links.
    this.hostname = encodeURI(window.location.href.replace(/\/$/, ''));

    PageScrollConfig.defaultScrollOffset = 50;
    PageScrollConfig.defaultEasingLogic = {
      ease: (t: number, b: number, c: number, d: number): number => {
        // easeInOutExpo easing
        if (t === 0) {
          return b;
        }
        if (t === d) {
          return b + c;
        }
        if ((t /= d / 2) < 1) {
          return c / 2 * Math.pow(2, 8 * (t - 1)) + b;
        }
        return c / 2 * (-Math.pow(2, -8 * --t) + 2) + b;
      }
    };
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

