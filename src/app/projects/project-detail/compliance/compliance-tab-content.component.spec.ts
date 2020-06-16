import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ObjectFilterPipe } from 'app/pipes/object-filter.pipe';
import { OperatorFilterPipe } from 'app/pipes/operator-filter.pipe';
import { ProjectStatusFilterPipe } from 'app/pipes/project-status-filter.pipe';
import { ProjectTypeFilterPipe } from 'app/pipes/project-type-filter.pipe';
import { Project } from 'app/models/project';
import { CollectionsArray, CollectionsList } from 'app/models/collection';
import { ActivatedRoute } from '@angular/router';

import { ComplianceTabContentComponent } from 'app/projects/project-detail/compliance//compliance-tab-content.component';
import { OrderByPipe } from 'app/pipes/filters/order-by.pipe';

describe('ComplianceTabContentComponent', () => {
  let component: ComplianceTabContentComponent;
  let fixture: ComponentFixture<ComplianceTabContentComponent>;
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
        ComplianceTabContentComponent,
        ObjectFilterPipe,
        OperatorFilterPipe,
        ProjectStatusFilterPipe,
        ProjectTypeFilterPipe,
        OrderByPipe
      ],
      imports: [
        RouterTestingModule
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
