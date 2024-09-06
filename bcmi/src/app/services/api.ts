import {throwError as observableThrowError, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Params } from '@angular/router';
import { ConfigService } from '@services/config.service';

@Injectable()
export class Api {
  pathNRPTI: string;
  hostnameNRPTI: string;
  geocoderAPI: string;
  params: Params;
  env: 'local' | 'dev' | 'test' | 'prod';

  constructor(
    private http: HttpClient,
    private configService: ConfigService
    ) {
    this.hostnameNRPTI = this.configService.config['API_LOCATION'];
    this.geocoderAPI = this.configService.config['GEOCODER_API'];
    this.env = this.configService.config['ENVIRONMENT'];
    this.pathNRPTI = this.configService.config['API_LOCATION'] + this.configService.config['API_PUBLIC_PATH'];
  }

  // Projects

  getProjects() {
    return this.getNRPTI(`search?dataset=MineBCMI&pageNum=0&pageSize=1000&sortBy=+name`);
  }

  getProjectById(projectId: string) {
    return this.getNRPTI(`search?dataset=Item&_id=${projectId}&_schemaName=MineBCMI`);
  }

  // Not currently used, but it's highly likely that this will come back at some point in the near
  // future (business prefers using the code vs guid) so leaving in for now.
  getProjectByCode(projectCode: string) {
    // code is the name lowercased, spaces converted to dashes
    // not on nrpti model, but we can derive the name from it
    // and do a keyword search
    if (!projectCode || projectCode.length === 0) {
      this.handleError(new Error('Project Code is invalid'));
    }

    // codes need to be converted into the project name
    const nameFromCode = projectCode
                        .toLowerCase() // should be lowercase already, but just in case
                        .split('-')
                        .map(name => name.charAt(0).toUpperCase() + name.slice(1))
                        .join(' ');

    return this.getNRPTI(`search?dataset=MineBCMI&keywords=${nameFromCode}&pageNum=0&pageSize=1&sortBy=-score`);
  }

  getProjectCollections(projectId: string) {
    return this.getNRPTI(`search?dataset=CollectionBCMI&pageNum=0&pageSize=1000&sortBy=-date&and[project]=${projectId}&fields=&populate=true`);
  }

  getCollectionRecord(recordId: string) {
    return this.getNRPTI(`search?dataset=Item&_id=${recordId}&populate=true`);
  }

  getCollectionDocuments(collectionId: string) {
    return this.getNRPTI(`search?dataset=CollectionDocuments&_id=${collectionId}`);
  }
  // Proponents

  getDocument(documentId: string) {
    return this.getNRPTI(`search?dataset=Item&_schemaName=Document&_id=${documentId}&populate=true`);
  }

  getProponents() {
    return new Observable(); // this.getNRPTI('organization');
  }

  // Enforcement actions
  getEnforcementActions() {
    return this.getNRPTI(
      `search?dataset=CourtConvictionBCMI,AdministrativePenaltyBCMI&pageNum=0&pageSize=1000&sortBy=-dateIssued&and[issuingAgency]=AGENCY_EMLI&populate=true`
    );
  }

  // Methods

  getNRPTI(apiRoute: string, options?: object) {
    return this.get(this.pathNRPTI, apiRoute, options);
  }

  lookupAddress(addressUrl: string, options?: object) {
    return this.http.get(`${ this.geocoderAPI }${ addressUrl }`, options || {});
  }

  handleError(error: any) {
    const reason = error.message ? error.message : (error.status ? `${error.status} - ${error.statusText}` : 'Server error');
    return observableThrowError(reason);
  }

  // Private

  private get(apiPath: string, apiRoute: string, options?: object) {
    return this.http.get(`${ apiPath }/${ apiRoute }`, options || {});
  }
}
