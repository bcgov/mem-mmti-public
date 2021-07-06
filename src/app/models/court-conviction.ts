import { Legislation } from 'app/models/legislation';
import { Penalty } from 'app/models/penalty';

export class CourtConviction {
  _id: string;
  issuedTo: string;
  dateIssued: string;
  legislation: Legislation;
  penalties: Penalty[];
  penaltiesString: string;
  location: string;
  mineGuid: string;
  unlistedMine: string;
  unlistedMineType: string;
  documents: object[];
  description: string;

  constructor(obj?: any) {
    this._id = (obj && obj._id) || null;
    this.dateIssued = (obj && obj.dateIssued) || null;
    this.legislation = (obj && obj.legislation && new Legislation(obj.legislation)) || null;
    this.penalties =
      (obj && obj.penalties && obj.penalties.length && obj.penalties.map(penalty => new Penalty(penalty))) || null;
    this.penaltiesString =
      (this.penalties && this.penalties.map(penalty => penalty.buildPenaltyValueString()).join(', ')) || null;
    this.location = (obj && obj.location) || null;
    this.mineGuid = (obj && obj.mineGuid) || null;
    this.unlistedMine = (obj && obj.unlistedMine) || null;
    this.unlistedMineType = (obj && obj.unlistedMineType) || null;
    this.documents = (obj && obj.documents) || [];
    this.description = (obj && obj.description) || '';

    this.issuedTo = (obj && obj.issuedTo) || null;
    if (obj && obj.issuedTo && obj.issuedTo.fullName) {
      this.issuedTo = obj.issuedTo.fullName;
    } else {
      this.issuedTo = '';
    }
  }
}
