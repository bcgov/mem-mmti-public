import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Project } from '@models/project';
import { ProjectService } from '@services/project.service';
import { MapModule } from '@map/map.module';
import { HttpClientModule } from '@angular/common/http';
import { ProjectDetailComponent } from '@projects/project-detail/project-detail.component';
import { LeafletMapComponent } from '@map/leaflet-map/leaflet-map.component';
import { OrderByPipe } from '@pipes/filters/order-by.pipe';
import { SiteActivitiesComponent } from '@projects/site-activities/site-activities.component';
import { Api } from '@services/api';
import { ConfigService } from '@services/config.service';
import { Subscription } from 'rxjs';
import { ContentService } from '@app/services/content-service';

window.scrollTo = jest.fn();

describe('ProjectDetailComponent', () => {
  let component: ProjectDetailComponent;
  let fixture: ComponentFixture<ProjectDetailComponent>;
  let ActivatedRouteStub;
  let router;
  let ProjectServiceStub;
  const ni = new NavigationEnd(1, '', '');

  beforeEach(
    waitForAsync(() => {

      ProjectServiceStub = {
        getAll: jest.fn().mockReturnValue({
          subscribe: function(fn) {
            fn(Array<Project>());
          }
        })
      };

      // Activated Route Stub
      ActivatedRouteStub = {
        snapshot: {
          url: [
            { path: 'test', redirectTo: '' }
          ]
        },
        data: {
          subscribe: (fn: (value) => void) => fn({
              project: new Project(),
          })
        }
      };

      // Router Stub
      router = {
        navigate: jest.fn(),
        createUrlTree: jest.fn(),
        events: {
          subscribe: (next: (value) => void) => {
            next(ni);
            const sub = new Subscription();
            sub.unsubscribe = jest.fn();
            return sub;
          }
        },
        serializeUrl: () => ''
      };
      TestBed.configureTestingModule({
        providers: [
          Api,
          { provide: ActivatedRoute, useValue: ActivatedRouteStub },
          { provide: Router, useValue: router },
          LeafletMapComponent,
          { provide: ProjectService, useValue: ProjectServiceStub },
          ConfigService,
          ContentService
        ],
        declarations: [
          ProjectDetailComponent,
          OrderByPipe,
          SiteActivitiesComponent
        ],
        imports: [
          RouterTestingModule.withRoutes([
            { path: 'projects', redirectTo: '' }
          ]),
          MapModule,
          HttpClientModule
        ]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('ngOnInit()', () => {
    it('should return data for route.data', () => {
      expect(ActivatedRouteStub.data).toBeTruthy();
    });
    it('should return project data', () => {
      expect(component.project).toBeTruthy();
    });
  });
  describe('parseData(data)', () => {
    it('should set loading to false', () => {
      expect(component.loading).toBe(false);
    });
    it('should set project to data.project', () => {
      const data = { project: new Project() };
      component.parseData(data);
      expect(JSON.stringify(component.project)).toBe(JSON.stringify(data.project));
    });
  });
  describe('gotoProjectList()', () => {
    it('should navigate to /map when no project code given', () => {
      component.gotoProjectList();
      expect(router.navigate).toHaveBeenCalledWith(['/mines']);
    });
  });
  describe('gotoMap()', () => {
    it('should navigate to /map when no project code given', () => {
      component.project = null;
      component.gotoMap();
      expect(router.navigate).toHaveBeenCalledWith(['/map', { project: null}]);
    });
    it('should navigate to /map given a project code', () => {
      component.project = new Project();
      component.project._id = 'test';
      component.gotoMap();
      expect(router.navigate).toHaveBeenCalledWith(['/map', { project: component.project._id}]);
    });
  });
});
