import { Component, OnInit, ElementRef, ViewChild, EventEmitter, Input, Output } from '@angular/core';

import { MapLoaderService } from '../map-loader.service';

/* tslint:disable:component-selector */
@Component({
  selector: 'esri-map',
  templateUrl: './esri-map.component.html',
  styleUrls: ['./esri-map.component.scss']
})
/* tslint:enable:component-selector */
export class EsriMapComponent implements OnInit {
  map: __esri.Map;
  mapView: __esri.MapView;

  // create the MapView at the DOM element in this component
  @ViewChild('map') mapEl: ElementRef;

  @Input() mapProperties: __esri.MapProperties;
  @Input() webMapProperties: __esri.WebMapProperties;
  @Input() mapViewProperties: __esri.MapViewProperties = {};
  @Input() suppressPopupActions = false;

  @Output() mapInit = new EventEmitter();

  constructor(private mapLoader: MapLoaderService) { }

  ngOnInit() {
    if (this.map) {
      // map is already initialized
      return;
    }

    this.loadMap();
  }

  loadMap(): Promise<any> {
    const options = {
      mapProperties: this.mapProperties,
      webMapProperties: this.webMapProperties,
      mapViewProperties: this.mapViewProperties,
      mapEl: this.mapEl
    };

    // suppress default popup actions; i.e. "zoom-to"
    if (this.suppressPopupActions) {
      options.mapViewProperties = { ...options.mapViewProperties, popup: { actions: [] } };
    }

    return this.mapLoader.load(options)
      .then(mapInfo => {
        this.map = mapInfo.map;
        this.mapView = mapInfo.mapView;

        // emit event informing application that the map has been loaded
        this.mapInit.emit({
          map: this.map,
          mapView: this.mapView
        });
        this.mapInit.complete();
      });
  }
}
