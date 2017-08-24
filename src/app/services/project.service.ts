import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Project } from '../models/project';

@Injectable()
export class ProjectService {

  constructor(private http: Http) { }

  getAll() {
    return this.http.get('http://mines.nrs.gov.bc.ca/api/project')
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  getByCode(code: string): Observable<Project> {
    return this.http
      .get(`http://mines.nrs.gov.bc.ca/api/project/bycode/${code}`)
      .map((res: Response) => new Project(res.json()))
      .catch(this.handleError);
  }

  private handleError(error: any) {
    const reason = (error.message) ? error.message : (error.status ? `${error.status} - ${error.statusText}` : 'Server error');
    console.log(reason);
    return Observable.throw(reason);
  }
}
