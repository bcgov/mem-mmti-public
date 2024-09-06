import { Component, Input, HostBinding, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Project } from '@models/project';
import { ProjectService } from '@services/project.service';
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
  public projects: Project[] = [];
  public mapApps: Project[] = [];
  public filterApps: Project[] = [];
  public places: any[] = [];
  // private fields
  private sub: Subscription;

  constructor(
    private projectService: ProjectService,
    private router: Router,
    private modalService: NgbModal
  ) { }

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

  ngOnInit() {
    this.getProjects();
    // prevent underlying map actions for search compoonent
    const map_search = document.getElementById('map-search') as HTMLElement;
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
    if (this.mapApps.length !== 1) {
      this.mineMap.resetMap();
    }
  }

  public showPlace($event) {
    this.places = $event;
    this.mineMap.drawPlace(this.places);

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
