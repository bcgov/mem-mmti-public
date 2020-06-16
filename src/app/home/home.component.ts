import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'app/services/project.service';
import { Api } from 'app/services/api';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  numProjects: Number;
  hostname: String;
  constructor( private projectService: ProjectService, private api: Api) { }

  ngOnInit() {
    this.projectService.getAll().subscribe(
      data => { this.numProjects = data ? data.length : 0; },
      error => console.log(error)
    );
    this.hostname = this.api.hostnameMEM;
    window.scrollTo(0, 0);
  }
}
