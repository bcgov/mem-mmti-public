import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ObjectFilterPipe } from '../../../object-filter.pipe';
import { OperatorFilterPipe } from '../../../operator-filter.pipe';
import { ProjectStatusFilterPipe } from '../../../project-status-filter.pipe';
import { ProjectTypeFilterPipe } from '../../../project-type-filter.pipe';
import { Project } from '../../../models/project';
import { CollectionsArray } from 'app/models/collection';
import { ActivatedRoute } from '@angular/router';

import { ComplianceTabContentComponent } from './compliance-tab-content.component';
import { OrderByPipe } from 'app/filters/order-by.pipe';

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

  it('should be created', () => {
    spyOn(component, 'parseData').and.stub;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
