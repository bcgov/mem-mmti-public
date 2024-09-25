import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Page } from '../../models/content/page';
import { Apollo, gql } from 'apollo-angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PageComponent implements OnInit {

  pageData: Page;

  constructor(private activatedRoute: ActivatedRoute){};

  ngOnInit() {
    //window.scrollTo(0, 0);
    this.activatedRoute.data.subscribe((response: any) => {
      this.pageData = response.pageData;
    })
    
  }

}
