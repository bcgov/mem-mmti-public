import { Component, Input, Output, EventEmitter, SimpleChanges, OnDestroy, OnChanges, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Project } from 'app/models/project';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/map';
import * as _ from 'lodash';

import { GeocoderService } from 'app/services/geocoder.service';
import { DropdownLists, DropdownOption } from 'app/shared/dropdown-lists';

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
  @Input() selected: string;
  @Output() updateMatching = new EventEmitter();
  @Output() showPlace = new EventEmitter();

  public loading = false;
  public ranSearch = false;
  public mineFilter: string = null;
  public _mineFilter: string = null; // temporary filters for Cancel feature
  public permitFilter: string = null;
  public _permitFilter: string = null; // temporary filters for Cancel feature
  public _geoFilter: string = null;
  public typeFilter: string = null;
  public _typeFilter: string = null;
  public typeahead: Observable<string> = null;
  public resultsCount = 0;
  public showAdvancedFilters = false;
  // In order to access in the template.
  public minetypeOptions: Array<DropdownOption> = DropdownLists.MineTypeList;
  public radioSel: string;
  public radioOptions: string[] = ['Mine Name', 'Permit Number', 'Address Lookup'];
  public tailingImpound: string;
  public tailingImpoundOptions: string[] = [ 'Yes', 'No' ];

  private mineKeys: Array<string> = [];
  private permitKeys: Array<string> = [];
  private geoResults: Array<any> = [];
  private ngUnsubscribe: Subject<boolean> = new Subject<boolean>();

  constructor(
    private geoService: GeocoderService,
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
        : this.mineKeys.filter(key => key.indexOf(this._mineFilter.toUpperCase()) > -1)
      )

  public permitSearch = (text$: Observable<string>) =>
    text$
      .debounceTime(200)
      .distinctUntilChanged()
      .map(term => term.length < 1 ? []
        : this.permitKeys.filter(key => key.indexOf(this._permitFilter.toUpperCase()) > -1)
      )

  ngOnInit(): void {
    this.radioSel = 'Mine Name';
  }

  public ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  public onLoadStart() { this.loading = true; }

  public onLoadEnd() { this.loading = false; }

  // called when apps list changes
  public ngOnChanges(changes: SimpleChanges) {
    if (changes.projects && !changes.projects.firstChange && changes.projects.currentValue) {

      this.mineKeys = _.sortedUniq(_.compact(this.projects.map(app => app.name ? app.name.toUpperCase() : null)).sort());
      this.permitKeys = _.sortedUniq(_.compact(this.projects.map(app => app.permitNumber ? app.permitNumber.toUpperCase() : null)).sort());

      // (re)apply filtering
      this.internalApplyFilters(false);
    }
  }

  public handleRadioChange(value) {
    this.radioSel = value;
  }

  public geocode() {
    this.geoResults = [];
    // lookup address and emit results to leaflet map component
    this.geoService.lookupAddress(this._geoFilter).subscribe(results => {
      if (results) {
        this.geoResults.push(results);
        this.showPlace.emit(this.geoResults);
      }
    });
  }


  public applyFilters() {
    // clear previous search terms
    if (this.radioSel === 'Mine Name' ) {
      this._permitFilter = null;
      this._geoFilter = null;
    } else {
      this._mineFilter = null;
      this._geoFilter = null;
    }
    this.mineFilter = this._mineFilter;
    this.permitFilter = this._permitFilter;
    this.typeFilter = this._typeFilter;
    this.ranSearch = true;
    this.internalApplyFilters(true);
  }

  private internalApplyFilters(doSave: boolean) {
    this.projects.forEach(mine => mine.isMatch = this.showThisMine(mine));
    let projCount = this.projects.filter(mine => mine.isMatch);
    this.resultsCount = projCount.length;
    this.updateMatching.emit();

    if (doSave) {
      this.saveFilters();
    }
  }

  private showThisMine(item: Project): boolean {
    let retVal;

    const mineFilter = this.mineFilter && this.mineFilter.trim(); // returns null or empty
    retVal = (
      !this.mineFilter || !item.name ||
      item.name.toUpperCase().indexOf(mineFilter.toUpperCase()) > -1
    );

    const permitFilter = this.permitFilter && this.permitFilter.trim(); // returns null or empty
    retVal = retVal && (
      !this.permitFilter || !item.permitNumber ||
      item.permitNumber.toUpperCase().indexOf(permitFilter.toUpperCase()) > -1
    );

    retVal = retVal && (
      !this.typeFilter || item.type === this.typeFilter
    );

    retVal = retVal && (
      !this.tailingImpound ||
      (this.tailingImpound === 'No' && item.tailingsImpoundments === 0) ||
      (this.tailingImpound === 'Yes' && item.tailingsImpoundments > 0)
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

    if (this.typeFilter) {
      params['type'] = this.typeFilter;
    }

    if (this.tailingImpound) {
      params['tailingImpounds'] = this.tailingImpound === 'Yes' ? true : false;
    }

    this.location.go(this.router.createUrlTree([], { relativeTo: this.route, queryParams: params }).toString());
  }
}
