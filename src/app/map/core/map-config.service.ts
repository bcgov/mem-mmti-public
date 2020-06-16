import { Injectable } from '@angular/core';

import { Api } from 'app/services/api';
import { GeocoderSettings } from 'app/map/widgets/support/geocoder';
import { ILoadScriptOptions } from 'esri-loader';

// Default ArcGIS options:
//   --> the specific version of the API that is to be used
//   --> suppress "deprecation" warnings in the console
//       https://www.__esri.com/arcgis-blog/products/js-api-arcgis/mapping/making-better-promises/
const arcgisDefaults: ILoadScriptOptions = {
  url: 'https://js.arcgis.com/4.6/',
  dojoConfig: {
    has: {
      'esri-promise-compatibility': 1,
      'esri-promise-compatibility-deprecation-warnings': 0
    }
  }
};

const webmaps = {
  dev: 'b8ea19982bd74db3bd968d3c7f038e43',
  test: 'b8ea19982bd74db3bd968d3c7f038e43',
  prod: 'b8ea19982bd74db3bd968d3c7f038e43'
};

export interface MapConfig {
  arcgis?: ILoadScriptOptions;
  mainMap?: {
    pointLayerTitle?: string;
    webmap?: __esri.WebMapProperties,
    mapView?: __esri.MapViewProperties,
    popup?: __esri.PopupTemplateProperties,
    geocoder?: GeocoderSettings;
  };
}

@Injectable()
export class MapConfigService {
  // cache map configuration object for improved performance
  private cache: MapConfig = null;

  constructor(private api: Api) { }

  public get(): MapConfig {
    // return cached value
    if (this.cache) {
      return { ...this.cache };
    } else {
      // create and cache value
      const config: MapConfig = this._create();
      this.cache = config;

      // return a copy so callers cannot alter the default configuration
      return { ...this.cache };
    }
  }

  private _create(): MapConfig {
    const loadScriptOptions = arcgisDefaults;
    const webmapId = this.webmapForEnv(this.api.env);
    // return configuration object
    return {
      arcgis: loadScriptOptions,
      mainMap: {
        pointLayerTitle: 'geojsonMMTI',
        webmap: {
          portalItem: { id: webmapId }
        },
        mapView: {
          constraints: {
            minZoom: 4,  // MEM-514 prevent user from zooming too far out
            rotationEnabled: false  // MEM-534 disable map rotation
          },
          ui: {
            components: ['attribution']
          }
        },
        popup: this.defaultPopupTemplate,
        geocoder: {
          type: 'databc',  // One of: [databc, arcgis]
          url: `${this.api.pathMEM}/geocoder`
        }
      }
    };
  }

  get defaultPopupTemplate(): __esri.PopupTemplateProperties {
    return {
      title: '{name}',
      content: `<div class="map-popup-content">
                  <ul class="map-popup-meta">
                    <li>
                      <span class="meta-name">Type:</span>
                      <span class="meta-value">{type}</span>
                    </li>
                  </ul>
                  <div class="map-popup-desc">{description}</div>
                  <div class="map-popup-btns">
                    <a class="btn btn-sm slide-r-btn" title="View additional information about {name}" href="${this.projectUrl('{code}')}">
                      <span>Go to Project Details</span><i class="material-icons">arrow_forward</i>
                    </a>
                  <div>
                  <div class="map-popup-disc">The Province has reviewed the geospatial information but makes
                  no guarantee or warranties whatsoever, either expressed or implied, with
                  respect to the accuracy or quality of information, content, or materials,
                  and disclaims all responsibility for the accuracy or completeness contained herein.</div>
                </div>`
    };
  }

  // generates link to mine details page; e.g. "http://<host>/p/<code>"
  private projectUrl(code: string): string {
    return `/p/${code}`;
  }

  private webmapForEnv(env: 'local' | 'dev' | 'test' | 'prod'): string {
    switch (env) {
      // local
      case 'local':
        return webmaps.dev;

      // dev
      case 'dev':
        return webmaps.dev;

      // test
      case 'test':
        return webmaps.test;

      // prod
      case 'prod':
      default:
        return webmaps.prod;
    }
  }
}
