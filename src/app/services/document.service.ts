import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

import 'rxjs/add/operator/map';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/catch';

import { Api } from './api';

import { Search, SearchArray, SearchTerms } from '../models/search';
import { Project } from '../models/project';
import { Proponent } from '../models/proponent';

@Injectable()
export class DocumentService {
  searchResult: SearchArray;

  constructor(private api: Api) { }

  get(terms: SearchTerms, projects: Array<Project>, page: number, limit: number) {
    this.searchResult = new SearchArray();

    let query = 'search?types=document';
    let memProjectQuery = '';
    let epicProjectQuery = '';

    // Paging
    query += '&page=' + page + '&limit=' + limit;

    const params = terms.getParams();

    // Get the keywords
    if (params['keywords']) {
      query += '&search=' + params['keywords'];
    }

    // We change the way we query epic because the only thing we're currently in
    // for api/projects/major is the epicCode.  In future we'll be able to change
    // this to reference project= in epic.
    if (params['projects']) {
      const epicQuery = [];
      terms.projects.forEach(p => {
        p.epicProjectCodes.forEach(c => {
          epicQuery.push(c);
        });
      });
      memProjectQuery += '&project=' + params['projects'];
      epicProjectQuery += '&projectcode=' + epicQuery;
    } else {
      // Make sure we query all the projects by default
      const projectQuery = [];
      const epicQuery = [];
      projects.forEach(p => {
        projectQuery.push(p._id);
        p.epicProjectCodes.forEach(c => {
          epicQuery.push(c);
        });
      });
      memProjectQuery += '&project=' + projectQuery;
      epicProjectQuery += '&projectcode=' + epicQuery;
    }

    if (params['proponents']) {
      query += '&proponent=' + params['proponents'];
    }
    if (params['ownerships']) {
      query += '&ownership=' + params['ownerships'];
    }
    if (params['datestart']) {
      query += '&datestart=' + params['datestart'];
    }
    if (params['dateend']) {
      query += '&dateend=' + params['dateend'];
    }

    // Field selection
    query += '&fields=_id project displayName description datePosted documentCategories collections keywords inspectionReport';
    const mem = this.api.getMEM(query + memProjectQuery)
    .map((res: Response) => {
      const data = res.text() ? res.json() : [];
      data.forEach(i => {
          i.hostname = this.api.hostnameMEM;
      });
      return data;
    });
    const epic = this.api.getEPIC(`v2/${query}${epicProjectQuery}`)
    .map((res: Response) => {
      const data = res.text() ? res.json() : [];
      data.forEach(i => {
          i.hostname = this.api.hostnameEPIC;
      });
      return data;
    });

    return Observable.forkJoin([mem, epic]);
  }
}
