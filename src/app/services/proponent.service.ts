
import {catchError, map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Response } from '@angular/http';



import { Api } from './api';

import { Proponent } from '../models/proponent';

@Injectable()
export class ProponentService {
  constructor(private api: Api) { }

  getAll() {
    // Get all organizations
    return this.api.getProponents().pipe(
      map((res: Response) => {
        const organizations = res.text() ? res.json() : [];

        organizations.forEach((org, index) => {
          organizations[index] = new Proponent(org);
        });

        return organizations;
      }),
      catchError(this.api.handleError),);
  }
}
