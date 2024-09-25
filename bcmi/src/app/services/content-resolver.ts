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

    private getPage = function(id){

    return gql`
    {
        page(id: ${id}) {
        data{
            attributes{
            Title,
            Description
            Content
            Ongoing_card
            External_card
            Related_card
            route
            tooltip
            }
        }
        }
    }
    `;
    }

    resolve(route: ActivatedRouteSnapshot): Observable<Page> {
    // Return an Observable that represents the API request(s) you want to
    // execute before the route is activated.
        const id = route.data["id"];

        return this.apollo.watchQuery<any>({
            query: this.getPage(id)
        })
        .valueChanges.pipe(map(result => result.data?.page.data.attributes as Page),
        catchError(error => {
            console.error(error);
            return [];
        }))
    }
}
