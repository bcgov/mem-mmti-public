import { Component, OnInit } from '@angular/core';
import {Project} from '../models/project';
import {ProjectService} from '../services/project.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {
	results: Array<Project>;
  loading: boolean;
  constructor(private projectService: ProjectService) { }

  ngOnInit() {
    this.loading = true;
  	this.projectService.getAll().subscribe(
      data => {
        this.results = data;
        this.loading = false;
      },
      error => console.log(error)
    );
  }

}
