import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { Footer } from '@app/models/content/footer';
import { Api } from '@app/services/api';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  encapsulation: ViewEncapsulation.None,
})

export class FooterComponent implements OnInit {

  @Input() footerData: Footer;
  @Input() navigation: any;
  hostname: string;
  constructor( private api: Api) { }

  ngOnInit() {
    this.hostname = this.api.hostnameNRPTI;
    window.scrollTo(0, 0);
    console.log(this.navigation);
  }

}
