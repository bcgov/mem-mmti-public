import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { Project } from '@models/project';
import { LoggerService } from '@services/logger.service';

@Component({
  selector: 'app-overview-tab-content',
  templateUrl: './overview-tab-content.component.html',
  styleUrls: ['./overview-tab-content.component.scss']
})
export class OverviewTabContentComponent implements OnInit, OnDestroy {
  // public properties
  loading: boolean;
  project: Project;

  // private fields
  private sub: Subscription;

  constructor(private route: ActivatedRoute, private logger: LoggerService) { }

  ngOnInit(): void {
    this.loading = true;
    this.sub = this.route.parent.data.subscribe(
      (data: { project: Project }) => this.project = data.project,
      error => this.logger.log(error),
      () => this.loading = false
    );
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
