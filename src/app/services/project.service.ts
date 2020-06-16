import {forkJoin as observableForkJoin, of as observableOf, throwError as observableThrowError,  Observable } from 'rxjs';

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
        const projects = res ? res : [];

        projects.forEach((project, index) => {
          projects[index] = new Project(project);
        });

        return projects;
      }),
      catchError(this.api.handleError));
  }

  getByCode(code: string): Observable<Project> {
    this.project = null;

    // Grab the project data first
    return this.api.getProjectByCode(code).pipe(
      map((res: HttpResponse<any>) => {
        return res ? new Project(res) : null;
      }),
      map((project: Project) => {
        if (!project) { return observableThrowError(new Error('Project not found!')); }

        this.project = project;
        this.project.collections = new CollectionsList();
        return this.project;
      }),
      // Now grab the MEM collections
      switchMap(() => this.getCollectionsMEM()),
      // Get EPIC collections next.
      switchMap(() => this.getCollectionsEPIC()),
      map(() => this.project),
      catchError(this.api.handleError));
  }

  private getCollectionsMEM() {
    return this.api.getProjectCollectionsMEM(this.project.code).pipe(
      map((res: any) => this.processCollections(res)),
      map((memCollections: any[]) => {
        // Push them into the project
        memCollections.forEach(collection => {
          this.addCollection(this.project.collections, collection);
        });
      }));
  }

  private getCollectionsEPIC() {
    // Note: there may be multiple (or no) EPIC projects associated with this MEM project.
    const observablesArray = this.project.epicProjectCodes.map(epicProjectCode => {
      return this.api.getProjectCollectionsEPIC(epicProjectCode).pipe(
        map((res: any) => this.processCollections(res)),
        map(epicCollections => {
          // Push them into the project
          epicCollections.forEach((collection: Collection) => {
            this.addCollection(this.project.collections, collection);
          });
        }));
    });

    // If this MEM project has no associated EPIC projects, the call to Observable.forkJoin() breaks.
    // So, we need to wrap `forkJoin` to ensure it doesn't get short-circuited by an empty array. Thus `forkJoinOrDefault`...
    // https://github.com/ReactiveX/rxjs/issues/2816
    return this.forkJoinOrDefault(observablesArray);
  }

  private processCollections(res: any[]): any[] {
    const collections = res ? res : [];

    collections.forEach((collection, index) => {
      collections[index] = new Collection(this.api.hostnameEPIC, this.api.hostnameMEM, collection);
    });
    return collections;
  }

  private addCollection(collectionsList: CollectionsList, collection: Collection) {
    switch (collection.parentType) {
      case 'Authorizations':
        collectionsList.authorizations[collection.agency].add(collection);
        break;
      case 'Compliance and Enforcement':
        collectionsList.compliance.add(collection);
        break;
      case 'Other':
        collectionsList.documents.add(collection);
        break;
    }
  }

  private forkJoinOrDefault(observablesArray: Observable<any>[]): Observable<any[]> {
    if (observablesArray.length === 0) {
      return observableOf([]);
    } else {
      return observableForkJoin(observablesArray);
    }
  }
}
