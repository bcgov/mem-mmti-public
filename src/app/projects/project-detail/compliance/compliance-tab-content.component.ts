import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { Project } from '../../../models/project';
import { CollectionsArray } from '../../../models/collection';

@Component({
  selector: 'app-compliance-tab-content',
  templateUrl: './compliance-tab-content.component.html',
  styleUrls: ['./compliance-tab-content.component.scss']
})
export class ComplianceTabContentComponent implements OnInit, OnDestroy {
  // public properties
  loading: boolean;
  project: Project;
  collections: CollectionsArray;

  // private fields
  private sub: Subscription;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.loading = true;
    this.sub = this.route.parent.data.subscribe(
      (data: { project: Project }) => {
        if (data.project && data.project.collections) {
          this.project = data.project;
          this.collections = data.project.collections.compliance;
          this.collections.sort();
        }
      },
      error => console.log(error),
      () => this.loading = false
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
