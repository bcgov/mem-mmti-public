import { Router, ActivatedRoute, Params } from '@angular/router';
import { ChangeDetectorRef, ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { DocumentService } from '../services/document.service';
import { Project } from '../models/project';
import { Search, SearchTerms } from '../models/search';
import { Proponent } from '../models/proponent';
import { ProjectService } from '../services/project.service';
import { ProponentService } from '../services/proponent.service';
import { Api } from '../services/api';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('visibility', [
      transition(':enter', [   // :enter is alias to 'void => *'
        animate('0.2s 0s', style({opacity: 1}))
      ]),
      transition(':leave', [   // :leave is alias to '* => void'
        animate('0.2s 0.75s', style({opacity: 0}))
      ])
    ])
  ]
})

export class SearchComponent implements OnInit {
  results: Search[];
  page: number;
  limit: number;
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

  myProjects: Array<any>;

  constructor(calender: NgbCalendar,
              private documentService: DocumentService,
              private projectService: ProjectService,
              private proponentService: ProponentService,
              private _changeDetectionRef: ChangeDetectorRef,
              private router: Router,
              private route: ActivatedRoute,
              private api: Api) {
    this.limit = 15;
  }

  ngOnInit() {
    this.noMoreResults      = true;
    this.ranSearch          = false;
    this.showAdvancedFields = false;
    this.loading            = false;

    this.route.params.subscribe((params: Params) => {
      /*
        TBD: Deal with meta search terms?
          this.params.type
          this.params.page
          this.params.limit
      */
      this.params = params;
      this.terms  = new SearchTerms();

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
              this.projects.forEach((project, index) => {
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
                this.showAdvancedFields = true;
              }

              if (this.params.dateend && Date.parse(this.params.dateend)) {
                const dateEnd = new Date(this.params.dateend);
                this.terms.dateEnd = {
                  day: dateEnd.getUTCDate(),
                  month: dateEnd.getUTCMonth() + 1,
                  year: dateEnd.getUTCFullYear()
                };
                this.showAdvancedFields = true;
              }

              // Needed in development mode - not required in prod.
              this._changeDetectionRef.detectChanges();

              // Run the search if keywords were provided
              if (this.terms.keywords) {
                this.page = 0;
                this.results = [];
                this.doSearch();
                this.ranSearch = true;
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

  doSearch() {
    this.loading = true;
    this.documentService.get(this.terms, this.projects, this.proponents, this.page, this.limit).subscribe(
      data => {
        // Push in 1st call
        data[0].forEach(i => {
          this.results.push(i);
        });
        // push in 2nd call
        data[1].forEach(i => {
          this.results.push(i);
        });
        this.loading = false;
        this.noMoreResults = (data[0].length === 0 && data[1].length === 0);

        // Needed in development mode - not required in prod.
        this._changeDetectionRef.detectChanges();
      },
      error => console.log(error)
    );
  }

  onSubmit() {
    if (this.terms.keywords) {
      this.router.navigate(['search', this.terms.getParams()]);
    }
  }

  loadMore() {
    this.page += 1;
    this.doSearch();
  }
}
