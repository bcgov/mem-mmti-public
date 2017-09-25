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
import { Proponent } from '../models/proponent';

@Injectable()
export class DocumentService {
  searchResult: SearchArray;

  constructor(private api: Api) { }

  get(keywords: string,
      project: Array<Project>,
      allProjects: Array<Project>,
      proponent: Array<Proponent>,
      ownership: Array<Proponent>,
      datestart: NgbDateStruct,
      dateend: NgbDateStruct,
      page: number,
      limit: number) {
    this.searchResult = new SearchArray();

    let query = 'search?types=document';
    let memProjectQuery = '';
    let epicProjectQuery = '';

    // Paging
    query += '&page=' + page + '&limit=' + limit;

    if (keywords) {
        query += '&search=' + keywords;
    }
    // We change the way we query epic because the only thing we're currently in
    // for api/projects/major is the epicCode.  In future we'll be able to change
    // this to reference project= in epic.
    if (project) {
        const projectQuery = [];
        const epicQuery = [];
        project.forEach(p => {
          projectQuery.push(p._id);
          p.epicProjectCodes.forEach(c => {
            epicQuery.push(c);
          });
        });
        memProjectQuery += '&project=' + projectQuery;
        epicProjectQuery += '&projectcode=' + epicQuery;
    } else {
        // Make sure we query all the projects by default
        const projectQuery = [];
        const epicQuery = [];
        allProjects.forEach(p => {
          projectQuery.push(p._id);
          p.epicProjectCodes.forEach(c => {
            epicQuery.push(c);
          });
        });
        memProjectQuery += '&project=' + projectQuery;
        epicProjectQuery += '&projectcode=' + epicQuery;
    }
    if (proponent) {
        const propQuery = [];
        proponent.forEach(o => {
          propQuery.push(o._id);
        });
        query += '&proponent=' + propQuery;
    }
    if (ownership) {
        const ownerQuery = [];
        ownership.forEach(o => {
          ownerQuery.push(o.company);
        });
        query += '&ownership=' + ownerQuery;
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

  private handleError(error: any) {
    const reason = (error.message) ? error.message : (error.status ? `${error.status} - ${error.statusText}` : 'Server error');
    console.log(reason);
    return Observable.throw(reason);
  }
}
