import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { Project } from '@models/project';
import { LoggerService } from '@services/logger.service';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss']
})
export class ProjectDetailComponent implements OnInit, OnDestroy {
  // public properties
  loading: boolean;
  project: Project;

  tabLinks = [
    { label: 'Mine Summary', link: 'overview' },
    { label: 'Authorizations', link: 'authorizations' },
    { label: 'Compliance Oversight', link: 'compliance' },
    { label: 'Other Documents', link: 'docs' }
  ];

  // private fields
  private sub: Subscription;
  private pageYOffset: number;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private logger: LoggerService) { }

  ngOnInit(): void {
    this.loading = true;
    this.pageYOffset = 0;

    // wait for the resolver to retrieve the project details from back-end
    this.sub = this.route.data.subscribe(
      (data: { project: Project }) => this.parseData(data),
      error => this.logger.log(error)
    );
    // watch for route change events and restore Y scroll position
    this.router.events.subscribe(() => {
      this.restoreYOffset();
    },
    error => this.logger.log(error));
    window.scrollTo(0, 0);
  }

  parseData(data: {project: Project}): void {
    this.loading = false;
      this.project = data.project;
      // project not found --> navigate back to project list
      if (!this.project) {
        this.gotoProjectList();
      }
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  gotoProjectList(): void {
    this.router.navigate(['/mines']);
  }

  gotoMap(): void {
    // pass along the id of the current project if available
    // so that the map component can show the popup for it.
    const projectId = this.project ? this.project._id : null;
    this.router.navigate(['/map', { project: projectId }]);
  }

  /**
   * Keeps track of pageYOffset when the window is scrolled
   */
  @HostListener('window:scroll')
  persistYOffset() {
    this.pageYOffset = window.pageYOffset;
  }

  restoreYOffset(): void {
    if (this.pageYOffset > 0) {
      window.scroll(0, this.pageYOffset);
    }
  }
}
