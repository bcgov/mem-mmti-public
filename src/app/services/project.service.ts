import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { Api } from './api';

import { Project } from '../models/project';
import { Collection, CollectionsList } from '../models/collection';

@Injectable()
export class ProjectService {
  project: Project;

  constructor(private api: Api) { }

  getAll() {
    return this.api.getProjects()
      .map((res: Response) => {
        const projects = res.text() ? res.json() : [];

        projects.forEach((project, index) => {
          projects[index] = new Project(project);
        });

        return projects;
      })
      .catch(this.api.handleError);
  }

  getByCode(code: string): Observable<Project> {
    this.project = null;

    // Grab the project data first
    return this.api.getProjectByCode(code)
      .map((res: Response) => {
        return res.text() ? new Project(res.json()) : null;
      })
      .map((project: Project) => {
        if (!project) { return Observable.throw(new Error('Project not found!')); }

        this.project = project;
        this.project.collections = new CollectionsList();
        return this.project;
      })
      // Now grab the MEM collections
      .switchMap(() => this.getCollectionsMEM())
      // Get EPIC collections next.
      .switchMap(() => this.getCollectionsEPIC())
      .map(() => this.project)
      .catch(this.api.handleError);
  }

  private getCollectionsMEM() {
    return this.api.getProjectCollectionsMEM(this.project.code)
      .map((res: Response) => this.processCollections(res))
      .map(memCollections => {
        // Push them into the project
        memCollections.forEach(collection => {
          this.addCollection(this.project.collections, collection);
        });
      });
  }

  private getCollectionsEPIC() {
    // Note: there may be multiple (or no) EPIC projects associated with this MEM project.
    const observablesArray = this.project.epicProjectCodes.map(epicProjectCode => {
      return this.api.getProjectCollectionsEPIC(epicProjectCode)
        .map((res: Response) => this.processCollections(res))
        .map(epicCollections => {
          // Push them into the project
          epicCollections.forEach(collection => {
            this.addCollection(this.project.collections, collection);
          });
        });
    });

    // If this MEM project has no associated EPIC projects, the call to Observable.forkJoin() breaks.
    // So, we need to wrap `forkJoin` to ensure it doesn't get short-circuited by an empty array. Thus `forkJoinOrDefault`...
    // https://github.com/ReactiveX/rxjs/issues/2816
    return this.forkJoinOrDefault(observablesArray);
  }

  private processCollections(res: Response): any[] {
    const collections = res.text() ? res.json() : [];

    collections.forEach((collection, index) => {
      collections[index] = new Collection(collection);
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
      return Observable.of([]);
    } else {
      return Observable.forkJoin(observablesArray);
    }
  }
}
