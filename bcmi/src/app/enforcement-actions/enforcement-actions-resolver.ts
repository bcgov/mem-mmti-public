import { throwError as observableThrowError, Observable, forkJoin } from 'rxjs';

import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

import { ProjectService } from '@services/project.service';
import { EnforcementActionsService } from '@services/enforcement-actions.service';

@Injectable()
export class EnforcementActionsResolver implements Resolve<Observable<object>> {
  constructor(private projectService: ProjectService, private enforcementActionsService: EnforcementActionsService) {}

  resolve() {
    return forkJoin({
      projects: this.projectService.getAll(),
      actions: this.enforcementActionsService.getAll()
    }).pipe(
      catchError(err => {
        return observableThrowError(err);
      })
    );
  }
}
