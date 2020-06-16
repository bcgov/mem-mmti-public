import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { Project } from 'app/models/project';
import { CollectionsArray } from 'app/models/collection';

@Component({
  selector: 'app-documents-tab-content',
  templateUrl: './documents-tab-content.component.html',
  styleUrls: ['./documents-tab-content.component.scss']
})
export class DocumentsTabContentComponent implements OnInit, OnDestroy {
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
      (data: { project: Project }) => this.parseData(data),
      error => console.log(error),
      () => this.loading = false
    );
  }

  parseData(data: {project: Project}): void {
    if (data.project && data.project.collections) {
      this.project = data.project;
      this.collections = data.project.collections.documents;
      this.collections.sort();
    }
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
