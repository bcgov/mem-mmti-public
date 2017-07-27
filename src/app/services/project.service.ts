import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ProjectService {

	constructor(private http: Http) { }
	getAll() {
		//return this.http.get('https://projects.eao.gov.bc.ca/api/project')
		return this.http.get('http://localhost:3000/api/project')
		.map((res: Response) => res.json());
	}
}
