import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { Project } from '../models/project';
import { Collection, CollectionsList } from '../models/collection';

@Injectable()
export class ProjectService {
  apiPathMEM: string;
  apiPathEPIC: string;
  project: Project;

  constructor(private http: Http) {
    const { hostname } = window.location;
    if (hostname === 'localhost') {
      // Local
      this.apiPathMEM  = 'http://localhost:4000';
      this.apiPathEPIC = 'http://localhost:3000';
    } else if (hostname === 'www.mem-mmt-dev.pathfinder.gov.bc.ca') {
      // Dev
      this.apiPathMEM  = 'http://mem-mmt-dev.pathfinder.gov.bc.ca';
      this.apiPathEPIC = 'http://esm-master.pathfinder.gov.bc.ca';
    } else if (hostname === 'www.mem-mmt-test.pathfinder.gov.bc.ca') {
      // Test
      this.apiPathMEM  = 'http://mem-mmt-test.pathfinder.gov.bc.ca';
      this.apiPathEPIC = 'http://esm-test.pathfinder.gov.bc.ca';
    } else {
      // Prod
      this.apiPathMEM  = 'https://mines.empr.gov.bc.ca';
      this.apiPathEPIC = 'https://projects.eao.gov.bc.ca';
    }
  }

  getAll() {
    // Get all projects
    return this.http.get(`${this.apiPathMEM}/api/projects/major`)
      .map((res: Response) => {
        const projects = res.text() ? res.json() : [];

        projects.forEach((project, index) => {
          projects[index] = new Project(project);
        });

        return projects;
      })
      .catch(this.handleError);
  }

  getByCode(code: string): Observable<Project> {
    this.project = null;

    // Grab the project data first
    return this.http.get(`${this.apiPathMEM}/api/project/bycode/${code}`)
      .map((res: Response) => {
        return res.text() ? new Project(res.json()) : null;
      })
      .map((project: Project) => {
        if (!project) { return; }

        this.project = project;
        this.project.collections = new CollectionsList();

        // Now grab the MEM collections
        this.getCollectionsByProjectCode(this.apiPathMEM, this.project.code)
          .subscribe(memCollections => {
            // Push them into the project
            memCollections.forEach(collection => {
              this.addCollection(this.project.collections, collection);
            });
          });

        // Get EPIC collections next.
        // Note: there may be multiple (or no) EPIC projects associated with this MEM project.
        this.project.epicProjectCodes.forEach(epicProjectCode => {
          this.getCollectionsByProjectCode(this.apiPathEPIC, epicProjectCode)
            .subscribe(epicCollections => {
              // Push them into the project
              epicCollections.forEach(collection => {
                this.addCollection(this.project.collections, collection);
              });
            });
        });

        return this.project;
      })
      .catch(this.handleError);
  }

  private getCollectionsByProjectCode(apiPath: string, projectCode: string) {
    return this.http.get(`${apiPath}/api/collections/project/${projectCode}`)
      .map((res: Response) => {
        const collections = res.text() ? res.json() : [];

        collections.forEach((collection, index) => {
          collections[index] = new Collection(collection);
        });

        return collections;
      });
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

  private handleError(error: any) {
    const reason = (error.message) ? error.message : (error.status ? `${error.status} - ${error.statusText}` : 'Server error');
    return Observable.throw(reason);
  }
}
