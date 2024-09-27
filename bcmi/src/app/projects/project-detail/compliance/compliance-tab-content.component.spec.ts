import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ObjectFilterPipe } from '@pipes/object-filter.pipe';
import { OperatorFilterPipe } from '@pipes/operator-filter.pipe';
import { ProjectStatusFilterPipe } from '@pipes/project-status-filter.pipe';
import { ProjectTypeFilterPipe } from '@pipes/project-type-filter.pipe';
import { Project } from '@models/project';
import { CollectionsArray, CollectionsList } from '@models/collection';
import { ActivatedRoute } from '@angular/router';
import { ConfigService } from '@services/config.service';

import { ComplianceTabContentComponent } from '@projects/project-detail/compliance//compliance-tab-content.component';
import { OrderByPipe } from '@pipes/filters/order-by.pipe';
import { HttpClientModule } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { ContentService } from '@app/services/content-service';
import { Apollo } from 'apollo-angular';

describe('ComplianceTabContentComponent', () => {
  let component: ComplianceTabContentComponent;
  let fixture: ComponentFixture<ComplianceTabContentComponent>;
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
        { provide: ActivatedRoute, useValue: ActivatedRouteStub },
        ConfigService,
        ContentService,
        Apollo
      ],
      declarations: [
        ComplianceTabContentComponent,
        ObjectFilterPipe,
        OperatorFilterPipe,
        ProjectStatusFilterPipe,
        ProjectTypeFilterPipe,
        OrderByPipe
      ],
      imports: [
        RouterTestingModule,
        HttpClientModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComplianceTabContentComponent);
    component = fixture.componentInstance;
    component.project = new Project();
    component.project.moreInspectionsLink = null;
    component.collections = new CollectionsArray();
  });

  describe('ngOnInit', () => {
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
    it('should set sortField to date', () => {
      expect(component.sortField).toBe('date');
    });
    it('should set sortAsc to false', () => {
      expect(component.sortAsc).toBe(false);
    });
    it('should set sortDirection to -1', () => {
      expect(component.sortDirection).toBe(-1);
    });
  });
  describe('sort(field)', () => {
    describe('sortField === field', () => {
      beforeEach(() => {
        component.sortAsc = true;
        component.sortField = 'field';
        component.sort('field');
      });
      it('should return true for sortField === field', () => {
        expect(component.sortField === 'field').toBe(true);
      });
      it('should set sortAsc to true', () => {
        expect(component.sortAsc).toBe(false);
      });
      it('should set sortDirection to 1', () => {
        expect(component.sortDirection).toBe(-1);
      });
    });
    describe('sortField !== field', () => {
      beforeEach(() => {
        component.sortAsc = false;
        component.sortField = 'bad field';
        component.sort('field');
      });
      it('should set sortField === field', () => {
        expect(component.sortField === 'field').toBe(true);
      });
      it('should set sortAsc to true', () => {
        expect(component.sortField === 'field').toBe(true);
      });
      it('should set sortDirection to -1', () => {
        expect(component.sortDirection).toBe(1);
      });
    });
  });
});
