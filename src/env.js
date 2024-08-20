(function (window) {
  window.__env = window.__env || {};

  // Ideally in our app we have a wrapper around our logger class in the angular front ends to
  // turn on/off the console.log's
  window.__env.enableDebug = false;

  //These will replaced by config.service.ts
  window.__env.ENVIRONMENT = 'local';  // local | dev | test | prod

  window.__env.API_LOCATION = 'http://localhost:3000';
  window.__env.NRCED_LOCATION = 'https://nrced.gov.bc.ca/'
  window.__env.API_PATH = '/api';
  window.__env.API_PUBLIC_PATH = '/api/public';
  window.__env.GEOCODER_API = 'https://geocoder.api.gov.bc.ca';

  // Add any feature-toggles
  // window.__env.coolFeatureActive = false;
}(this));
