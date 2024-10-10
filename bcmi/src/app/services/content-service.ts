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

    async getFooter(): Promise<any> {
      return this.apollo.query<any>({
            query: gql`
            {
              footer {
                data {
                  attributes {
                    About_title,
                    About_description,
                    Navigate {
                      Nav_heading,
                      Footer_link {
                        Link_name,
                        Page {data {attributes {route}}}
                      }
                    },
                    Connect_description,
                    Connect_title,
                  }
                }
              }
            }
            `
        }).pipe(map(response => response.data.footer?.data.attributes)).toPromise();
      }
}

