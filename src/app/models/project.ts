export class Project {
  _id: number;
  code: string;
  name: string;
  description: string;
  constructor(obj?: any) {
    this._id = obj && obj._id || null;
    this.code = obj && obj.code || null;
    this.name = obj && obj.name || null;
    this.description = obj && obj.description || null;
  }
}