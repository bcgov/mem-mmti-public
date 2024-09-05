export class Legislation {
  act: string;
  regulation: string;
  section: string;
  subSection: string;
  paragraph: string;

  constructor(obj?: any) {
    this.act = (obj && obj.act) || null;
    this.regulation = (obj && obj.regulation) || null;
    this.section = (obj && obj.section) || null;
    this.subSection = (obj && obj.subSection) || null;
    this.paragraph = (obj && obj.paragraph) || null;
  }

  public toString(): string {
    const legistrationStrings = [];

    if (this.act) {
      legistrationStrings.push(this.act);
    }

    if (this.regulation) {
      legistrationStrings.push(this.regulation);
    }

    if (this.section) {
      legistrationStrings.push(`s.${this.section}`);
    }

    if (this.subSection) {
      legistrationStrings.push(`(${this.subSection})`);
    }

    if (this.paragraph) {
      legistrationStrings.push(`(${this.paragraph})`);
    }

    return legistrationStrings.join(' ');
  }
}
