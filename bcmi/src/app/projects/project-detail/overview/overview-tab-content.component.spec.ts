import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { Project } from '@app/models/project';

import { OverviewTabContentComponent } from '@projects/project-detail/overview/overview-tab-content.component';
import { Subscription } from 'rxjs';

describe('OverviewTabContentComponent', () => {
  let component: OverviewTabContentComponent;
  let fixture: ComponentFixture<OverviewTabContentComponent>;
  let ActivatedRouteStub;

  beforeEach(waitForAsync(() => {
    // stub activated route
    ActivatedRouteStub = {
      parent: {
        data: {
          subscribe: (next: (value) => void) => {
            const proj = new Project();
            proj.getContent = jest.fn()
            next({project: proj});
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
      declarations: [ OverviewTabContentComponent ],
      imports: []
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OverviewTabContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
