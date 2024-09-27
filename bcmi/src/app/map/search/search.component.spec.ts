import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterTestingModule } from '@angular/router/testing';

import { SearchComponent } from './search.component';
import { TestConstants } from '@shared/test-constants';
import { GeocoderService } from '@services/geocoder.service';
import { Api } from '@services/api';
import { ConfigService } from '@services/config.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { ContentService } from '@app/services/content-service';



describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  let GeocoderServiceStub;

  beforeEach(waitForAsync(() => {

    GeocoderServiceStub = {
      lookupAddress: jest.fn().mockReturnValue({
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
        ConfigService,
        ContentService,
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
    jest.spyOn(component.updateMatching, 'emit');
    component.radioSel = 'Mine Name';
    component._mineFilter = 'Gold Tigers, NA';
    fixture.detectChanges();
    component.applyFilters();
    expect(component.resultsCount).toEqual(1);
    expect(component.updateMatching.emit).toHaveBeenCalled();
  });

  it('should return single result when search by permit number ', async () => {
    jest.spyOn(component.updateMatching, 'emit');
    component.radioSel = 'Permit Number';
    component._permitFilter = 'C-456';
    await fixture.whenStable();
    component.applyFilters();
    expect(component.resultsCount).toEqual(1);
    expect(component.updateMatching.emit).toHaveBeenCalled();
    expect(component.mineFilter).toBeFalsy();
  });

  it('should return no results when search with non existent mine name ', () => {
    jest.spyOn(component.updateMatching, 'emit');
    component.radioSel = 'Mine Name';
    component._mineFilter = 'Not a mine';
    component.applyFilters();
    fixture.detectChanges();
    expect(component.resultsCount).toEqual(0);
    expect(component.updateMatching.emit).toHaveBeenCalled();
    expect(component.permitFilter).toBeFalsy();
  });

  it('should return no results when search with non existent permit number ', () => {
    jest.spyOn(component.updateMatching, 'emit');
    component.radioSel = 'Permit Number';
    component._permitFilter = 'fake-111';
    component.applyFilters();
    expect(component.resultsCount).toEqual(0);
    expect(component.updateMatching.emit).toHaveBeenCalled();
    expect(component.mineFilter).toBeFalsy();
  });

  it('should emit geocode results', () => {
    jest.spyOn(component.showPlace, 'emit');
    component.radioSel = 'Address Lookup';
    component._geoFilter = 'foo st';
    component.geocode();
    expect(component.showPlace.emit).toHaveBeenCalled();
  });
});
