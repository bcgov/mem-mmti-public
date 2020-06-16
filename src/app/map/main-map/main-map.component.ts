import { Component, Input, HostBinding, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { CookieService } from 'ngx-cookie-service';

import { MapInitEvent } from 'app/map/esri-map/esri-map.component';
import { MapConfigService } from 'app/map/core';
import { WidgetBuilder } from 'app/map/widgets/widget-builder';
import * as utils from 'app/map/support/map-utils';

@Component({
  selector: 'app-main-map',
  templateUrl: './main-map.component.html',
  styleUrls: ['./main-map.component.scss']
})
export class MainMapComponent implements OnInit, OnDestroy {
  // public properties
  webMapProperties: __esri.WebMapProperties;
  mapViewProperties: __esri.MapViewProperties;
  popupProperties: __esri.PopupTemplateProperties;
  geocoderProperties: any;
  map: __esri.Map;
  mapView: __esri.MapView;

  pointLayerTitle: string;
  pointLayer: __esri.FeatureLayer;

  // this is needed to auto-open the map disclaimer modal on page load
  @ViewChild('modal') modal: ElementRef;
  modalRef: NgbModalRef;

  @Input() animate = true;
  @Input() showBoundaries = true;
  @Input() showDisclaimer = false;  // Enable this here to start using the on-map-load disclaimer again.
  @HostBinding('class.full-screen') fullScreen = true;

  // private fields
  private cookieValue = 'UNKNOWN';
  private selectedId: string;
  private sub: Subscription;
  private boundariesVisible: boolean;

  constructor(
    private config: MapConfigService,
    private route: ActivatedRoute,
    private router: Router,
    private widgetBuilder: WidgetBuilder,
    private modalService: NgbModal,
    private cookieService: CookieService
  ) { }

  ngOnInit() {
    const props = this.config.get();
    this.pointLayerTitle = props.mainMap.pointLayerTitle;
    this.webMapProperties = props.mainMap.webmap;
    this.mapViewProperties = props.mainMap.mapView;
    this.popupProperties = props.mainMap.popup;
    this.geocoderProperties = props.mainMap.geocoder;
    this.boundariesVisible = this.showBoundaries;

    // only show disclaimer once per user
    if (this.showDisclaimer) {
      this.checkDisclaimerCookie();
    }

    // need to wrap this call in a Promise to work around a bug in ng-bootstrap (`setTimeout` also works)
    // (see https://github.com/ng-bootstrap/ng-bootstrap/issues/1775)
    if (this.showDisclaimer) {
      Promise.resolve().then(() => this.openModal());
    }
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  onMapInit(mapInfo: MapInitEvent): void {
    const map = mapInfo.map;
    const view = mapInfo.mapView;
    const widgetBuilder = this.widgetBuilder;
    const popupProperties = this.popupProperties;
    const geocoder = this.geocoderProperties;

    // find the feature layer with `project` data.
    const layerTitle = this.pointLayerTitle;
    const featureLayer = <__esri.FeatureLayer>utils.findLayerByTitle(map, layerTitle);

    // point layer is required to complete map initialization...
    if (!featureLayer) {
      console.log(`The map view failed to initialize: could not find layer with title '${layerTitle}'`);
      return;
    }

    // store local references to map and view
    this.map = map;
    this.mapView = view;
    this.pointLayer = featureLayer;

    this.mapView.on('click', utils.onClickHandler(featureLayer, view, popupProperties));
    this.mapView.on('pointer-move', utils.onMouseoverHandler(featureLayer, view, popupProperties));

    // 1- wait for layers to load
    // 2- set map popup to match our custom styling
    // 3- create interactive map controls (e.g. zoom, search widgets)
    // 4- automatically show project popup on the map when coming from project details page
    utils.whenLayersReady([featureLayer])
      .then(() => utils.setPopupTemplate(featureLayer, popupProperties))
      .then(() => utils.addWidgets(view, widgetBuilder, { search: { featureLayer, geocoder } }))
      .then(() => {
        // grabbing route parameters (the Observable way)
        this.sub = this.route.paramMap.subscribe(
          (params: ParamMap) => this.onRouteChange(params),
          () => this.sub.unsubscribe(),
          () => this.sub.unsubscribe(),
        );
      });
  }

  get boundariesButtonText(): string {
    return this.boundariesVisible ? 'Hide Boundaries' : 'Show Boundaries';
  }

  toggle() {
    this.boundariesVisible = !this.boundariesVisible;
    this.setVisibilityForAllBoundaries(this.boundariesVisible);
  }

  goToHomePage() {
    this.closeModal();
    this.router.navigate(['/']);
  }

  private checkDisclaimerCookie() {
    const cookieExists = this.cookieService.check('disclaimerSeenOnce');
    if (cookieExists) {
      this.cookieValue = this.cookieService.get('disclaimerSeenOnce') || 'UNKNOWN';
    }

    // show map disclaimer only once. will not show on repeat visits to the site
    this.showDisclaimer = this.cookieValue !== 'true';
  }

  // wait a year before asking again...
  private setDisclaimerCookie() {
    const now = new Date();
    const nextYear = new Date(now.getFullYear() + 1, now.getMonth(), now.getDate());
    this.cookieService.set('disclaimerSeenOnce', 'true', nextYear);
  }

  private openModal() {
    this.modalRef = this.modalService.open(this.modal, { keyboard: false, backdrop: 'static' });

    // The promise is resolved when the modal is closed...
    this.modalRef
      .result
      .then(value => {
        // If the user accepts the terms and conditions, don't ask again (in a year)
        if (value === 'accept') {
          this.setDisclaimerCookie();
        }
      })
      .catch(() => { /* ignore */ });
  }

  private closeModal() {
    this.modalRef.dismiss('disagree');
  }

  private setVisibilityForAllBoundaries(value: boolean) {
    const map = this.map;
    return utils.whenLayersReady(map.layers.toArray())
      .then(() => utils.findAllBoundaryLayers(map))
      .then(boundaries => boundaries.forEach(layer => layer.visible = value));
  }

  private onRouteChange(params: ParamMap) {
    // fetch the project Id from URL/route params (if any)
    this.selectedId = params.get('project');

    // automatically show project popup on the map when coming from project details page
    if (this.selectedId && this.mapView && this.pointLayer) {
      this.navigateToProject(this.selectedId, this.mapView, this.pointLayer, this.animate);
    }
  }

  private navigateToProject(id: string, view: __esri.MapView, featureLayer: __esri.FeatureLayer, animate = this.animate) {
    let target: __esri.Graphic;
    return utils
      .findProjectById(featureLayer, id)
      .then((response: __esri.FeatureSet) => {
        target = response && response.features && response.features.length ? response.features[0] : null;
      })
      .then(() => utils.zoomToLocation(view, target, animate))
      .then(() => utils.showMapPopup(view, target));
  }
}
