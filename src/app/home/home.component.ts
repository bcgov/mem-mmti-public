import { Component, OnInit } from '@angular/core';
import { Home } from '../models/home';
import { ProjectService } from '../services/project.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  results: Array<Home>;
  numProjects: Number;
  constructor( private projectService: ProjectService) { }

  ngOnInit() {
    this.projectService.getAll().subscribe(
      data => { this.numProjects = data ? data.length : 0; },
      error => console.log(error)
    );
  }
}
