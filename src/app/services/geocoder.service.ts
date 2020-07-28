import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';

import { createRequestBuilder } from './geocoder-api';
import { Api } from './api';

@Injectable()
export class GeocoderService {

  private maxLocations = 5;
  private minScore = 50;

  constructor(private api: Api) { }

  lookupAdress(address: string) {
    const requestUrl = createRequestBuilder()
    .setOutputFormat('json')
    .setAddress(address)
    .setAutoComplete(false)
    .setMinScore(this.minScore)
    .setMaxResults(this.maxLocations)
    .setEcho(false)
    .build();

    return this.api.lookupAddress(requestUrl).pipe(
      map((res: any[]) => {
        return res ? res : [];
      }),
      catchError(this.api.handleError));
  }

}
