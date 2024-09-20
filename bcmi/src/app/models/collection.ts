export class Collection {
  _id: string;
  displayName: string;
  date: Date;
  datePublished: Date;
  parentType: string;
  type: string;
  status: string;
  agency: string;
  records: string[];

  documents: {
    name: string;
    ref: string;
    date: Date;
  }[];

  constructor(collection?: any) {
    this._id           = collection && collection._id                     || null;
    this.displayName   = collection && collection.name                    || null;
    this.type          = collection && collection.type                    || null;
    this.status        = collection && collection.status                  || null;
    this.agency        = collection && collection.agency.toLowerCase()    || null;
    this.date          = collection && new Date(collection.date)          || null;
    this.datePublished = collection && new Date(collection.datePublished) || null;
    this.records       = collection && collection.records                 || null;

    if (collection) {
      // Make sure parent type is set if it's null
      if (!this.parentType && this.type) {

        switch (this.type) {
          case 'Permit':
          case 'Certificate':
          case 'Amalgamated Permit':
          case 'Permit Amendment':
          case 'Certificate Amendment':
            this.parentType = 'Authorizations';
            break;

          case 'Inspection Report':
          case 'Inspection Record':
          case 'Order':
            this.parentType = 'Compliance and Enforcement';
            break;

          case 'Annual Report':
          case 'Management Plan':
          case 'Dam Safety Inspection':
          case 'Letter of Assurance':
          case 'Proponent Self Report':
          case 'Self Report':
            this.parentType = 'Other';
            break;
          default:
            this.parentType = 'Other';
        }
      }

      // Check status next
      if (this.parentType === 'Authorizations' && !this.status) {
        switch (this.type) {
          case 'Permit':
          case 'Certificate':
            this.status = 'Issued';
            break;
          case 'Amalgamated Permit':
            this.status = 'Amalgamated';
            break;
          default:
            this.status = 'Amended';
        }
      }

      // Set documents
      this.documents = [];
    }
  }
}

export class CollectionsArray {
  items: Collection[];

  constructor(obj?: any) {
    this.items = obj && obj.items || [];
  }

  get length() {
    return this.items.length;
  }

  sort() {
    // Sort collections by descending date, i.e. most recent.
    this.items.sort(function(a: Collection, b: Collection) {
      const aDate = a.date ? a.date.getTime() : 0;
      const bDate = b.date ? b.date.getTime() : 0;
      return bDate - aDate;
    });
  }

  add(collection?: Collection) {
    if (collection) {
      this.items.push(collection);
    }
  }
}

export class CollectionsGroup {
  eao: CollectionsArray;
  env: CollectionsArray;
  mem: CollectionsArray;
  emli: CollectionsArray;

  constructor(obj?: any) {
    this.eao = obj && obj.eao || new CollectionsArray();
    this.env = obj && obj.env || new CollectionsArray();
    this.emli = obj && obj.emli || new CollectionsArray();
  }

  sort() {
    this.eao.sort();
    this.env.sort();
    this.emli.sort();
  }

  hasItems(): boolean {
    if ((this.eao && this.eao.length) ||
        (this.env && this.env.length) ||
        (this.mem && this.mem.length) ||
        (this.emli && this.emli.length)) {
      return true;
    }

    return false;
  }
}

export class CollectionsList {
  authorizations: CollectionsGroup;
  compliance: CollectionsArray;
  documents: CollectionsArray;

  constructor(obj?: any) {
    this.authorizations = obj && obj.authorizations || new CollectionsGroup();
    this.compliance     = obj && obj.compliance     || new CollectionsArray();
    this.documents      = obj && obj.documents      || new CollectionsArray();
  }
}


