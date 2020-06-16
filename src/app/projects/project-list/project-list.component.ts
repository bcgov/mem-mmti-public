import { ChangeDetectorRef, ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { PaginationInstance } from 'ngx-pagination';

import { Project } from 'app/models/project';
import { ProjectService } from 'app/services/project.service';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectListComponent implements OnInit {
  projects: Array<Project>;
  public filter = '';
  public showFilters: boolean;
  public operatorfilter: '';
  public operatorListFilter: '';
  public typefilter: '';
  public projectTypeFilter: '';
  public statusfilter: '';
  public projectStatusFilter: '';
  public isDesc: boolean;
  public column: string;
  public direction: number;
  public loading: boolean;
  public mineCount: number;
  public operators: Array<String> = [];
  public config: PaginationInstance = {
    id: 'custom',
    itemsPerPage: 50,
    currentPage: 1
  };

  constructor(private projectService: ProjectService, private _changeDetectionRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.loading = true;
    window.scrollTo(0, 0);
    this.projectService.getAll().subscribe(
      data => this.parseData(data),
      error => console.log(error)
    );
  }

  parseData(data: Array<Project>): void {
    this.projects = data;
    this.getOperators(data);
    this.mineCount = data ? data.length : 0;
    this.loading = false;
    // Needed in development mode - not required in prod.
    this._changeDetectionRef.detectChanges();
  }

  getOperators(projects) {
    const names = [];
    projects.forEach(project => {
      if (!project.operator) {
        project.operator = '';
      } else if (project.operator && names.indexOf(project.operator) === -1) {
        names.push(project.operator);
        this.operators.push(project.operator);
      }
    });
  }

  sort (property) {
    this.isDesc = !this.isDesc;
    this.column = property;
    this.direction = this.isDesc ? 1 : -1;
  }

  applyOperatorFilter() {
    this.operatorfilter = this.operatorListFilter;
  }

  clearAllProjectFilters() {
    this.filter = undefined;
    this.projectTypeFilter = undefined;
    this.typefilter = undefined;
    this.operatorListFilter = undefined;
    this.operatorfilter = undefined;
    this.projectStatusFilter = undefined;
    this.statusfilter = undefined;
  }
}
