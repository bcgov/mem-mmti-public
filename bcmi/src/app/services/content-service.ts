import { map } from 'rxjs';
import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';

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

    async getGlobalContent(): Promise<any> {
      return this.apollo.query<any>({
            query: gql`
            {
              footer {
                data {
                  attributes {
                    About_title,
                    About_description,
                    Connect_description,
                    Connect_title,
                  }
                }
              }
              navigations {
                data {
                  attributes {
                    Heading,
                    pages {
                      data {
                        attributes {
                          tooltip,
                          route,
                          Title,
                        }
                      }
                    }
                  }
                }
              }
            }
            `
        }).pipe(map(response => response.data)).toPromise();
      }
}

