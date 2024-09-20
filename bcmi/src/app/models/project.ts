import { CollectionsList } from '@models/collection';
import { LatLng, latLng } from 'leaflet';

/**
 * Link schema-field specification.
 *
 * Note: This is not itself a schema.  This is a field of existing schema(s).
 *
 * @export
 * @class Link
 */
 export class Link {
  title: string;
  url: string;

  constructor(obj?: any) {
    this.title = (obj && obj.title) || '';
    this.url = (obj && obj.url) || '';
  }
}
export class Project {
  _id:                  string;
  _schemaName:          string;
  _sourceRefId:         string;
  read:                 string[];
  write:                string[];
  // attributes
  name:                 string;
  permitNumber:         string;
  showPermitNumber:     boolean;
  status:               string;
  type:                 string;
  commodities:          string[];
  tailingsImpoundments: number;
  region:               string;
  location:             object;
  permittee:            string;
  summary:              string;
  description:          string;
  links:                Link[];
  // metadata boilerplate
  dateAdded:            Date;
  dateUpdated:          Date;
  datePublished:        Date;
  addedBy:              string;
  updatedBy:            string;
  publishedBy:          string;
  sourceDateAdded:      Date;
  sourceDateUpdated:    Date;
  sourceSystemRef:      string;

  // old mem model
  code: string;
  subtitle: string;
  operator: string;
  memPermitID: string;
  morePermitsLinkYear: string;
  morePermitsLink: string;
  moreInspectionsLink: string;
  moreInspectionsLinkYear: string;
  epicProjectCodes: string[];
  collections: CollectionsList;
  content: {
    type: string;
    page: string;
    html: string;
  }[];

  // search helpers
  isMatch?: boolean = true;

  constructor(obj?: any) {
    this._id                  = (obj && obj._id)                  || null;
    this._schemaName          = (obj && obj._schemaName)          || 'MineBCMI';
    this._sourceRefId         = (obj && obj._sourceRefId)         || '';
    this.read                 = (obj && obj.read)                 || null;
    this.write                = (obj && obj.write)                || null;
    // attributes
    this.name                 = (obj && obj.name)                 || '';
    this.permitNumber         = (obj && obj.permitNumber )        || '';
    this.showPermitNumber     = (obj && obj.showPermitNumber); // Cannot set default on boolean here.
    this.status               = (obj && obj.status)               || '';
    this.type                 = (obj && obj.type)                 || '';
    this.commodities          = (obj && obj.commodities)          || [];
    this.tailingsImpoundments = (obj && obj.tailingsImpoundments) || 0;
    this.region               = (obj && obj.region)               || '';
    this.location             = (obj && obj.location)             || null;
    this.permittee            = (obj && obj.permittee)            || '';
    this.summary              = (obj && obj.summary)              || '';
    this.description          = (obj && obj.description)          || '';
    this.links                = (obj && obj.links && obj.links.length && obj.links.map(link => new Link(link))) || null;

    // metadata boilerplate
    this.dateAdded            = (obj && obj.dateAdded)            || null;
    this.dateUpdated          = (obj && obj.dateUpdated)          || null;
    this.datePublished        = (obj && obj.datePublished)        || null;
    this.addedBy              = (obj && obj.addedBy)              || '';
    this.updatedBy            = (obj && obj.updatedBy)            || '';
    this.publishedBy          = (obj && obj.publishedBy)          || '';
    this.sourceDateAdded      = (obj && obj.sourceDateAdded)      || null;
    this.sourceDateUpdated    = (obj && obj.sourceDateUpdated)    || null;
    this.sourceSystemRef      = (obj && obj.sourceSystemRef)      || '';
    // original project model
    this.code                    = this.name.replace(/\W+/g, '-').toLowerCase();
    this.memPermitID             = obj && obj.memPermitID              || null;
    this.subtitle                = obj && obj.subtitle                 || null;
    this.morePermitsLinkYear     = obj && obj.morePermitsLinkYear      || null;
    this.morePermitsLink         = obj && obj.morePermitsLink          || null;
    this.moreInspectionsLink     = obj && obj.moreInspectionsLink      || null;
    this.moreInspectionsLinkYear = obj && obj.moreInspectionsLinkYear  || null;
    this.epicProjectCodes        = obj && obj.epicProjectCodes         || [];
    this.collections             = obj && obj.collections              || null;

    // create the "content" pages
    this.content = [
      {
        type: 'Intro',
        page: 'Mines',
        html: this.summary
      },
      {
        type: 'Intro',
        page: 'Auth',
        html: ''
      },
      {
        type: 'Intro',
        page: 'Comp',
        html: ''
      },
      {
        type: 'Intro',
        page: 'Other',
        html: ''
      }
    ];
  }

  getContent(page: string, type: string): string {
    try {
      const entry = this.content.find(x => x.type === type && x.page === page);
      return entry.html;
    } catch (e) {// eslint-disable-line @typescript-eslint/no-unused-vars
      return '';
    }
  }

  hasCoordinates(): boolean{
    return this.location && this.location['coordinates'][1] && this.location['coordinates'][0];
  }

  getCoordinates(): LatLng{
    return latLng(this.location['coordinates'][1], this.location['coordinates'][0]);
  }
}
