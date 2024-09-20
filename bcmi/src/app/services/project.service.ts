import { throwError as observableThrowError, Observable, forkJoin } from 'rxjs';
import { switchMap, catchError, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';

import { Api } from '@services/api';
import { Project } from '@models/project';
import { Collection, CollectionsList } from '@models/collection';

@Injectable()
export class ProjectService {
  project: Project;

  constructor(private api: Api) {}

  getAll() {
    return this.api.getProjects().pipe(
      map((res: any[]) => {
        let projects = res && res.length > 0 && res[0]['searchResults'] ? res[0]['searchResults'] : [];

        projects = projects.map(proj => new Project(proj));

        return projects;
      }),
      catchError(this.api.handleError)
    );
  }

  getById(code: string): Observable<Project> {
    this.project = null;

    // Grab the project data first
    return this.api.getProjectById(code).pipe(
      map((res: HttpResponse<any>) => {
        return res && res[0] ? new Project(res[0]) : null;
      }),
      map((project: Project) => {
        if (!project) {
          return observableThrowError(new Error('Project not found!'));
        }

        this.project = project;

        this.project.collections = new CollectionsList();
        return this.project;
      }),
      // Now grab the MEM collections
      switchMap(() => this.getCollections()),
      map(() => this.project),
      catchError(this.api.handleError)
    );
  }

  private getCollections() {
    return this.api.getProjectCollections(this.project._id).pipe(
      map((res: any) => this.processCollections(res && res[0] && res[0].searchResults ? res[0].searchResults : null)),
      switchMap((collections: any[]) => {
        // Send all getCollectionDocuments API requests concurrently and combine the results as a single array
        return forkJoin(
          collections.map(collection => {
            collection.agency = this.convertToAgencyAcronym(collection.agency);
            return this.api.getCollectionDocuments(collection._id);
          })
        ).pipe(
          map((res: any[]) => {
            for (let i = 0; i < collections.length; i++) {
              this.loadCollectionRecords(collections[i], res[i]);
            }
            return collections;
          })
        );
      }),
      map((collections: Collection[]) => {
        collections
          .filter(c => c.documents.length > 0)
          .forEach(collection => {
            this.addCollection(this.project.collections, collection);
          });
      })
    );
  }

  private processCollections(res: any[]): any[] {
    const collections = res ? res : [];

    collections.forEach((collection, index) => {
      collections[index] = new Collection(collection);
    });

    return collections;
  }

  private loadCollectionRecords(collection: any, collectionDocuments: any[]) {
    for (const document of collectionDocuments) {
      collection.documents.push({
        name: document.fileName || '-',
        ref: document.url,
        date: document.dateAdded || '-'
      });
    }
  }

  private addCollection(collectionsList: CollectionsList, collection: Collection) {
    // ensure the collection hasn't already been added before adding again.
    switch (collection.parentType) {
      case 'Authorizations':
        if (
          !collectionsList.authorizations[collection.agency].items.some(existing => existing._id === collection._id)
        ) {
          collectionsList.authorizations[collection.agency].add(collection);
        }
        break;
      case 'Compliance and Enforcement':
        if (!collectionsList.compliance.items.some(existing => existing._id === collection._id)) {
          collectionsList.compliance.add(collection);
        }
        break;
      case 'Other':
        if (!collectionsList.documents.items.some(existing => existing._id === collection._id)) {
          collectionsList.documents.add(collection);
        }
        break;
    }
  }

  private convertToAgencyAcronym(agency: string): string {
    switch (agency.toLowerCase()) {
      case 'agency_env':
        return 'env';
      case 'agency_eao':
        return 'eao';
      case 'agency_emli':
        return 'emli';
      default:
        return agency;
    }
  }
}
