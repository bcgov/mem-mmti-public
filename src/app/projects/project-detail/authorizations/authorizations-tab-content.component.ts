import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { Project } from 'app/models/project';
import { CollectionsGroup } from 'app/models/collection';

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

  // private fields
  private sub: Subscription;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.loading = true;
    this.sub = this.route.parent.data.subscribe(
      (data: {project: Project}) => this.parseData(data),
      error => console.log(error),
      () => this.loading = false
    );
  }

  parseData(data: {project: Project}): void {
    if (data.project && data.project.collections) {
      this.project = data.project;
      this.collections = data.project.collections.authorizations;
      this.collections.sort();
    }
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
