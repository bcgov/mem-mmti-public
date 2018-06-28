import { Injectable, EventEmitter, ElementRef } from '@angular/core';
import { EsriModuleProvider } from './esri-module-provider';

interface MapLoaderOptions {
  mapProperties?: __esri.MapProperties;
  webMapProperties?: __esri.WebMapProperties;
  mapViewProperties?: __esri.MapViewProperties;
  mapEl?: ElementRef;
}

@Injectable()
export class MapLoaderService {
  // The `loaded` event is fired when all required resources have been loaded
  isLoaded = new EventEmitter();
  map: __esri.Map;
  mapView: __esri.MapView;

  constructor(private moduleProvider: EsriModuleProvider) { }

  load(options: MapLoaderOptions = {}): Promise<{ map: __esri.Map, mapView: __esri.MapView }> {
    // destructuring assignment; this creates new variables "mapProperties", "webMapProperties", etc.
    // https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
    const { mapProperties, webMapProperties, mapViewProperties, mapEl } = options;

    // determine if loading a WebMap or creating a custom map
    if (mapProperties) {
      return this.loadMap(mapProperties, mapViewProperties, mapEl);
    } else if (webMapProperties) {
      return this.loadWebMap(webMapProperties, mapViewProperties, mapEl);
    }

    return Promise.reject(new Error('Proper map properties were not provided'));
  }

  private loadMap(mapProperties: __esri.MapProperties,
    mapViewProperties: __esri.MapViewProperties,
    mapEl: ElementRef): Promise<{ map: __esri.Map, mapView: __esri.MapView }> {
    // require modules
    return this.moduleProvider.require(['esri/Map', 'esri/views/MapView'])
      .then(([Map, MapView]: [__esri.MapConstructor, __esri.MapViewConstructor]) => {
        // create a Map instance
        const map = new Map(mapProperties);

        // create a MapView instance (for 2D viewing)
        const mapView = new MapView({
          ...mapViewProperties,
          container: mapEl.nativeElement,  // References a DOM element
          map: map,  // References a Map instance
        });

        // wait for the view to finish loading before proceeding...
        return mapView.when(() => {
          this.map = map;
          this.mapView = mapView;
          // fire event
          this.isLoaded.emit();
          return {
            map: map,
            mapView: mapView
          };
        }).catch((error) => {
          console.log('The map view failed to load: ', error);
        });
      });
  }

  private loadWebMap(webMapProperties: __esri.WebMapProperties,
    mapViewProperties: __esri.MapViewProperties,
    mapEl: ElementRef): Promise<{ map: __esri.Map, mapView: __esri.MapView }> {
    // require modules
    return this.moduleProvider.require(['esri/WebMap', 'esri/views/MapView'])
      .then(([WebMap, MapView]: [__esri.WebMapConstructor, __esri.MapViewConstructor]) => {
        // create a WebMap instance
        const webmap = new WebMap(webMapProperties);

        // create a MapView instance (for 2D viewing)
        const mapView = new MapView({
          ...mapViewProperties,
          container: mapEl.nativeElement,  // References a DOM element
          map: webmap,  // the WebMap instance created above
        });

        // wait for the view to finish loading before proceeding...
        return mapView.when(() => {
          this.map = webmap;
          this.mapView = mapView;
          // fire event
          this.isLoaded.emit();
          return {
            map: webmap,
            mapView: mapView
          };
        }).catch((error) => {
          console.log('The map view failed to load: ', error);
        });
      });
  }
}
