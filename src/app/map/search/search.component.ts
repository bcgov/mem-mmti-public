import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, OnDestroy, OnChanges } from '@angular/core';
import { Location } from '@angular/common';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Project } from 'app/models/project';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/map';
import * as _ from 'lodash';

export interface FiltersType {
  mineFilter: string;
  permitFilter: string;
}

@Component({
  selector: 'map-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnChanges, OnDestroy {

  @Input() projects: Array<Project> = [];
  @Output() updateMatching = new EventEmitter();

  public loading = false;
  public mineFilter: string = null;
  public _mineFilter: string = null; // temporary filters for Cancel feature
  public permitFilter: string = null;
  public _permitFilter: string = null; // temporary filters for Cancel feaure     is this necessary?

  private mineKeys: Array<string> = [];
  private permitKeys: Array<string> = [];

  private ngUnsubscribe: Subject<boolean> = new Subject<boolean>();

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  // (arrow) functions to return type-ahead results
  // ref: https://ng-bootstrap.github.io/#/components/typeahead/api
  //
  public mineSearch = (text$: Observable<string>) =>
    text$
      .debounceTime(200)
      .distinctUntilChanged()
      .map(term => term.length < 1 ? []
        : this.mineKeys.filter(key => key.indexOf(this._mineFilter.toUpperCase()) > -1) // .slice(0, 10)
      )

  public permitSearch = (text$: Observable<string>) =>
    text$
      .debounceTime(200)
      .distinctUntilChanged()
      .map(term => term.length < 1 ? []
        : this.permitKeys.filter(key => key.indexOf(this._permitFilter.toUpperCase()) > -1) // .slice(0, 10)
      )

  public ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  ngOnInit(): void {
  }

  public onLoadStart() { this.loading = true; }
  public onLoadEnd() { this.loading = false; }

  // called when apps list changes
  public ngOnChanges(changes: SimpleChanges) {
    if (changes.projects && !changes.projects.firstChange && changes.projects.currentValue) {

      this.mineKeys = _.sortedUniq(_.compact(this.projects.map(app => app.name ? app.name.toUpperCase() : null)).sort());

      // (re)apply filtering
      this.internalApplyFilters(false);
    }
  }

  public applyFilters() {
    this.mineFilter = this._mineFilter;
    this.permitFilter = this._permitFilter;
    this.internalApplyFilters(true);
  }

  private internalApplyFilters(doSave: boolean) {
    this.projects.forEach(mine => this.showThisMine(mine));
    this.updateMatching.emit();
    // todo necessary if only text based search?
    if (doSave) {
      this.saveFilters();
    }
  }

  private showThisMine(item: Project): boolean {
    let retVal = true;

    const mineFilter = this.mineFilter && this.mineFilter.trim(); // returns null or empty
    retVal = retVal && (
      !this.mineFilter || !item.name ||
      item.name.toUpperCase().indexOf(mineFilter.toUpperCase()) > -1
    );

    const permitFilter = this.permitFilter && this.permitFilter.trim(); // returns null or empty
    retVal = retVal && (
      !this.permitFilter || !item.name ||
      item.name.toUpperCase().indexOf(permitFilter.toUpperCase()) > -1
    );

    return retVal;
  }

  private saveFilters() {
    const params: Params = {};

    const mineFilter = this.mineFilter && this.mineFilter.trim(); // returns null or empty
    if (mineFilter) {
      params['mine'] = mineFilter;
    }

    const permitFilter = this.permitFilter && this.permitFilter.trim(); // returns null or empty
    if (permitFilter) {
      params['permit'] = permitFilter;
    }

    this.location.go(this.router.createUrlTree([], { relativeTo: this.route, queryParams: params }).toString());

  }



}
