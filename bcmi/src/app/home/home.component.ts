import { Component, OnInit } from '@angular/core';
import { ProjectService } from '@services/project.service';
import { Api } from '@services/api';
import { LoggerService } from '@services/logger.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  numProjects: number;
  hostname: string;
  constructor( private projectService: ProjectService,
               private api: Api,
               private logger: LoggerService) { }

  ngOnInit() {
    this.projectService.getAll().subscribe(
      data => { this.numProjects = data ? data.length : 0; },
      error => this.logger.log(error)
    );
    this.hostname = this.api.hostnameNRPTI;
    window.scrollTo(0, 0);
  }
}
