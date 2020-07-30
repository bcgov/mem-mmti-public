import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterTestingModule } from '@angular/router/testing';

import { SearchComponent } from 'app/map/search/search.component';
import { TestConstants } from 'app/shared/test-constants';
import { GeocoderService } from 'app/services/geocoder.service';
import { Api } from 'app/services/api';
import { HttpClient, HttpHandler } from '@angular/common/http';



describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  let GeocoderServiceStub;

  beforeEach(async(() => {

    GeocoderServiceStub = {
      lookupAddress: jasmine.createSpy().and.returnValue({
        subscribe: function(fn) {
          fn({'some': 'results'});
        }
      })
    };

    TestBed.configureTestingModule({
      declarations: [ SearchComponent ],
      providers: [
        {provide: GeocoderService, useValue: GeocoderServiceStub },
        Api,
        HttpClient,
        HttpHandler
      ],
      imports: [
        FormsModule,
        MatRadioModule,
        NgbTypeaheadModule,
        RouterTestingModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    component.projects = TestConstants.testProjects;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return single result when search by mine name ', () => {
    spyOn(component.updateMatching, 'emit');
    component.radioSel = 'Mine Name';
    component._mineFilter = 'Gold Tigers, NA';
    fixture.detectChanges();
    component.applyFilters();
    expect(component.resultsCount).toEqual(1);
    expect(component.updateMatching.emit).toHaveBeenCalled();
  });

  it('should return single result when search by permit number ', async () => {
    spyOn(component.updateMatching, 'emit');
    component.radioSel = 'Permit Number';
    component._permitFilter = 'C-456';
    await fixture.whenStable();
    component.applyFilters();
    expect(component.resultsCount).toEqual(1);
    expect(component.updateMatching.emit).toHaveBeenCalled();
    expect(component.mineFilter).toBeFalsy();
  });

  it('should return no results when search with non existent mine name ', () => {
    spyOn(component.updateMatching, 'emit');
    component.radioSel = 'Mine Name';
    component._mineFilter = 'Not a mine';
    component.applyFilters();
    fixture.detectChanges();
    expect(component.resultsCount).toEqual(0);
    expect(component.updateMatching.emit).toHaveBeenCalled();
    expect(component.permitFilter).toBeFalsy();
  });

  it('should return no results when search with non existent permit number ', () => {
    spyOn(component.updateMatching, 'emit');
    component.radioSel = 'Permit Number';
    component._permitFilter = 'fake-111';
    component.applyFilters();
    expect(component.resultsCount).toEqual(0);
    expect(component.updateMatching.emit).toHaveBeenCalled();
    expect(component.mineFilter).toBeFalsy();
  });

  it('should emit geocode results', () => {
    spyOn(component.showPlace, 'emit');
    component.radioSel = 'Address Lookup';
    component._geoFilter = 'foo st';
    component.geocode();
    expect(component.showPlace.emit).toHaveBeenCalled();
  });
});
