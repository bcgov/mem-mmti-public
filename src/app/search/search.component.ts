import { Params } from '@angular/router';
import { ChangeDetectorRef, ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { DocumentService } from '../services/document.service';
import { Project } from '../models/project';
import { Search } from '../models/search';
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

  constructor(calender: NgbCalendar,
              private documentService: DocumentService,
              private projectService: ProjectService,
              private proponentService: ProponentService,
              private _changeDetectionRef: ChangeDetectorRef,
              private api: Api) {

    this.limit         = 15;
    this.noMoreResults = true;
    this.ranSearch     = false;

    proponentService.getAll().subscribe(
      data => {
        this.proponents = data;
        // Needed in development mode - not required in prod.
        this._changeDetectionRef.detectChanges();
      },
      error => console.log(error)
    );
    projectService.getAll().subscribe(
      data => {
        this.projects = data;
        this.projectArray = [];
        this.projects.forEach((project, index) => {
          this.projectArray.push(project._id);
        });
        // Needed in development mode - not required in prod.
        this._changeDetectionRef.detectChanges();
      },
      error => console.log(error)
    );
  }

  ngOnInit() {
    this.showAdvancedFields = false;
    this.loading = false;
    this.params = this.api.getParams();
    if (this.params.type
      || this.params.keywords
      || this.params.projects
      || this.params.operator
      || this.params.owner
      || this.params.daterangestart
      || this.params.datarangeend
      || this.params.page
      || this.params.limit) {
      // TBD: Parse and auto-send the query to the server to get results
      // on this page load.
    }
  }

  toggleAdvancedSearch() {
    this.showAdvancedFields = !this.showAdvancedFields;
  }

  onSubmit(form: any) {
    this.page = 0;
    this.ranSearch = true;
    this.results = [];
    this.loading = true;


    // Get the keywords
    let keywordsArr = null;
    if (form.keywordInput) {
      keywordsArr = form.keywordInput.split(' ');
    }

    this.documentService.get(keywordsArr,
                            form.projectInput,
                            this.projects,
                            form.operatorInput,
                            form.ownerInput,
                            form.dateRangeStartInput,
                            form.dateRangeEndInput,
                            this.page,
                            this.limit)
    .subscribe(
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

  loadMore(form: any) {
    this.page += 1;
    let keywordsArr = null;
    if (form.keywordInput) {
      keywordsArr = form.keywordInput.split(' ');
    }
    this.loading = true;
    this.documentService.get(keywordsArr,
                            form.projectInput,
                            this.projects,
                            form.operatorInput,
                            form.ownerInput,
                            form.dateRangeStartInput,
                            form.dateRangeEndInput,
                            this.page,
                            this.limit)
    .subscribe(
      data => {
        data[0].forEach(i => {
          this.results.push(i);
        });
        // push in 2nd call
        data[1].forEach(i => {
          this.results.push(i);
        });
        this.loading = false;
        this.noMoreResults = (data[0].length === 0 && data[1].length === 0);
        this._changeDetectionRef.detectChanges();
      },
      error => console.log(error)
    );
  }
}
