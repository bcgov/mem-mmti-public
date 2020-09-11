import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { DocumentService } from 'app/services/document.service';
import { ConfigService } from 'app/services/config.service';
import { Api } from 'app/services/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [DocumentService]
})
export class AppComponent implements OnInit, AfterViewInit {
  @ViewChild('informationModal') modal: ElementRef;
  modalRef: NgbModalRef;

  loggedIn: String;
  hostname: String;
  modalMessage: any;

  constructor(private cookieService: CookieService,
              private api: Api,
              private modalService: NgbModal,
              private configService: ConfigService) {
    // Used for sharing links.
    this.hostname = this.api.hostnameNRPTI;
  }

  ngOnInit() {
    this.loggedIn = this.cookieService.get('loggedIn');
    this.modalMessage = this.configService.config['COMMUNICATIONS'];

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

    if ((this.modalMessage.startDate <= today) && (this.modalMessage.endDate > today)) {
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
