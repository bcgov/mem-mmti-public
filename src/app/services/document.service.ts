import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class DocumentService {

  constructor(private http: Http) { }
  get(keywords: string, project: string) {
    let query = 'http://localhost:3000/api/query/document?';
    // if (keywords) {
    //     query += 'keywords=' + keywords;
    // }
    if (project) {
        query += '&project=' + project;
    }
    if (keywords) {
        query += '&displayName=' + keywords;
    }
    return this.http.get(query)
    .map((res: Response) => res.json())
    .catch(this.handleError);
  }

  private handleError(error: any) {
    const reason = (error.message) ? error.message : (error.status ? `${error.status} - ${error.statusText}` : 'Server error');
    console.log(reason);
    return Observable.throw(reason);
  }
}
