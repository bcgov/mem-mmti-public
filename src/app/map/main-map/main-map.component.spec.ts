import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CookieService } from 'ngx-cookie-service';
import { LeafletMapComponent } from 'app/map/leaflet-map/leaflet-map.component';
import { ProjectService } from 'app/services/project.service';
import { MainMapComponent } from 'app/map/main-map/main-map.component';
import { Project } from 'app/models/project';

describe('MainMapComponent', () => {
  let component: MainMapComponent;
  let fixture: ComponentFixture<MainMapComponent>;
  let ProjectServiceStub;

  beforeEach(async(() => {

    ProjectServiceStub = {
      getAll: jasmine.createSpy().and.returnValue({
        subscribe: function(fn) {
          fn(Array<Project>());
        }
      })
    };

    TestBed.configureTestingModule({
      providers: [
        CookieService,
        NgbModule,
        LeafletMapComponent,
        HttpClient,
        HttpHandler,
        { provide: ProjectService, useValue: ProjectServiceStub }
      ],
      declarations: [
        MainMapComponent,
        LeafletMapComponent
      ],
      imports: [
        NgbModule,
        RouterTestingModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
  });

  it('should create', () => {
    fixture = TestBed.createComponent(MainMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });
});
