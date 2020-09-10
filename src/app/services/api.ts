import {throwError as observableThrowError, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Params } from '@angular/router';
import { URLConstants } from 'app/shared/constants';

@Injectable()
export class Api {
  pathNRPTI: string;
  hostnameNRPTI: string;
  params: Params;
  env: 'local' | 'dev' | 'test' | 'prod';

  constructor(private http: HttpClient) {
    const host = this.getHostName(window.location.hostname);
    this.hostnameNRPTI = host.hostnameMEM;
    this.env = host.env;
    this.pathNRPTI  = this.getNRPTIPath(this.hostnameNRPTI);
  }

  getHostName(hostname: string) {
    let hostnameNRPTI: string;
    let env: 'local' | 'dev' | 'test' | 'prod';

    switch (hostname) {
      case 'localhost':
        // Local
        hostnameNRPTI  =   URLConstants.localApiHostname;
        env = 'local';
        break;

      case 'www-mem-mmt-dev.pathfinder.gov.bc.ca':
        // Dev
        hostnameNRPTI  = URLConstants.devApiHostname;
        env = 'dev';
        break;

      case 'www-mem-mmt-test.pathfinder.gov.bc.ca':
        // Test
        hostnameNRPTI  = URLConstants.testApiHostname;
        env = 'test';
        break;
      case 'www-mem-mmt-dev-v2.pathfinder.gov.bc.ca':
        // Test for v2 Feature Branch (temporary)
        hostnameNRPTI  = URLConstants.testApiHostname;
        env = 'test';
        break;
      default:
        // Prod
        hostnameNRPTI  = URLConstants.prodApiHostname;
        env = 'prod';
    }

    return { hostnameMEM: hostnameNRPTI, env };
  }

  getNRPTIPath(hostnameMEM) {
    return `${ hostnameMEM }/api`;
  }

  // Projects

  getProjects() {
    return this.getNRPTI(`public/search?dataset=MineBCMI&pageNum=0&pageSize=1000&sortBy=+name`);
  }

  getProjectById(projectId: string) {
    return this.getNRPTI(`public/search?dataset=Item&_id=${projectId}&_schemaName=MineBCMI`);
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
    let nameFromCode = projectCode
                        .toLowerCase() // should be lowercase already, but just in case
                        .split('-')
                        .map(name => name.charAt(0).toUpperCase() + name.slice(1))
                        .join(' ');

    return this.getNRPTI(`public/search?dataset=MineBCMI&keywords=${nameFromCode}&pageNum=0&pageSize=1&sortBy=-score`);
  }

  getProjectCollections(projectId: string) {
    return this.getNRPTI(`public/search?dataset=CollectionBCMI&pageNum=0&pageSize=1000&sortBy=-date&and[project]=${projectId}&fields=&populate=true`);
  }

  getCollectionRecord(recordId: string) {
    return this.getNRPTI(`public/search?dataset=Item&_id=${recordId}&populate=true`);
  }

  getCollectionDocuments(collectionId: string) {
    return this.getNRPTI(`public/search?dataset=CollectionDocuments&_id=${collectionId}`);
  }
  // Proponents

  getDocument(documentId: string) {
    return this.getNRPTI(`public/search?dataset=Item&_schemaName=Document&_id=${documentId}&populate=true`);
  }

  getProponents() {
    return new Observable(); // this.getNRPTI('organization');
  }

  // Methods

  getNRPTI(apiRoute: string, options?: Object) {
    return this.get(this.pathNRPTI, apiRoute, options);
  }

  lookupAddress(requestUrl: string, options?: Object) {
    return this.http.get(requestUrl, options || []);
  }

  handleError(error: any) {
    const reason = error.message ? error.message : (error.status ? `${error.status} - ${error.statusText}` : 'Server error');
    return observableThrowError(reason);
  }

  // Private

  private get(apiPath: string, apiRoute: string, options?: Object) {
    return this.http.get(`${ apiPath }/${ apiRoute }`, options || {});
  }
}
