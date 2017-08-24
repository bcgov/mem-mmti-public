import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { ProjectService } from '../services/project.service';
import { Project } from '../models/project';

@Injectable()
export class ProjectDetailResolver implements Resolve<Project> {
  constructor(private projectService: ProjectService, private router: Router) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Project | Observable<Project> | Promise<Project> {
    const id = route.paramMap.get('id');
    return this.projectService.getByCode(id)
      .catch(err => {
        return Observable.throw(err);
      });
  }
}
