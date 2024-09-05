class RequestBuilder {
  // required
  private _outputFormat: string;
  private _addressString: string;

  // optional
  private _minScore: number;
  private _maxResults: number;
  private _outputSRS: number;

  private _echo = false;
  private _autoComplete = false;

  // search within an area (bounding box)
  private _bbox: string;  // A bounding box (xmin,ymin,xmax,ymax) that limits the search area

  // search within an area (centre point + distance in meters)
  private _centre: string;  // The coordinates of a centre point (x,y) used to define a bounding circle that will limit the search area
  private _maxDistance: number;

  constructor() {
    this._outputFormat = 'json';
    this._outputSRS = 4326;  // --> WGS84 (default map projection)
  }

  get outputFormat(): string {
    return this._outputFormat;
  }

  get address(): string {
    return this._addressString;
  }

  get minScore(): number {
    return this._minScore;
  }

  get maxResults(): number {
    return this._maxResults;
  }

  get outputSRS(): number {
    return this._outputSRS;
  }

  get echo(): boolean {
    return this._echo;
  }

  get maxDistance(): number {
    return this._maxDistance;
  }

  get autoComplete(): boolean {
    return this._autoComplete;
  }

  get bbox(): string {
    return this._bbox;
  }

  get centre(): string {
    return this._centre;
  }


  /**
   * Specifies the format of the return geocoding results.
   * Valid outputFormat parameters are: csv, json, geojson, gml, kml, shpz, xhtml
   */
  setOutputFormat(value: string): RequestBuilder {
    this._outputFormat = value;
    return this;
  }

  /**
   * Specifies the address to be geocoded as a single string
   */
  setAddress(address: string): RequestBuilder {
    this._addressString = address;
    return this;
  }

  /**
   * Specifies the minimum acceptable score of returned results.
   * Results with scores lower than this will not be returned. The score
   * value ranges from 0-100; a minScore of 0 returns all results.
   */
  setMinScore(value: number): RequestBuilder {
    this._minScore = value;
    return this;
  }

  /**
   * Specifies the maximum number of results to return. This is applied after the `minScore` requirement.
   * It is intended to prevent unnecessary overhead while waiting for a large, complete list of results
   * to return when only a short list of the best matches is required. Setting maxResults to 0 will
   * return the maximum number of results allowable by the system.
   */
  setMaxResults(value: number): RequestBuilder {
    this._maxResults = value;
    return this;
  }

  /**
   * Specifies the Spatial Referencing System (SRS) to use for the locations in the results.
   * Many SRS's are supported but it only makes sense to use an SRS which is valid for area in which the
   * results are. SRS's are specified using their EPSG code, an integer generally in the range of 1-1,000,000.
   * Common examples are 3005 (BC Albers) and 4326 (Geographic) which is the default.
   */
  setOutputSRS(value: number): RequestBuilder {
    this._outputSRS = value;
    return this;
  }

  /**
   * Specifies whether to echo back unmatched address information in the results.
   * For example, with echo enabled, an apartment number or site name specified in the address query,
   * but which is not present in the database, is still included in the results.
   */
  setEcho(value: boolean): RequestBuilder {
    this._echo = value;
    return this;
  }

  /**
   * If `true`, addressString is expected to contain a partial address that requires completion.
   * Not supported for `shp`, `csv`, `gml` formats.
   */
  setAutoComplete(value: boolean): RequestBuilder {
    this._autoComplete = value;
    return this;
  }

  /**
   * Specifies a rectangular geographic area used to filter results of a query.
   * Coordinates are specified as xmin,ymin,xmax,ymax. By default, coordinates are
   * longitude minimum, latitude minimum, longitude maximum, latitude maximum in the
   * default output SRS, 4326 (WGS84).
   */
  setBBox(bbox: string): RequestBuilder {
    this._bbox = bbox;
    return this;
  }

  /**
   * Specifies the coordinates of a centre point (x,y) used to define a bounding circle
   * that will limit the search area. `centre` and `maxDistance` together define a search area.
   */
  setCentre(point: string): RequestBuilder {
    this._centre = point;
    return this;
  }

  /**
   * Specifies the maximum distance (in metres) to search from the given point.
   * If not specified, the maximum distance is unlimited.
   */
  setMaxDistance(value: number): RequestBuilder {
    this._maxDistance = value;
    return this;
  }

  /**
   * Combines all of the request parameters into a single request URL.
   * This url can then be used, for example, to navigate to or in an AJAX request.
   * @returns the URL used to get the results of the geocode request
   */
  build(): string {
    let url = '/addresses';
    if (this._outputFormat) {
      url += '.' + encodeURIComponent(this._outputFormat);
    }
    url += '?';
    if (this._addressString) {
      url += 'addressString=' + encodeURIComponent(this._addressString) + '&';
    }
    // optional args
    if (typeof this._maxResults !== 'undefined') {
      url += 'maxResults=' + this._maxResults + '&';
    }
    if (typeof this._minScore !== 'undefined') {
      url += 'minScore=' + this._minScore + '&';
    }
    if (this._centre) {
      url += 'centre=' + encodeURIComponent(this._centre) + '&';
    }
    if (this._maxDistance) {
      url += 'maxDistance=' + this._maxDistance + '&';
    }
    if (this._bbox) {
      url += 'bbox=' + encodeURIComponent(this._bbox) + '&';
    }
    if (typeof this._echo !== 'undefined') {
      url += 'echo=' + this._echo + '&';
    }
    if (typeof this._autoComplete !== 'undefined') {
      url += 'autoComplete=' + this._autoComplete + '&';
    }
    if (this._outputSRS) {
      url += 'outputSRS=' + this._outputSRS + '&';
    }
    return url;
  }
}

export function createRequestBuilder(): RequestBuilder {
  return new RequestBuilder();
}
