import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { PageScrollConfig } from 'ng2-page-scroll';
import { CookieService } from 'ngx-cookie-service';
import { Subscription } from 'rxjs/Subscription';

import { HomeComponent } from './home/home.component';
import { NewsService } from './services/news.service';
import { DocumentService } from './services/document.service';
import { SearchComponent } from './search/search.component';

import { News } from './models/news';
import { Api } from './services/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [NewsService, DocumentService]
})
export class AppComponent implements OnInit, OnDestroy {
  recentNews: Array<News>;
  loggedIn: String;
  hostname: String;
  private sub: Subscription;
  constructor(private newsService: NewsService,
              private route: ActivatedRoute,
              private _router: Router,
              private cookieService: CookieService,
              private api: Api) {
    // Used for sharing links.
    this.hostname = api.hostnameMEM;

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
    this.loggedIn = this.cookieService.get('loggedIn');
    this.sub = this.route.queryParams.subscribe((params: Params) => {
      console.log('params:', params);
      // set params
      this.api.setParams(params);
    });
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
      document.documentElement.scrollTop = 0;
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}

