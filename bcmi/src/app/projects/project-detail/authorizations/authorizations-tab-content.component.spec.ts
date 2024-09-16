import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { SiteActivitiesComponent } from '@projects/site-activities/site-activities.component';

import { AuthorizationsTabContentComponent } from '@projects/project-detail/authorizations/authorizations-tab-content.component';
import { ActivatedRoute } from '@angular/router';
import { Project } from '@models/project';

import { OrderByPipe } from '@pipes/filters/order-by.pipe';
import { RemoveStringValuePipe } from '@pipes/remove-string-value.pipe';

import { MapModule } from '../../../map/map.module';
import { CollectionsGroup, CollectionsList } from '@models/collection';
import { Subscription } from 'rxjs';

describe('AuthorizationsTabContentComponent', () => {
  let component: AuthorizationsTabContentComponent;
  let fixture: ComponentFixture<AuthorizationsTabContentComponent>;
  let ActivatedRouteStub;

  beforeEach(waitForAsync(() => {
    // stub activated route
    ActivatedRouteStub = {
      parent: {
        data: {
          subscribe: (next: (value) => void) => {
            next({project: Project});
            const sub = new Subscription();
            sub.unsubscribe = jest.fn();
            return sub;
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
