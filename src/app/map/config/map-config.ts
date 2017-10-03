import { InjectionToken } from '@angular/core';

import { MapConfig } from './map-config.interface';

const webmaps = {
  dev: 'b8ea19982bd74db3bd968d3c7f038e43',
  test: 'b8ea19982bd74db3bd968d3c7f038e43',
  prod: 'b8ea19982bd74db3bd968d3c7f038e43'
};

const webmapForEnv = (): string => {
  const { hostname } = window.location;
  switch (hostname) {
    // prod
    case 'mines.nrs.gov.bc.ca':
      return webmaps.prod;

    // test
    case 'mmti-test.pathfinder.gov.bc.ca':
      return webmaps.test;

    // dev (localhost OR mmti-dev.pathfinder.gov.bc.ca)
    default:
      return webmaps.dev;
  }
};

// generates link to mine details page; e.g. "http://<host>/p/<code>"
const detailsUrl = (code: string): string => {
  const { protocol, host } = window.location;
  return `${protocol}//${host}/p/${code}`;
};

export const defaultPopupTemplate = {
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
                <a class="btn btn-sm slide-r-btn" href="${detailsUrl('{code}')}">
                  <span>Go to Project Details</span><i class="material-icons">arrow_forward</i>
                </a>
              <div>
            </div>`
};

// What if the dependency value isn't a class? Sometimes the thing you want to inject
// is a string, function, or object. Applications often define configuration objects
// with lots of small facts (like the title of the application or the address of a web API endpoint)
// but these configuration objects aren't always instances of a class.
// They can be object literals such as this one:
export const DEFAULT_MAP_CONFIG: MapConfig = {
  mainMap: {
    webmap: {
      portalItem: {
        id: webmapForEnv()
      }
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
    popup: defaultPopupTemplate
  }
};

// make this configuration object available for injection
// https://angular.io/guide/dependency-injection#injectiontoken
export let MAP_CONFIG_TOKEN = new InjectionToken<MapConfig>('map.config');
