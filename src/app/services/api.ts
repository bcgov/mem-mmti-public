import {throwError as observableThrowError } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Params } from '@angular/router';



@Injectable()
export class Api {
  pathMEM: string;
  pathEPIC: string;
  hostnameMEM: string;
  hostnameEPIC: string;
  params: Params;
  env: 'local' | 'dev' | 'test' | 'prod';

  constructor(private http: HttpClient) {
    const host = this.getHostName(window.location.hostname);
    this.hostnameEPIC = host.hostnameEPIC;
    this.hostnameMEM = host.hostnameMEM;
    this.env = host.env;
    this.pathMEM  = this.getMEMPath(this.hostnameMEM);
    this.pathEPIC = this.getEPICPath(this.hostnameEPIC);
  }

  getHostName(hostname: string) {
    let hostnameEPIC: string;
    let hostnameMEM: string;
    let env: 'local' | 'dev' | 'test' | 'prod';

    switch (hostname) {
      case 'localhost':
        // Local
        hostnameMEM  = 'http://localhost:4000';

        // We used to serve collections from EPIC but now we have them on MEM instead.
        // TODO: Cleanup legacy hostnameEPIC variable references - should only be using hostnameMEM
        hostnameEPIC = hostnameMEM;
        env = 'local';
        break;

      case 'www-mem-mmt-dev.pathfinder.gov.bc.ca':
        // Dev
        hostnameMEM  = 'https://mem-mmt-dev.pathfinder.gov.bc.ca';

        // We used to serve collections from EPIC but now we have them on MEM instead.
        // TODO: Cleanup legacy hostnameEPIC variable references - should only be using hostnameMEM
        hostnameEPIC = hostnameMEM;
        env = 'dev';
        break;

      case 'www-mem-mmt-test.pathfinder.gov.bc.ca':
        // Test
        hostnameMEM  = 'https://mem-mmt-test.pathfinder.gov.bc.ca';

        // We used to serve collections from EPIC but now we have them on MEM instead.
        // TODO: Cleanup legacy hostnameEPIC variable references - should only be using hostnameMEM
        hostnameEPIC = hostnameMEM;
        env = 'test';
        break;

      default:
        // Prod
        hostnameMEM  = 'https://mines.empr.gov.bc.ca';

        // We used to serve collections from EPIC but now we have them on MEM instead.
        // TODO: Cleanup legacy hostnameEPIC variable references - should only be using hostnameMEM
        hostnameEPIC = hostnameMEM;
        env = 'prod';
    }

    return { hostnameEPIC, hostnameMEM, env };
  }

  getMEMPath(hostnameMEM) {
    return `${ hostnameMEM }/api`;
  }

  getEPICPath(hostnameEPIC) {
    return `${ hostnameEPIC }/api`;
  }

  // Projects

  getProjects() {
    return this.getMEM('projects/major');
  }

  getProjectByCode(projectCode: string) {
    return this.getMEM(`projects/major/${ projectCode }`);
  }

  getProjectCollectionsMEM(projectCode: string) {
    return this.getMEM(`collections/project/${ projectCode }`);
  }

  getProjectCollectionsEPIC(projectCode: string) {
    return this.getEPIC(`collections/project/${ projectCode }`);
  }

  // Proponents

  getProponents() {
    return this.getMEM('organization');
  }

  // Methods

  getMEM(apiRoute: string, options?: Object) {
    return this.get(this.pathMEM, apiRoute, options);
  }

  getEPIC(apiRoute: string, options?: Object) {
    return this.get(this.pathEPIC, apiRoute, options);
  }

  putMEM(apiRoute: string, body?: Object, options?: Object) {
    return this.put(this.pathMEM, apiRoute, body, options);
  }

  putEPIC(apiRoute: string, body?: Object, options?: Object) {
    return this.put(this.pathEPIC, apiRoute, body, options);
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

  private put(apiPath: string, apiRoute: string, body?: Object, options?: Object) {
    return this.http.put(`${ apiPath }/${ apiRoute }`, body || null, options || {});
  }
}
