import { Component, Input, HostBinding, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Project } from 'app/models/project';

@Component({
  selector: 'app-main-map',
  templateUrl: './main-map.component.html',
  styleUrls: ['./main-map.component.scss']
})
export class MainMapComponent implements OnInit, OnDestroy {

  // this is needed to auto-open the map disclaimer modal on page load
  @ViewChild('modal') modal: ElementRef;
  @ViewChild('mineMap', {static: true}) mineMap;
  @ViewChild('mapSearch', {static: true}) mapSearch;
  modalRef: NgbModalRef;

  @Input() animate = true;
  @Input() showBoundaries = true;
  @HostBinding('class.full-screen') fullScreen = true;

  public _loading = false;
  set isLoading(val: boolean) {
    this._loading = val;
    if (val) {
      this.mapSearch.onLoadStart();
    } else {
      this.mapSearch.onLoadEnd();
    }
  }

  public mapApps: Array<Project> = [];
  public filterApps: Array<Project> = [];
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

    /**
   * Event handler called when filters component updates list of matching apps.
   */
   public updateMatching() {
    // map component gets filtered apps
    // todo figure out replacement for isMatches that epic uses
    this.mapApps = this.filterApps.filter(a => a.name);
    // NB: OnChanges event will update the map
    this.mineMap.resetMap();
  }

  /**
   * Event handler called when map component updates list of visible apps.
   */
  // public updateVisible() {
  //   // list component gets visible apps
  //   this.listApps = this.mapApps.filter(a => a.isVisible);
  //   // NB: OnChanges event will update the list
  // }
}
