import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchComponent } from './search.component';
import { Project } from 'app/models/project';
import { FormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterTestingModule } from '@angular/router/testing';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  let project1 =  new Project({
     _schemaName: 'MineBCMI',
      read: ['public', 'sysadmin'],
      write: ['sysadmin'],
      name: 'Gold Tigers, NA',
      permittee: 'Tiger Lord',
      type: 'Gold',
      status: 'Hissing' ,
      region: 'Caribou',
      permitNumber: 'C-123',
      location: { 'type': 'Point', 'coordinates': [-122.76, 53.931] },
      commodities: ['Gold', 'Gold Tigers'],
      summary: 'I like goooooold',
      isMatch: false
  });
  let project2 = new Project({
       _schemaName: 'MineBCMI',
      read: ['public', 'sysadmin'],
      write: ['sysadmin'],
      name: 'Silver R Us, NA',
      permittee: 'Long Jonh Silver',
      type: 'Silver',
      status: 'Flourishing' ,
      region: 'Kootenay',
      permitNumber: 'C-456',
      location: { 'type': 'Point', 'coordinates': [-123.5123, 49.2911] },
      commodities: ['Silver', 'Silver Boots'],
      summary: 'Silver or Bust',
      isMatch: false
    });

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      declarations: [ SearchComponent ],
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
    let projects = [
      project1,
      project2
    ];
    component.projects = projects;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('search by mine name should return result', () => {
    spyOn(component.updateMatching, 'emit');
    component.radioSel = 'Mine Name';
    component._mineFilter = 'Gold Tigers, NA';
    fixture.detectChanges();
    component.applyFilters();
    expect(component.resultsCount).toEqual(1);
    expect(component.updateMatching.emit).toHaveBeenCalled();
  });

  it('search by permit number should return result', async () => {
    spyOn(component.updateMatching, 'emit');
    component.radioSel = 'Permit Number';
    component._permitFilter = 'C-456';
    await fixture.whenStable();
    component.applyFilters();
    expect(component.resultsCount).toEqual(1);
    expect(component.updateMatching.emit).toHaveBeenCalled();
    expect(component.mineFilter).toBeFalsy();
  });

  it('search with on non existent mine name should return no results', () => {
    spyOn(component.updateMatching, 'emit');
    component.radioSel = 'Mine Name';
    component._mineFilter = 'Not a mine';
    component.applyFilters();
    fixture.detectChanges();
    expect(component.resultsCount).toEqual(0);
    expect(component.updateMatching.emit).toHaveBeenCalled();
    expect(component.permitFilter).toBeFalsy();
  });

  it('search with on non existent permit number should return no results', () => {
    spyOn(component.updateMatching, 'emit');
    component.radioSel = 'Permit Number';
    component._permitFilter = 'fake-111';
    component.applyFilters();
    expect(component.resultsCount).toEqual(0);
    expect(component.updateMatching.emit).toHaveBeenCalled();
    expect(component.mineFilter).toBeFalsy();
  });
});
