import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Project } from 'app/models/project';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { HttpClientModule } from '@angular/common/http';

import { ProjectListComponent } from 'app/projects/project-list/project-list.component';
import { OrderByPipe } from 'app/pipes/filters/order-by.pipe';
import { ProjectStatusFilterPipe } from 'app/pipes/project-status-filter.pipe';
import { ProjectTypeFilterPipe } from 'app/pipes/project-type-filter.pipe';
import { OperatorFilterPipe } from 'app/pipes/operator-filter.pipe';
import { ObjectFilterPipe } from 'app/pipes/object-filter.pipe';
import { ProjectService } from 'app/services/project.service';
import { Api } from 'app/services/api';

describe('ProjectComponent', () => {
  let component: ProjectListComponent;
  let fixture: ComponentFixture<ProjectListComponent>;
  let ProjectServiceStub;

  beforeEach(async(() => {
    // stub project service
    // mock service
    ProjectServiceStub = {
      getAll: jasmine.createSpy().and.returnValue({
        subscribe: function(fn) {
          fn(Array<Project>());
        }
      })
    };
    TestBed.configureTestingModule({
      providers: [
        {provide: ProjectService, useValue: ProjectServiceStub},
        Api
      ],
      declarations: [
        ProjectListComponent,
        OrderByPipe,
        ProjectStatusFilterPipe,
        ProjectTypeFilterPipe,
        OperatorFilterPipe,
        ObjectFilterPipe
      ],
      imports: [
        RouterTestingModule,
        NgxPaginationModule,
        FormsModule,
        HttpClientModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  describe('ngOnInit()', () => {
    beforeEach(() => {
      component.ngOnInit();
    });

    it('should call projectService.getAll()', () => {
      expect(ProjectServiceStub.getAll).toHaveBeenCalled();
    });
    it('should return projects data', () => {
      expect(component.projects).toBeTruthy();
    });
  });
  describe('parseData(data)', () => {
    let data;

    describe('given an empty response', () => {
      beforeEach(() => {
        data = [];
        component.parseData(data);
      });
      it('should set projects to []', () => {
        expect(JSON.stringify(component.projects)).toBe(JSON.stringify([]));
      });
    });
  });
  describe('getOperators(data)', () => {
    let data;

    describe('given empty data array', () => {
      beforeEach(() => {
        data = [{}];
        component.getOperators(data);
      });
      it('should return 1 item', () => {
        expect(data.length).toBe(1);
      });
      it('should set project.proponent.name to undefined', () => {
        expect(data[0].operator).toBe('');
      });
      it('should not add project.proponent.name to proponents', () => {
        expect(component.operators.length).toBe(0);
      });
    });

    describe('given a non-empty data array', () => {
      beforeEach(() => {
        data = [{
          operator: 'test'
        }];
        component.getOperators(data);
      });
      it('should return 1 item', () => {
        expect(data.length).toBe(1);
      });
      it('should add project.proponent to proponents', () => {
        expect(component.operators[0]).toBe('test');
      });
    });
  });

  describe('sort(property)', () => {
    let property;

    beforeEach(() => {
      property = 'dateAdded';
    });
    describe('given isDesc is true', () => {
      beforeEach(() => {
        component.isDesc = true;
        component.sort(property);
      });

      it('should set isDesc to false', () => {
        expect(component.isDesc).toBeFalsy();
      });
      it('should set direction to -1', () => {
        expect(component.direction).toBe(-1);
      });
    });
    describe('given isDesc is false', () => {
      beforeEach(() => {
        component.isDesc = false;
        component.sort(property);
      });

      it('should set isDesc to true', () => {
        expect(component.isDesc).toBeTruthy();
      });
      it('should set direction to 1', () => {
        expect(component.direction).toBe(1);
      });
    });
    describe('given property', () => {
      it('should assign property to column', () => {
        component.sort(property);
        expect(component.column).toBe(property);
      });
    });
  });

  describe('applyOperatorFilter()', () => {
    it('should set propfilter to proponentListFilter', () => {
      component.operatorListFilter = '';
      component.applyOperatorFilter();
      expect(component.operatorfilter).toBe('');
    });
  });

  describe('clearAllProjectFilters()', () => {
    it('should set filter to undefined', () => {
      component.filter = 'filtertest';
      component.clearAllProjectFilters();
      expect(component.filter).toBeFalsy();
    });
    it('should set NewsTypeFilter to be undefined', () => {
      component.projectTypeFilter = '';
      component.clearAllProjectFilters();
      expect(component.projectTypeFilter).toBeFalsy();
    });
    it('should set typefilter to be undefined', () => {
      component.typefilter = '';
      component.clearAllProjectFilters();
      expect(component.typefilter).toBeFalsy();
    });
    it('should set opteratorListFilter to be undefined', () => {
      component.operatorListFilter = '';
      component.clearAllProjectFilters();
      expect(component.operatorListFilter).toBeFalsy();
    });
    it('should set operatorfilter to be undefined', () => {
      component.operatorfilter = '';
      component.clearAllProjectFilters();
      expect(component.operatorfilter).toBeFalsy();
    });
    it('should set projectStatusFilter to be undefined', () => {
      component.projectStatusFilter = '';
      component.clearAllProjectFilters();
      expect(component.projectStatusFilter).toBeFalsy();
    });
    it('should set statusfilter to be undefined', () => {
      component.statusfilter = '';
      component.clearAllProjectFilters();
      expect(component.statusfilter).toBeFalsy();
    });
  });
});
