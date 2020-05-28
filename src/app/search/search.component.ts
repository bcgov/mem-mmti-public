import { animate, style, transition, trigger } from '@angular/animations';
import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import * as _ from 'lodash';
import { PageScrollService } from 'ngx-page-scroll-core';

import { Project } from '../models/project';
import { Proponent } from '../models/proponent';
import { Search, SearchTerms } from '../models/search';
import { DocumentService } from '../services/document.service';
import { ProjectService } from '../services/project.service';
import { ProponentService } from '../services/proponent.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('visibility', [
      transition(':enter', [
        // :enter is alias to 'void => *'
        animate('0.2s 0s', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        // :leave is alias to '* => void'
        animate('0.2s 0.75s', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class SearchComponent implements OnInit {
  results: Search[];
  page: number;
  limit: number;
  count: number;
  noMoreResults: boolean;
  ranSearch: boolean;
  projects: Array<Project>;
  proponents: Array<Proponent>;
  projectArray: Array<string>;
  protoSearchActive: boolean;
  showAdvancedFields: boolean;
  public loading: boolean;

  params: Params;
  terms: SearchTerms;
  currentDate: Date;
  minDate: NgbDateStruct;
  maxDate: NgbDateStruct;

  myProjects: Array<any>;

  constructor(
    private documentService: DocumentService,
    private projectService: ProjectService,
    private proponentService: ProponentService,
    private _changeDetectionRef: ChangeDetectorRef,
    private router: Router,
    private route: ActivatedRoute,
    private pageScrollService: PageScrollService,
    @Inject(DOCUMENT) private document: any
  ) {
    this.limit = 15;
  }

  ngOnInit() {
    this.noMoreResults = true;
    this.ranSearch = false;
    this.showAdvancedFields = false;
    this.loading = false;

    // Get the current date
    this.currentDate = new Date();
    // Specify minimum date for datepicker to be 1/1/1990
    this.minDate = {
      year: 1900,
      month: 1,
      day: 1
    };
    // Specify maximum date for datepicker to be current date
    this.maxDate = {
      year: this.currentDate.getFullYear(),
      month: this.currentDate.getMonth() + 1,
      day: this.currentDate.getDate()
    };

    this.route.params.subscribe((params: Params) => {
      /*
        TBD: Deal with meta search terms?
          this.params.type
          this.params.page
          this.params.limit
      */
      this.params = params;
      this['terms'] = new SearchTerms();

      // Get the proponents
      this.proponentService.getAll().subscribe(
        proponents => {
          this.proponents = proponents;

          // Grab any terms that were passed in through the URL
          if (this.params.proponents) {
            const operatorIds = this.params.proponents.split(',');
            this.terms.proponents = this.proponents.filter(proponent => operatorIds.indexOf(proponent._id) !== -1);
            this.showAdvancedFields = true;
          }

          if (this.params.ownerships) {
            const ownerIds = this.params.ownerships.split(',');
            this.terms.ownerships = this.proponents.filter(proponent => ownerIds.indexOf(proponent._id) !== -1);
            this.showAdvancedFields = true;
          }

          // Needed in development mode - not required in prod.
          this._changeDetectionRef.detectChanges();

          // Get the projects
          this.projectService.getAll().subscribe(
            projects => {
              this.projects = projects;
              this.projectArray = [];
              this.projects.forEach((project) => {
                this.projectArray.push(project._id);
              });

              // Grab any terms that were passed in through the URL
              if (this.params.projects) {
                const projectIds = this.params.projects.split(',');
                this.terms.projects = this.projects.filter(project => projectIds.indexOf(project._id) !== -1);
                this.showAdvancedFields = true;
              }

              if (this.params.keywords) {
                this.terms.keywords = this.params.keywords.split(',').join(' ');
              }

              if (this.params.datestart && Date.parse(this.params.datestart)) {
                const dateStart = new Date(this.params.datestart);
                this.terms.dateStart = {
                  day: dateStart.getUTCDate(),
                  month: dateStart.getUTCMonth() + 1,
                  year: dateStart.getUTCFullYear()
                };
                this.showAdvancedFields = false;
              }

              if (this.params.dateend && Date.parse(this.params.dateend)) {
                const dateEnd = new Date(this.params.dateend);
                this.terms.dateEnd = {
                  day: dateEnd.getUTCDate(),
                  month: dateEnd.getUTCMonth() + 1,
                  year: dateEnd.getUTCFullYear()
                };
                this.showAdvancedFields = false;
              }

              // Needed in development mode - not required in prod.
              this._changeDetectionRef.detectChanges();

              if (!_.isEmpty(this.terms.getParams())) {
                this.doSearch(true);
              }
            },
            error => console.log(error)
          );
        },
        error => console.log(error)
      );
    });
  }

  toggleAdvancedSearch() {
    this.showAdvancedFields = !this.showAdvancedFields;
  }

  doSearch(firstSearch: boolean) {
    this.loading = true;
    this.ranSearch = true;

    if (firstSearch) {
      this.page = 0;
      this.count = 0;
      this.results = [];
      this.noMoreResults = false;
    } else {
      this.page += 1;
    }

    this.documentService.get(this.terms, this.projects, this.proponents, this.page, this.limit)
    .subscribe((data: any[]) => {
        this.loading = false;
        let memCount = 0;
        let epicCount = 0;
        // mem-data
        if (data[0].results) {
          data[0].results.forEach((i: Search) => {
            this.results.push(i);
          });
          memCount = data[0].count;
          this.scrollToResults();
        }

        // esm-server data
        if (data.length === 2) {
          data[1].results.forEach((i: Search) => {
            this.results.push(i);
          });
          epicCount = data[1].count;
        }
        this.count = memCount + epicCount;
        this.noMoreResults =
          this.results.length === this.count || (data[0].results.length === 0 && data[1].results.length === 0);

        // Needed in development mode - not required in prod.
        this._changeDetectionRef.detectChanges();
      },
      (error: any) => console.log(error)
    );
  }

  onSubmit() {
    this.router.navigate(['search', this.terms.getParams()]);
  }

  scrollToResults(): void {
    this.pageScrollService.scroll({
      document: this.document,
      scrollTarget: '#scrollToPoint'
    });
  }

  loadMore() {
    this.doSearch(false);
  }

  clearKeywords() {
    this.terms.keywords = '';
    this.onSubmit();
  }

  clearDateStart() {
    this.terms.dateStart = null;
    this.onSubmit();
  }

  clearDateEnd() {
    this.terms.dateEnd = null;
    this.onSubmit();
  }
}
