import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { Proponent } from '../models/proponent';

@Injectable()
export class ProponentService {
  apiPathMEM: string;
  apiPathEPIC: string;

  constructor(private http: Http) {
    const { hostname } = window.location;
    if (hostname === 'localhost') {
      // Local
      this.apiPathMEM  = 'http://localhost:4000';
      this.apiPathEPIC = 'http://localhost:3000';
    } else if (hostname === 'www.mem-mmt-dev.pathfinder.gov.bc.ca') {
      // Dev
      this.apiPathMEM  = 'http://mem-mmt-dev.pathfinder.gov.bc.ca';
      this.apiPathEPIC = 'http://esm-master.pathfinder.gov.bc.ca';
    } else if (hostname === 'www.mem-mmt-test.pathfinder.gov.bc.ca') {
      // Test
      this.apiPathMEM  = 'http://mem-mmt-test.pathfinder.gov.bc.ca';
      this.apiPathEPIC = 'http://esm-test.pathfinder.gov.bc.ca';
    } else {
      // Prod
      this.apiPathMEM  = 'https://mines.empr.gov.bc.ca';
      this.apiPathEPIC = 'https://projects.eao.gov.bc.ca';
    }
  }

  getAll() {
    // Get all organizations
    return this.http.get(`${this.apiPathMEM}/api/organization`)
      .map((res: Response) => {
        const organizations = res.text() ? res.json() : [];

        organizations.forEach((org, index) => {
          organizations[index] = new Proponent(org);
        });

        return organizations;
      })
      .catch(this.handleError);
  }

  private handleError(error: any) {
    const reason = (error.message) ? error.message : (error.status ? `${error.status} - ${error.statusText}` : 'Server error');
    return Observable.throw(reason);
  }
}
