import {throwError as observableThrowError, Observable, map, catchError, firstValueFrom } from 'rxjs';
import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Page } from '@app/models/content/page';

@Injectable()
export class ContentService {

  constructor(private readonly apollo: Apollo) {}

  async getRoutes(): Promise<any> {
    return this.apollo.query<any>({
          query: gql`
          {
            pages{
              data{
                  attributes{
                    Title,
                    route
                    tooltip
                  }
              }
            }
          }
          `
      }).pipe(map(response => response.data.pages?.data)).toPromise();
    }

}

