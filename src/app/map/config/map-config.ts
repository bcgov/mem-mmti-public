import { InjectionToken } from '@angular/core';

import { MapConfig } from './map-config.interface';

const webmaps = {
  dev: 'f08adba6da4a458f99a73099ad218fb3',
  test: 'f08adba6da4a458f99a73099ad218fb3',
  prod: 'f08adba6da4a458f99a73099ad218fb3'
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
    <span><strong>Type:</strong> {type}</span>
    <div class="popup-detail-container">{description}</div>
    <div class="popup-btn-container">
      <a class="btn slide-r-btn inverted" href="${detailsUrl('{code}')}">
        <span>Go to Mine Details</span><i class="material-icons">arrow_forward</i>
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
    mapView: {},
    popup: defaultPopupTemplate
  }
};

// make this configuration object available for injection
// https://angular.io/guide/dependency-injection#injectiontoken
export let MAP_CONFIG_TOKEN = new InjectionToken<MapConfig>('map.config');
