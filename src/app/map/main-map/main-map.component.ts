import { Component, Inject, HostBinding, OnInit } from '@angular/core';

import { MAP_CONFIG_TOKEN, DEFAULT_MAP_CONFIG, MapConfig } from '../config';

@Component({
  selector: 'app-main-map',
  templateUrl: './main-map.component.html',
  styleUrls: ['./main-map.component.scss'],
  providers: [
    { provide: MAP_CONFIG_TOKEN, useValue: DEFAULT_MAP_CONFIG }
  ]
})
export class MainMapComponent implements OnInit {
  webMapProperties: __esri.WebMapProperties;
  mapViewProperties: __esri.MapViewProperties;
  popupProperties: __esri.PopupProperties;
  map: __esri.Map;
  mapView: __esri.MapView;

  @HostBinding('class.full-screen') fullScreen = true;

  constructor(@Inject(MAP_CONFIG_TOKEN) private config: MapConfig) { }

  ngOnInit() {
    this.webMapProperties = this.config.mainMap.webmap;
    this.mapViewProperties = this.config.mainMap.mapView;
    this.popupProperties = this.config.mainMap.popup;
  }

  onMapInit(mapInfo: { map: __esri.Map, mapView: __esri.MapView }): void {
    this.map = mapInfo.map;
    this.mapView = mapInfo.mapView;

    if (this.popupProperties) {
      this.overridePopup(this.popupProperties);
    }
  }

  private overridePopup(popupTemplate: __esri.PopupTemplateProperties): Promise<void> {
    return new Promise((resolve, reject) => {
      const setPopup = (fl: __esri.FeatureLayer) => {
        fl.popupTemplate.title = <string>popupTemplate.title;
        fl.popupTemplate.content = <string>popupTemplate.content;
      };

      const featureLayer: __esri.FeatureLayer = this.map.layers.find((lyr: __esri.Layer) => lyr.type === 'feature');
      if (!featureLayer) {
        return resolve();
      }

      // the `esri/layers/FeatureLayer` instance is promise-based
      // call the .then() method to execute code once the layer is ready
      return featureLayer.then(setPopup)
        .then(resolve)
        .otherwise(reject);
    });
  }
}
