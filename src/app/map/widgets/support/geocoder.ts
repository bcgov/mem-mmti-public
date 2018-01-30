import * as _ from 'lodash';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { Feature, FeatureCollection, Point } from 'geojson';
import { createRequestBuilder } from './geocoder-api';
import { EsriLoaderService } from 'angular-esri-loader';

// The following "type" declarations do not generate code.
// They just provide better intellisense and type checking with TypeScript.
//
// ArcGIS tweaks and fixes (node_modules/@types/arcgis-js-api/index.d.ts)
//   - adds undocumented `maxSuggestions` property to geocoder configuration.
//   - fixes `esri/request` type definition.
type LocatorSuggestLocationsParams = __esri.LocatorSuggestLocationsParams & { maxSuggestions?: number };
type EsriRequest = (url: string, options?: __esri.requestEsriRequestOptions) => IPromise<any>;
interface EsriResponse {
  /** The requested data. */
  data?: any;
  /** The options specified by the user in the data request. */
  requestOptions?: __esri.requestEsriRequestOptions;
  /** The URL used to request the data. */
  url?: string;
  /** Method for getting a header sent from the server. */
  getHeader?: __esri.GetHeader;
}

// GeoJSON response sent back by DataBC address locator
// https://github.com/bcgov/api-specs/blob/master/geocoder/geocoder-developer-guide.md#resource-representations-in-http-responses
type GeocodeAddressResults = ServerMetadata & FeatureCollection<Point>;
interface ServerMetadata {
  queryAddress?: string;
  searchTimestamp?: string;
  version?: string;
  executionTime?: number;
  srsCode?: number;
  maxResults?: number;
  disclaimer?: string;
  privacyStatement?: string;
  copyrightNotice?: string;
  copyrightLicense?: string;
}

export interface GeocoderSettings {
  type?: string;
  url?: string;
  suggestUrl?: string;
}

export function singleLineFieldName(options: GeocoderSettings = {}): string {
  return options.type === 'databc' ? 'addressString' : 'SingleLine';
}

export function createGeocoder(esriLoader: EsriLoaderService, options: GeocoderSettings = {}): Promise<__esri.Locator> {
  if (options.type === 'databc') {
    return createDataBcGeocoder(esriLoader, options);
  } else {
    return createArcgisGeocoder(esriLoader, options);  // default
  }
}

function createArcgisGeocoder(esriLoader: EsriLoaderService, options: GeocoderSettings = {}): Promise<__esri.Locator> {
  const url = options.url || '//geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer';
  return esriLoader.loadModules(['esri/tasks/Locator'])
    .then(([Locator]: [__esri.LocatorConstructor]) => new Locator({ url: url }));
}

function createDataBcGeocoder(esriLoader: EsriLoaderService, options: GeocoderSettings = {}): Promise<__esri.Locator> {
  const url = options.url || 'https://apps.gov.bc.ca/pub/geocoder';
  return createClass(esriLoader, options)
    .then((DataBcLocator: __esri.LocatorConstructor) => new DataBcLocator({ url: url }));
}

/**
 * Creates a geocoder class that leverages the DataBC Geocoder API
 * https://raw.githubusercontent.com/bcgov/api-specs/master/geocoder/geocoder.json
 */
function createClass(esriLoader: EsriLoaderService, options: GeocoderSettings = {}): Promise<__esri.LocatorConstructor> {
  return esriLoader.loadModules([
    'esri/tasks/Locator',
    'esri/tasks/support/AddressCandidate',
    'esri/geometry/support/webMercatorUtils',
    'esri/geometry/SpatialReference',
    'esri/request',
    'esri/config'])
    .then((modules: [
      __esri.LocatorConstructor,
      __esri.AddressCandidateConstructor,
      __esri.webMercatorUtils,
      __esri.SpatialReference,
      EsriRequest,
      __esri.config]) => {

      const [Locator, AddressCandidate, webMercatorUtils, SpatialReference, esriRequest, esriConfig] = modules;

      // As of Jan 2018, the autocomplete capability of the DataBC geocoder is available in Test, not in production.
      // To handle this, two URLs are passed in the config object:
      //    `url`: Production service to implement single line address search
      //    `suggestUrl`: Test service to implement auto-complete suggestions
      const url = options.url || 'https://apps.gov.bc.ca/pub/geocoder';
      const suggestUrl = options.suggestUrl || 'https://test.apps.gov.bc.ca/pub/geocoder';

      // Add known servers to the list of CORS enabled servers.
      esriConfig.request.corsEnabledServers.push(url);
      esriConfig.request.corsEnabledServers.push(suggestUrl);

      // Return the new class
      return (<any>Locator).createSubclass({
        declaredClass: 'databc.tasks.Locator',
        properties: {
        },

        // Find candidates for a single address specified in the address parameter.
        // https://developers.arcgis.com/javascript/latest/api-reference/esri-tasks-Locator.html#addressToLocations
        addressToLocations(params: __esri.LocatorAddressToLocationsParams,
          requestOptions?: any): IPromise<__esri.AddressCandidate[]> {

          const self: __esri.Locator = this;
          const { outSpatialReference } = self;
          const { address, maxLocations } = params;
          const singleLineField = singleLineFieldName(options);

          //  var address = {
          //    "addressString": "525 Superior St, Victoria, BC"
          //  };
          const addressString: string = address[singleLineField];

          const requestUrl = createRequestBuilder(url)
            .setOutputFormat('json')
            .setAddress(addressString)
            .setAutoComplete(false)
            .setMaxResults(maxLocations)
            .setEcho(false)
            .build();

          // Request geojson data from remote server
          return esriRequest(requestUrl, { responseType: 'json' })
            .then((response: EsriResponse) => {
              // The requested data
              const geojson: GeocodeAddressResults = response.data;
              const features = geojson.features || [];

              // Parse server results into something that ArcGIS can understand...
              return features.map(f => {
                const json = this._parseAddressCandidate(f);
                return AddressCandidate.fromJSON(json);
              });
            });
        },

        // Get character by character auto-complete suggestions.
        // https://developers.arcgis.com/javascript/latest/api-reference/esri-tasks-Locator.html#suggestLocations
        suggestLocations(params: LocatorSuggestLocationsParams, requestOptions?): IPromise<__esri.SuggestionResult[]> {
          const self: __esri.Locator = this;
          const { outSpatialReference } = self;
          const { text, maxSuggestions } = params;

          // Try `suggestUrl` if available, or fallback to `url`
          const requestUrl = createRequestBuilder(suggestUrl)
            .setOutputFormat('json')
            .setAddress(text)
            .setAutoComplete(true)
            .setMaxResults(maxSuggestions)
            .setEcho(false)
            .build();

          // Request geojson data from remote server
          return esriRequest(requestUrl, { responseType: 'json' })
            .then((response: EsriResponse) => {
              // The requested data
              const geojson: GeocodeAddressResults = response.data;
              const features = geojson.features || [];

              // Parse server results into something that ArcGIS can understand...
              return features.map((f, index) => this._parseSuggestionResult(f, index));
            });
        },

        _parseAddressCandidate(result: Feature<Point>): __esri.AddressCandidateProperties {
          // Ensure we got a proper Point geometry object
          if (result.geometry.type !== 'Point') {
            throw new Error('Invalid response. Location should be a Point');
          }

          // The coordinates order is [longitude, latitude]
          // https://macwright.org/2015/03/23/geojson-second-bite#position
          const [lng, lat] = result.geometry.coordinates;
          const { fullAddress, score } = result.properties;

          // Convert lat, long (WSG84) to Web Mercator coords
          const [x, y] = webMercatorUtils.lngLatToXY(lng, lat);

          return {
            address: fullAddress as string,
            score: score as number,
            location: {  // autocasts as new Point()
              x: x,
              y: y,
              spatialReference: SpatialReference.WebMercator
            },
            attributes: _.omit(result.properties, ['fullAddress', 'score'])
          };
        },

        _parseSuggestionResult(result: Feature<Point>, index: number): __esri.SuggestionResult {
          const { fullAddress } = result.properties;
          return {
            text: fullAddress as string,
            magicKey: '' + index,  // convert number to string
            isCollection: false
          };
        }
      });
    });
}
