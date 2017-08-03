import { ChangeDetectorRef, ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { PaginationInstance } from 'ngx-pagination';

import { Project } from '../../models/project';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectListComponent implements OnInit {
  results: Array<Project>;
  public loading: boolean;
  public filter: string;
  public config: PaginationInstance = {
    id: 'custom',
    itemsPerPage: 15,
    currentPage: 1
  };

  constructor(private projectService: ProjectService, private _changeDetectionRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.loading = true;
    this.projectService.getAll().subscribe(
      data => {
        this.results = data;
        this.loading = false;
        // Needed in development mode - not required in prod.
        this._changeDetectionRef.detectChanges();
      },
      error => console.log(error)
    );
  }
}
