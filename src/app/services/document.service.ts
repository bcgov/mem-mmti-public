import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

import 'rxjs/add/operator/map';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/catch';

import { Api } from './api';

import { Search, SearchArray } from '../models/search';
import { Project } from '../models/project';

@Injectable()
export class DocumentService {
  searchResult: SearchArray;

  constructor(private api: Api) { }

  get(keywords: string,
      project: Array<Project>,
      allProjects: Array<string>,
      owneroperator: string,
      datestart: NgbDateStruct,
      dateend: NgbDateStruct) {
    this.searchResult = new SearchArray();

    let query = 'search?types=document';
    if (keywords) {
        query += '&search=' + keywords;
    }
    if (project) {
        const projectQuery = [];
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

    const mem = this.api.getMEM(query)
    .map((res: Response) => {
        const data = res.text() ? res.json() : [];
        data.forEach(i => {
            i.hostname = this.api.hostnameMEM;
        });
        return data;
    });
    const epic = this.api.getEPIC(`v2/${query}`)
    .map((res: Response) => {
        const data = res.text() ? res.json() : [];
        data.forEach(i => {
            i.hostname = this.api.hostnameEPIC;
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
