import {ChangeDetectionStrategy, Component, OnInit} from "@angular/core";
import {Project} from '../models/project';
import {ProjectService} from '../services/project.service';
import {PaginationInstance} from 'ngx-pagination';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectComponent implements OnInit {
	results: Array<Project>;
  loading: boolean;
  public filter: object = null;
  public p: PaginationInstance = {
      id: 'custom',
      itemsPerPage: 10,
      currentPage: 1
  };

  constructor(private projectService: ProjectService) { }

  ngOnInit() {
    this.loading = true;
  	this.projectService.getAll().subscribe(
      data => {
        this.results = data;
        this.loading = false;
      },
      error => console.log(error)
    );
  }

}
