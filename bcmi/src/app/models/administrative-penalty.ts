import { Legislation } from '@models/legislation';
import { Penalty } from '@models/penalty';

export class AdministrativePentalty {
  _id: string;
  issuedTo: string;
  dateIssued: string;
  legislations: Legislation[];
  penalties: Penalty[];
  penaltiesString: string;
  location: string;
  mineGuid: string;
  unlistedMine: string;
  unlistedMineType: string;
  documents: {
    fileName: string;
    url: string;
  }[];

  constructor(obj?: any) {
    this._id = (obj && obj._id) || null;
    this.dateIssued = (obj && obj.dateIssued) || null;
    this.legislations =
      (obj &&
        obj.legislation &&
        obj.legislation.length &&
        obj.legislation.map(legislation => new Legislation(legislation))) ||
      null;
    this.penalties =
      (obj && obj.penalties && obj.penalties.length && obj.penalties.map(penalty => new Penalty(penalty))) || null;
    this.penaltiesString =
      (this.penalties && this.penalties.map(penalty => penalty.buildPenaltyValueString()).join(', ')) || null;
    this.location = (obj && obj.location) || null;
    this.mineGuid = (obj && obj.mineGuid) || null;
    this.unlistedMine = (obj && obj.unlistedMine) || null;
    this.unlistedMineType = (obj && obj.unlistedMineType) || null;
    this.documents = (obj && obj.documents) || [];

    this.issuedTo = (obj && obj.issuedTo) || null;
    if (obj && obj.issuedTo && obj.issuedTo.fullName) {
      this.issuedTo = obj.issuedTo.fullName;
    } else {
      this.issuedTo = '';
    }
  }
}
