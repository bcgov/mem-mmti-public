import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { SiteActivitiesComponent } from 'app/projects/site-activities/site-activities.component';

import { AuthorizationsTabContentComponent } from 'app/projects/project-detail/authorizations/authorizations-tab-content.component';
import { ActivatedRoute } from '@angular/router';
import { Project } from 'app/models/project';

import { OrderByPipe } from 'app/pipes/filters/order-by.pipe';
import { RemoveStringValuePipe } from 'app/pipes/remove-string-value.pipe';

import { MapModule } from 'app/map/map.module';
import { CollectionsGroup, CollectionsList } from 'app/models/collection';

describe('AuthorizationsTabContentComponent', () => {
  let component: AuthorizationsTabContentComponent;
  let fixture: ComponentFixture<AuthorizationsTabContentComponent>;
  let ActivatedRouteStub;

  beforeEach(async(() => {
    // stub activated route
    ActivatedRouteStub = {
      parent: {
        data: {
          subscribe: (next: (value) => void) => {
            next({project: Project});
            return jasmine.createSpyObj('Subscription', ['unsubscribe']);
          }
        }
      }
    };
    TestBed.configureTestingModule({
      providers: [
        { provide: ActivatedRoute, useValue: ActivatedRouteStub }
      ],
      declarations: [
        AuthorizationsTabContentComponent,
        OrderByPipe,
        RemoveStringValuePipe,
        SiteActivitiesComponent
      ],
      imports: [
        RouterTestingModule,
        HttpClientModule,
        MapModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorizationsTabContentComponent);
    component = fixture.componentInstance;
    component.project = new Project();
    component.project.moreInspectionsLink = null;
    component.collections = new CollectionsGroup();
  });
  describe('ngOnInit()', () => {
    beforeEach(() => {
      component.ngOnInit();
    });
    it('should return project data', () => {
      expect(component.project).toBeTruthy();
    });
  });
  describe('parseData(data)', () => {
    beforeEach(() => {
      const data = { project: new Project() };
      data.project.collections = new CollectionsList();
      component.parseData(data);
    });
    it('should return data this.project', () => {
      expect(component.project).toBeTruthy();
    });
    it('should return data for this.project.collections', () => {
      expect(component.project.collections).toBeTruthy();
    });
  });
});
