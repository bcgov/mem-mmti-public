import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/catch';
import { NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Search, SearchArray } from '../models/search';
import { Project } from '../models/project';

@Injectable()
export class DocumentService {
  apiPathMEM: string;
  apiPathEPIC: string;
  searchResult: SearchArray;

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
  get(keywords: string,
      project: Array<Project>,
      allProjects: Array<string>,
      owneroperator: string,
      datestart: NgbDateStruct,
      dateend: NgbDateStruct) {
    this.searchResult = new SearchArray();

    let query = '/search?types=document';
    if (keywords) {
        query += '&search=' + keywords;
    }
    if (project) {
        let projectQuery = [];
        project.forEach(p => {
          projectQuery.push(p._id);
        });
        query += '&project=' + projectQuery;
    } else {
        // Make sure we query all the projects by default
        query += '&project=' + allProjects;
    }
    if (owneroperator) {
        query += '&owneroperator=' + owneroperator;
    }
    if (datestart) {
        const d: Date = new Date(datestart.year, datestart.month - 1, datestart.day);
        console.log('datestart', d.toString());
        query += '&datestart=' + d.toString();
    }
    if (dateend) {
        const d: Date = new Date(dateend.year, dateend.month - 1, dateend.day);
        console.log('dateend', d.toString());
        query += '&dateend=' + d.toString();
    }

    // Field selection
    query += '&fields=_id project displayName description datePosted documentCategories collections keywords inspectionReport';

    const mem = this.http.get(`${this.apiPathMEM}/api${query}`)
    .map((res: Response) => {
        const data = res.text() ? res.json() : [];
        data.forEach(i => {
            i.hostname = this.apiPathMEM;
        });
        return data;
    });
    const epic = this.http.get(`${this.apiPathEPIC}/api/v2${query}`)
    .map((res: Response) => {
        const data = res.text() ? res.json() : [];
        data.forEach(i => {
            i.hostname = this.apiPathEPIC;
        });
        return data;
    });

    return Observable.forkJoin([mem, epic]);
  }

  private handleError(error: any) {
    const reason = (error.message) ? error.message : (error.status ? `${error.status} - ${error.statusText}` : 'Server error');
    console.log(reason);
    return Observable.throw(reason);
  }
}
