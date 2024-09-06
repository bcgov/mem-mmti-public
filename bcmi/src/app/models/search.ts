import { Project } from '@models/project';
import { Proponent } from '@models/proponent';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

export class Search {
  _id: string;
  displayName: string;
  description: string;
  date: Date;
  parentType: string;
  type: string;
  status: string;
  hostname: string;
  project: Project;

  constructor(search?: any, hostname?: any) {
    this._id         = search && search._id         || null;
    this.displayName = search && search.displayName || null;
    this.parentType  = search && search.parentType  || null;
    this.type        = search && search.type        || null;
    this.date        = search && search.date        || null;
    this.status      = search && search.status      || null;
    this.project     = search && search.project     || null;
    this.hostname    = hostname;
  }
}

export class SearchArray {
  items: Search[];

  constructor(obj?: any) {
    this.items = obj && obj.items || [];
  }

  get length() {
    return this.items.length;
  }

  sort() {
    this.items.sort(function(a: Search, b: Search) {
      const aDate = a && a.date ? new Date(a.date).getTime() : 0;
      const bDate = b && b.date ? new Date(b.date).getTime() : 0;
      return bDate - aDate;
    });
  }

  add(search?: Search) {
    if (search) {
      this.items.push(search);
    }
  }
}

export class SearchTerms {
  keywords: string;
  projects: Project[];
  proponents: Proponent[];
  ownerships: Proponent[];
  dateStart: NgbDateStruct;
  dateEnd: NgbDateStruct;

  constructor() {
    this.keywords   = '';
    this.projects   = [];
    this.proponents = [];
    this.ownerships = [];
    this.dateStart  = null;
    this.dateEnd    = null;
  }

  getParams() {
    const params = {};

    if (this.keywords) {
      params['keywords'] = this.keywords.split(' ').join(',');
    }

    if (this.projects.length) {
      params['projects'] = this.projects.map(p => p._id).join(',');
    }

    if (this.proponents.length) {
      params['proponents'] = this.proponents.map(p => p._id).join(',');
    }

    if (this.ownerships.length) {
      params['ownerships'] = this.ownerships.map(o => o._id).join(',');
    }

    if (this.dateStart) {
      params['datestart'] = this.getDateParam(this.dateStart);
    }

    if (this.dateEnd) {
      params['dateend'] = this.getDateParam(this.dateEnd);
    }

    return params;
  }

  /**
   * Sets all search parameters to their original un-set state.
   * Sets keywords to empty string.
   * Sets projects to empty array.
   * Sets proponents to empty array.
   * Sets ownerships to empty array.
   * Sets dateStart to null.
   * Sets dateEnd to null.
   */
  clear() {
    this.keywords   = '';
    this.projects   = [];
    this.proponents = [];
    this.ownerships = [];
    this.dateStart  = null;
    this.dateEnd    = null;
  }

  private getDateParam(date: NgbDateStruct) {
    let dateParam = date.year + '-';

    if (date.month < 10) {
      dateParam += '0';
    }
    dateParam += date.month + '-';

    if (date.day < 10) {
      dateParam += '0';
    }
    dateParam += date.day;

    return dateParam;
  }
}
