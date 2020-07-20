import {throwError as observableThrowError, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Params } from '@angular/router';



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
        hostnameNRPTI  = 'http://localhost:3000';
        env = 'local';
        break;

      case 'www-mem-mmt-dev.pathfinder.gov.bc.ca':
        // Dev
        hostnameNRPTI  = 'https://nrpti-dev.pathfinder.gov.bc.ca';
        env = 'dev';
        break;

      case 'www-mem-mmt-test.pathfinder.gov.bc.ca':
        // Test
        hostnameNRPTI  = 'https://nrpti-test.pathfinder.gov.bc.ca';
        env = 'test';
        break;
      case 'www-mem-mmt-dev-v2.pathfinder.gov.bc.ca':
        // Test for v2 Feature Branch (temporary)
        hostnameNRPTI  = 'https://nrpti-test.pathfinder.gov.bc.ca';
        env = 'test';
        break;
      default:
        // Prod
        hostnameNRPTI  = 'https://nrpti-prod.pathfinder.gov.bc.ca';
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

// get by id? `record/${model}/${recordId}`

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

  // may be ignorable if fetched as a populate=true from projectByCode
  getProjectCollections(projectCode: string) {
    let nameFromCode = projectCode
                        .toLowerCase() // should be lowercase already, but just in case
                        .split('-')
                        .map(name => name.charAt(0).toUpperCase() + name.slice(1))
                        .join(' ');

    return this.getNRPTI(`public/search?dataset=MineBCMI&keywords=${nameFromCode}&pageNum=0&pageSize=1&sortBy=-score&populate=true`);
  }

  // Proponents

  getProponents() {
    return new Observable(); // this.getNRPTI('organization');
  }

  // Methods

  getNRPTI(apiRoute: string, options?: Object) {
    return this.get(this.pathNRPTI, apiRoute, options);
  }

  handleError(error: any) {
    const reason = error.message ? error.message : (error.status ? `${error.status} - ${error.statusText}` : 'Server error');
    console.log(reason);
    return observableThrowError(reason);
  }

  // Private

  private get(apiPath: string, apiRoute: string, options?: Object) {
    return this.http.get(`${ apiPath }/${ apiRoute }`, options || {});
  }
}
