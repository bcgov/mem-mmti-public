export class AddressResponse {
  public properties: {
    accessNotes: string,
    blockID: number,
    changeDate: string,
    civicNumber: number,
    civicNumberSuffix: string,
    electoralArea: string,
    faults: {
      element: string,
      fault: string,
      penalty: number,
      value: string
    }[],
    fullAddress: string,
    fullSiteDescriptor: string,
    isOfficial: string,
    isStreetDirectionPrefix: string,
    isStreetTypePrefix: string,
    localityName: string,
    localityType: string,
    locationDescriptor: string,
    locationPositionalAccuracy: string,
    matchPrecision: string,
    precisionPoints: number,
    provinceCode: string,
    score: number,
    siteID: string,
    siteName: string,
    siteRetireDate: string,
    siteStatus: string,
    streetDirection: string,
    streetName: string,
    streetQualifier: string,
    streetType: string,
    unitDesignator: string,
    unitNumber: string,
    unitNumberSuffix: string
  }
}
  