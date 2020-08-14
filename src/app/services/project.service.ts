import { throwError as observableThrowError,  Observable } from 'rxjs';
import {switchMap, catchError, map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';

import { Api } from 'app/services/api';
import { Project } from 'app/models/project';
import { Collection, CollectionsList } from 'app/models/collection';

@Injectable()
export class ProjectService {
  project: Project;

  constructor(private api: Api) { }

  getAll() {
    return this.api.getProjects().pipe(
      map((res: any[]) => {
        let projects = res && res.length > 0 &&  res[0]['searchResults'] ? res[0]['searchResults'] : [];

        projects = projects.map(proj => new Project(proj));

        return projects;
      }),
      catchError(this.api.handleError));
  }

  getByCode(code: string): Observable<Project> {
    this.project = null;

    // Grab the project data first
    return this.api.getProjectByCode(code).pipe(
      map((res: HttpResponse<any>) => {
        return res && res[0] && res[0]['searchResults'] && res[0]['searchResults'].length > 0 ? new Project(res[0]['searchResults'][0]) : null;
      }),
      map((project: Project) => {
        if (!project) { return observableThrowError(new Error('Project not found!')); }

        this.project = project;

        this.project.collections = new CollectionsList();
        return this.project;
      }),
      // Now grab the MEM collections
      switchMap(() => this.getCollections()),
      map(() => this.project),
      catchError(this.api.handleError));
  }

  private getCollections() {
    return this.api.getProjectCollections(this.project._id).pipe(
      map((res: any) => this.processCollections(res && res[0] && res[0].searchResults ? res[0].searchResults : null)),
      map(async (collections: any[]) => {
        // Push them into the project
        await this.loadCollectionRecords(collections);

        collections.filter(c => c.documents.length > 0).forEach(collection => {
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

  private async loadCollectionRecords(collectionsList: any[]) {
    for (const collection of collectionsList) {
      for (const recordId of collection.records) {
        // fetch the record from NRPTI
        const recordResult = await this.api.getCollectionRecord(recordId).toPromise();
        const loadedRecord = recordResult && recordResult['length'] > 0 ? recordResult[0] : null;
        // create the record only if this is published to bcmi (either by flag or by flavour) and actually has a document attached
        if (loadedRecord && loadedRecord.flavours.find(f => f._schemaName.endsWith('BCMI') && f.read.includes('public'))) {
          // get the loaded records document ref URL
          // Grab the documents. If the object doesn't have a document attribute
          // or the document array is empty, we should not add a document
          if (Object.prototype.hasOwnProperty.call(loadedRecord, 'documents')) {
            // BCMI versions should only have one doc so should we assume
            // the first doc, or just create a row for each, which would most likely be only one anyway?
            let document = loadedRecord.documents && loadedRecord.documents.length > 0 ? loadedRecord.documents[0] : null;

            if (document) {
              collection.documents.push({
                name : loadedRecord['recordName'] || '-',
                ref  : document.url,
                date : loadedRecord['date'] || '-'
              });
            }
          }
        }
      }
    }

    return collectionsList;
  }

  private addCollection(collectionsList: CollectionsList, collection: Collection) {
    // ensure the collection hasn't already been added before adding again.
    switch (collection.parentType) {
      case 'Authorizations':
        if (!collectionsList.authorizations[collection.agency].items.some(existing => existing._id === collection._id)) {
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
}
