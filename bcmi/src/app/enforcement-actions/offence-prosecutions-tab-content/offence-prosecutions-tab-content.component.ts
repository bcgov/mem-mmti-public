import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Project } from '@models/project';
import { CourtConviction } from '@models/court-conviction';
import { LoggerService } from '@services/logger.service';

@Component({
  selector: 'app-offence-prosecutions-tab-content',
  templateUrl: './offence-prosecutions-tab-content.component.html',
  styleUrls: ['./offence-prosecutions-tab-content.component.scss']
})
export class OffenceProsecutionsTabContentComponent implements OnInit {
  public courtConvictions: CourtConviction[];
  public projects: Project[];

  constructor(private route: ActivatedRoute, private logger: LoggerService) {}

  ngOnInit(): void {
    this.route.parent.data.subscribe(
      res => {
        this.projects = res['data'].projects;
        this.courtConvictions = res['data'].actions.courtConvictions;
      },
      error => this.logger.log(error)
    );
  }

  public getMineFromGuid(guid: string): Project {
    return this.projects.find(project => project._sourceRefId === guid);
  }
}
