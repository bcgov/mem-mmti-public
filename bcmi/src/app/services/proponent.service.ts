import {catchError, map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';

import { Api } from '@services/api';
import { Proponent } from '@models/proponent';

@Injectable()
export class ProponentService {
  constructor(private api: Api) { }

  getAll() {
    // Get all organizations
    return this.api.getProponents().pipe(
      map((res: HttpResponse<any>) => {
        const organizations = res.body.text() ? res.body.json() : [];

        organizations.forEach((org, index) => {
          organizations[index] = new Proponent(org);
        });

        return organizations;
      }),
      catchError(this.api.handleError));
  }
}
