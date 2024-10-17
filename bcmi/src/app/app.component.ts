import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { DocumentService } from '@services/document.service';
import { ConfigService } from '@services/config.service';
import { Api } from '@services/api';

import {
  Event,
  NavigationEnd,
  NavigationCancel,
  NavigationStart,
  NavigationError,
  Router
} from '@angular/router';
import { Footer } from './models/content/footer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [DocumentService]
})
export class AppComponent implements OnInit, AfterViewInit {
  @ViewChild('informationModal') modal: ElementRef;
  modalRef: NgbModalRef;

  loggedIn: string;
  hostname: string;
  modalMessage: {
    startDate: string,
    endDate: string,
    description: string,
    _id: string,
    title: string
  };
  loading: boolean;
  footer: Footer;
  navigation: any;

  constructor(private cookieService: CookieService,
    private api: Api,
    private modalService: NgbModal,
    private configService: ConfigService,
    private router: Router) {
    if(configService.globalContent){
      this.footer = configService.globalContent.footer?.data.attributes;
      this.navigation = configService.globalContent.navigations?.data;
    }
    this.router.events.subscribe((event: Event) => {
      switch (true) {
        case event instanceof NavigationStart: {
          this.loading = true;
          break;
        }

        case event instanceof NavigationEnd:
        case event instanceof NavigationError:
        case event instanceof NavigationCancel: {
          this.loading = false;
          break;
        }
        default: {
          break;
        }

      }

    });
    // Used for sharing links.
    this.hostname = this.api.hostnameNRPTI;
  }

  ngOnInit() {
    this.loggedIn = this.cookieService.get('loggedIn');
    if (this.configService.config['COMMUNICATIONS'] && this.configService.config['COMMUNICATIONS'].data) {
      this.modalMessage = this.configService.config['COMMUNICATIONS'].data;
    }

    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  ngAfterViewInit() {
    this.openModalIfNew();
  }

  openModalIfNew() {
    if (this.modalMessage && this.modalMessage.description && this.datesAreValid() && this.messageIsNew()) {
      this.modalRef = this.modalService.open(this.modal, { keyboard: false, backdrop: 'static' });
    }
  }

  datesAreValid() {
    if (!this.modalMessage.startDate || !this.modalMessage.endDate) {
      return false;
    }

    const today = new Date();

    if ((new Date(this.modalMessage.startDate) <= today) && (new Date(this.modalMessage.endDate) > today)) {
      return true;
    }

    return false;
  }

  messageIsNew() {
    const cookie = this.cookieService.get('informationModalRead');

    // If the message has never been dismissed then treat it as new.
    if (!cookie) {
      return true;
    }

    // The it is a new message then remove the cookie and display it.
    if (cookie !== this.modalMessage._id) {
      this.cookieService.delete('informationModalRead');
      return true;
    }

    return false;
  }

  dismiss() {
    const expirationDate = new Date();
    expirationDate.setFullYear(expirationDate.getFullYear() + 1);

    this.cookieService.set('informationModalRead', this.modalMessage._id, expirationDate);
    this.modalRef.dismiss();
  }
}
