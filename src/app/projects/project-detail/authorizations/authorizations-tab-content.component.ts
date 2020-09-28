import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { Project } from 'app/models/project';
import { CollectionsGroup } from 'app/models/collection';
import { LoggerService } from 'app/services/logger.service';

@Component({
  selector: 'app-authorizations-tab-content',
  templateUrl: './authorizations-tab-content.component.html',
  styleUrls: ['./authorizations-tab-content.component.scss']
})
export class AuthorizationsTabContentComponent implements OnInit, OnDestroy {
  // public properties
  loading: boolean;
  project: Project;
  collections: CollectionsGroup;

  agencyList = [
    {
      id: 'eao',
      name: 'Environmental Assessment Office',
      act: 'Environmental Assessment Act',
      htmlId: 'authorization-EAO'
    },
    {
      id: 'env',
      name: 'Ministry of Environment and Climate Change Strategy',
      act: 'Environmental Management Act',
      htmlId: 'authorization-ENV'
    },
    {
      id: 'empr',
      name: 'Ministry of Energy, Mines and Petroleum Resources',
      act: 'Mines Act',
      htmlId: 'authorization-MEM'
    }
  ];

  // private fields
  private sub: Subscription;

  constructor(private route: ActivatedRoute, private logger: LoggerService) { }

  ngOnInit(): void {
    this.loading = true;
    this.sub = this.route.parent.data.subscribe(
      (data: {project: Project}) => this.parseData(data),
      error => this.logger.log(error),
      () => this.loading = false
    );
  }

  parseData(data: {project: Project}): void {
    if (data.project && data.project.collections) {
      this.project = data.project;
      this.collections = data.project.collections.authorizations;
      this.collections.sort();
      this.loading = false;
    }
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
