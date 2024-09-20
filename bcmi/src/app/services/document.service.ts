import {map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';

import { Api } from '@services/api';
import { SearchArray, SearchTerms } from '@models/search';
import { Project } from '@models/project';
import { Proponent } from '@models/proponent';

@Injectable()
export class DocumentService {
  searchResult: SearchArray;

  constructor(private api: Api) { }

  get(terms: SearchTerms, projects: Project[], proponents: Proponent[], page: number, limit: number) {
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
      if (epicQuery.length) {
        epicProjectQuery += '&projectcode=' + epicQuery;
      }
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
      // EPIC needs the string name for proponent, not the objectID
      memProjectQuery += '&proponent=' + params['proponents'];

      const proponentQ = [];

      const props = params['proponents'].split(',');
      props.forEach(prop => {
        proponents.forEach(p => {
          if (p._id === prop) {
            // If the AKA field is set, use that - otherwise use the company name
            if (p.alsoKnownAs && p.alsoKnownAs !== '') {
              proponentQ.push(p.alsoKnownAs);
            } else {
              proponentQ.push(p.company);
            }
          }
        });
      });
      if (proponentQ.length > 0) {
        epicProjectQuery += '&proponentstring=' + proponentQ;
      }
    }
    if (params['ownerships']) {
      // MEM/EPIC needs the string name for ownership, not the objectID

      const ownershipQ = [];

      const owns = params['ownerships'].split(',');
      owns.forEach(prop => {
        proponents.forEach(p => {
          if (p._id === prop) {
            // If the AKA field is set, use that - otherwise use the company name
            if (p.alsoKnownAs && p.alsoKnownAs !== '') {
              ownershipQ.push(p.alsoKnownAs);
            } else {
              ownershipQ.push(p.company);
            }
          }
        });
      });
      if (ownershipQ.length > 0) {
        // EPIC doesn't store ownership data right now, search as though we're setting
        // the owner/proponent field - remake the prop string to include the specific
        // results for EPIC.
        if (false === epicProjectQuery.includes('&proponentstring=')) {
          epicProjectQuery += '&proponentstring=' + ownershipQ;
        } else {
          // Tack it on the end
          epicProjectQuery += ',' + ownershipQ;
        }
        memProjectQuery += '&ownership=' + params['ownerships'];
      }
    }
    if (params['datestart']) {
      query += '&datestart=' + params['datestart'];
    }
    if (params['dateend']) {
      query += '&dateend=' + params['dateend'];
    }

    // Field selection
    query += '&fields=_id project displayName documentDate description datePosted documentCategories collections keywords inspectionReport';
    const mem = this.api.getNRPTI(`v2/${query}${memProjectQuery}`).pipe(
    map((res: HttpResponse<any>) => {
      const data = res.body.text() ? res.body.json() : { count: 0, results: [] };
      if (data.results) {
        data.results.forEach(i => {
          i.hostname = this.api.hostnameNRPTI;
        });
      }
      return data;
    }));

    return mem;
  }
}
