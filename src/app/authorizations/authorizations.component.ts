import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-authorizations',
  templateUrl: './authorizations.component.html',
  styleUrls: ['./authorizations.component.scss']
})
export class AuthorizationsComponent implements OnInit {

  constructor( private router: Router ) {
    // Note: Angular 'fragment' attribute is not working so this is a work around until they decide to fix it
    // Get URL and find the fragment of it which should be an ID. Scroll to said ID.
    this.router.events.subscribe(event => {
        if (event instanceof NavigationEnd) {
            const url = router.parseUrl(router.url);
            if (url.fragment) {
              const element = document.querySelector('#' + url.fragment);
              if (element) {
                element.scrollIntoView();
              }
            }
         }
    });
  }

  ngOnInit() {
    window.scrollTo(0, 0);
  }

}
