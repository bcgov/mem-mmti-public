import { Project } from './project';

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

  sort() {
    this.items.sort(function(a: Search, b: Search) {
      const aDate = a && a.date ? new Date(a.date).getTime() : 0;
      const bDate = b && b.date ? new Date(b.date).getTime() : 0;
      return bDate - aDate;
    });
  }

  get length() {
    return this.items.length;
  }

  add(search?: Search) {
    if (search) {
      this.items.push(search);
    }
  }
}
