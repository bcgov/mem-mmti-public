import { Component, Input, HostBinding, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Project } from 'app/models/project';
import { ProjectService } from 'app/services/project.service';
import * as L from 'leaflet';


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
  set loading(val: boolean) {
    this._loading = val;
    if (val) {
      this.mapSearch.onLoadStart();
      this.mineMap.onLoadStart();
    } else {
      this.mapSearch.onLoadEnd();
      this.mineMap.onLoadEnd();
    }
  }

  public projects: Array<Project> = [];
  public mapApps: Array<Project> = [];
  public filterApps: Array<Project> = [];
  // private fields
  private sub: Subscription;

  constructor(
    private projectService: ProjectService,
    private router: Router,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.getProjects();
    // prevent underlying map actions for search compoonent
    const map_search = <HTMLElement>document.getElementById('map-search');
    L.DomEvent.disableClickPropagation(map_search);
    L.DomEvent.disableScrollPropagation(map_search);
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
    this.mapApps = this.filterApps.filter(a => a.isMatch);
    // NB: OnChanges event will update the map
    this.mineMap.resetMap();
  }

  private getProjects() {
    this.loading = true;
    this.projects = []; // empty the list

    this.projectService.getAll().subscribe(results => {
      if (results && results.length > 0) {
        this.projects = results;
        this.mapApps = this.projects;
        this.filterApps = this.projects;
      }
    });

    this.loading = false;
  }


}
