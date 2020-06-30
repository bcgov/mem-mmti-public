import { Component, Input, HostBinding, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-main-map',
  templateUrl: './main-map.component.html',
  styleUrls: ['./main-map.component.scss']
})
export class MainMapComponent implements OnInit, OnDestroy {

  // this is needed to auto-open the map disclaimer modal on page load
  @ViewChild('modal') modal: ElementRef;
  modalRef: NgbModalRef;

  @Input() animate = true;
  @Input() showBoundaries = true;
  @HostBinding('class.full-screen') fullScreen = true;

  // private fields
  private sub: Subscription;

  constructor(
    private router: Router,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  goToHomePage() {
    this.router.navigate(['/']);
  }

  showDisclaimer() {
    this.modalRef = this.modalService.open(this.modal, { keyboard: false, backdrop: 'static' });
  }

  closeDialog() {
    this.modalRef.dismiss();
  }
}
