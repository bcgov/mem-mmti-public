
import {throwError as observableThrowError,  Observable } from 'rxjs';

import {catchError} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

import { ProjectService } from '@services/project.service';
import { Project } from '@models/project';

@Injectable()
export class ProjectDetailResolver implements Resolve<Project> {
  constructor(private projectService: ProjectService) { }

  resolve(route: ActivatedRouteSnapshot): Project | Observable<Project> | Promise<Project> {
    const code = route.paramMap.get('code');
    return this.projectService.getById(code).pipe(
      catchError(err => {
        return observableThrowError(err);
      }));
  }
}
