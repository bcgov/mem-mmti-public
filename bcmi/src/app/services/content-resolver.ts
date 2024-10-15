import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable, catchError, map } from 'rxjs';
import { Apollo, gql } from 'apollo-angular';
import { Page } from '@app/models/content/page';

@Injectable({
  providedIn: 'root'
})
export class ContentResolver implements Resolve<Page> {

    constructor(private readonly apollo: Apollo){}

    private getPage = function(route){

    // When adding new properties to the Page class, edit this query
    return gql`
    {
        pageByRoute(route: "${route}") {
            data{
                attributes{
                    Title,
                    Description
                    Header_button{
                      Text
                      Section_id
                    }
                    Content
                    Ongoing_card
                    External_card
                    Related_card
                    Enforcement_Actions_card
                    route
                    tooltip
                }
            }
        }
    }
    `;
    }

    resolve(route: ActivatedRouteSnapshot): Observable<Page> {
    // Return an Observable that represents the GraphQL request to execute before the route is activated.
        return this.apollo.watchQuery<any>({
            query: this.getPage(route.routeConfig.path)
        })
        .valueChanges.pipe(map(result => result.data?.pageByRoute.data.attributes as Page),
        catchError(error => {
            console.error(error);
            return [];
        }))
    }
}
