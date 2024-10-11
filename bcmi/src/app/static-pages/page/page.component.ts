import { afterRender, Component, OnInit, ViewEncapsulation } from '@angular/core';
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
  routerLink: string;
  initialFragment: string | null;
  isTwoColumn: boolean;
  handledFragmentFlag: boolean;

  constructor(private activatedRoute: ActivatedRoute){
    this.initialFragment = null;
    this.routerLink = "/" + activatedRoute.snapshot.routeConfig.path;

    afterRender(() => {
      // Only need to do this once after our content loaded
      if (this.handledFragmentFlag) { return; }
      const contentHasLoaded = document.getElementById('page-content').hasChildNodes();
      if (contentHasLoaded && this.initialFragment) {
        this.jumpToSection(this.initialFragment);
        this.handledFragmentFlag = true;
      }
    });
  };

  ngOnInit() {
    window.scrollTo(0, 0);
    this.activatedRoute.data.subscribe((response: any) => {
      this.pageData = response.pageData;
    });
    this.activatedRoute.fragment.subscribe(fragment => {
      this.initialFragment = fragment;
    });
    // This conditional will need to be changed whenever sidecards are added to the template
    this.isTwoColumn = !!this.pageData.External_card || !!this.pageData.Ongoing_card || !!this.pageData.Related_card || !!this.pageData.Enforcement_Actions_card;
  }

  jumpToSection(section: string | null) {
    if (section) {
      document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
    }
  }

}
