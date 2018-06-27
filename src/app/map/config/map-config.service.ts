import { Injectable } from '@angular/core';

import { Api } from 'app/services/api';
import { GeocoderSettings } from '../widgets/support/geocoder';

const webmaps = {
  dev: 'f08adba6da4a458f99a73099ad218fb3',
  test: 'f08adba6da4a458f99a73099ad218fb3',
  prod: 'b8ea19982bd74db3bd968d3c7f038e43'
};

export interface MapConfig {
  mainMap?: {
    pointLayerTitle?: string;
    webmap?: __esri.WebMapProperties,
    mapView?: __esri.MapViewProperties,
    popup?: __esri.PopupTemplateProperties,
    mouseover?: __esri.PopupTemplateProperties,
    geocoder?: GeocoderSettings;
  };
}

@Injectable()
export class MapConfigService {

  constructor(private api: Api) { }

  public get(): MapConfig {
    const webmapId = this.webmapForEnv(this.api.env);
    return {
      mainMap: {
        pointLayerTitle: 'MMTI Major Mines',
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
        mouseover: this.defaultMouseoverTemplate,
        geocoder: {
          type: 'databc',  // One of: [databc, arcgis]
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
                </div>`
    };
  }

  get defaultMouseoverTemplate(): __esri.PopupTemplateProperties {
    return {
      title: '{name}',
      content: `<div class="map-mouseover-hidden-description-content"></div>`
    };
  }

  // generates link to mine details page; e.g. "http://<host>/p/<code>"
  private projectUrl(code: string): string {
    const { protocol, host } = window.location;
    return `${protocol}//${host}/p/${code}`;
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
