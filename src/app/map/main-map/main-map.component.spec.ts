import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CookieService } from 'ngx-cookie-service';
// import { LeafletMapComponent } from 'app/map/leaflet-map/leaflet-map.component';
import { ProjectService } from 'app/services/project.service';
import { MainMapComponent } from 'app/map/main-map/main-map.component';
import { Project } from 'app/models/project';
import { SearchComponent } from '../search/search.component';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule } from '@angular/forms';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { LeafletMapComponent } from '../leaflet-map/leaflet-map.component';

@Component({
  selector: 'leaflet-map',
  template: ''
})

class LeafletMapStubComponent {
  @Input() project: Project;
  @Input() projects: Array<Project> = []; // from main map component
  @Input() mapApps; // from main map component
  @Input() filterApps; // from main map component
  @Input() zoom = 6;
  @Input() thumbnail = false;
  @Output() updateVisible = new EventEmitter(); // to projects component
  public loading = false;

  public onLoadStart() { this.loading = true; }
  public onLoadEnd() { this.loading = false; }

  public resetMap() {}
}

describe('MainMapComponent', () => {
  let component: MainMapComponent;
  let fixture: ComponentFixture<MainMapComponent>;
  let ProjectServiceStub;

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
     summary: 'Tigers of gold',
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

   let projectsData = [
    project1,
    project2
  ];


  beforeEach(async(() => {

    ProjectServiceStub = {
      getAll: jasmine.createSpy().and.returnValue({
        subscribe: function(fn) {
          fn(projectsData);
        }
      })
    };

    TestBed.configureTestingModule({
      providers: [
        CookieService,
        NgbModule,
        { provide: LeafletMapComponent, useValue: LeafletMapStubComponent },
        HttpClient,
        HttpHandler,
        { provide: ProjectService, useValue: ProjectServiceStub }
      ],
      declarations: [
        MainMapComponent,
        LeafletMapStubComponent,
        SearchComponent
      ],
      imports: [
        FormsModule,
        NgbModule,
        RouterTestingModule,
        MatRadioModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return no results when no there are no matching projects', () => {
    component.filterApps[0].isMatch = false;
    component.filterApps[1].isMatch = false;
    fixture.detectChanges();
    component.updateMatching();
    expect(component.mapApps).toEqual([]);
  });
});
