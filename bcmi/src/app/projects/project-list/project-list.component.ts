import { ChangeDetectorRef, ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { PaginationInstance } from 'ngx-pagination';

import { Project } from  '@models/project';
import { ProjectService } from '@services/project.service';
import { LoggerService } from '@services/logger.service';
import { DropdownLists, DropdownOption } from '../../shared/dropdown-lists';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectListComponent implements OnInit {
  projects: Project[];
  public filter = '';
  public showFilters: boolean;
  public operatorfilter: '';
  public operatorListFilter: '';
  public typefilter: '';
  public projectTypeFilter: '';
  public isDesc: boolean;
  public column: string;
  public direction: number;
  public loading: boolean;
  public mineCount: number;
  public operators: string[] = [];
  public pagination: PaginationInstance = {
    id: 'project-pagination',
    itemsPerPage: 50,
    currentPage: 1
  };
  // In order to access in the template.
  public minetypeOptions: DropdownOption[] = DropdownLists.MineTypeList;

  constructor(private projectService: ProjectService,
              private _changeDetectionRef: ChangeDetectorRef,
              private logger: LoggerService) { }

  ngOnInit() {
    this.loading = true;
    window.scrollTo(0, 0);
    this.projectService.getAll().subscribe(
      data => this.parseData(data),
      error => this.logger.log(error)
    );
  }

  parseData(data: Project[]): void {
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
      if (!project.permittee) {
        project.permittee = '';
      } else if (project.permittee && names.indexOf(project.permittee) === -1) {
        names.push(project.permittee);
        this.operators.push(project.permittee);
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
  }

  onUpdatePageNumber(pageNum) {
    this.pagination.currentPage = pageNum;
  }
}
