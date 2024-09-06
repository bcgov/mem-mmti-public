import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Project } from '@models/project';
import { AdministrativePentalty } from '@models/administrative-penalty';
import { LoggerService } from '@services/logger.service';

@Component({
  selector: 'app-administrative-penalties-tab-content',
  templateUrl: './administrative-penalties-tab-content.component.html',
  styleUrls: ['./administrative-penalties-tab-content.component.scss']
})
export class AdministrativePenaltiesTabContentComponent implements OnInit {
  public administrativePenalties: AdministrativePentalty[];
  public projects: Project[];

  constructor(private route: ActivatedRoute, private logger: LoggerService) {}

  ngOnInit(): void {
    this.route.parent.data.subscribe(
      res => {
        this.projects = res['data'].projects;
        this.administrativePenalties = res['data'].actions.administrativePenalties;
      },
      error => this.logger.log(error)
    );
  }

  public getMineFromGuid(guid: string): Project {
    return this.projects.find(project => project._sourceRefId === guid);
  }
}
