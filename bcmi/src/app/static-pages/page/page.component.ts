import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Page } from '../../models/content/page';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PageComponent implements OnInit {

  pageData: Page;
  isTwoColumn: boolean;

  constructor(private activatedRoute: ActivatedRoute){};

  ngOnInit() {
    window.scrollTo(0, 0);
    this.activatedRoute.data.subscribe((response: any) => {
      this.pageData = response.pageData;
    })
    // This conditional will need to be changed whenever sidecards are added to the template
    this.isTwoColumn = !!this.pageData.External_card || !!this.pageData.Ongoing_card || !!this.pageData.Related_card || !!this.pageData.Enforcement_Actions_card;
  }

}
