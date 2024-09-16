import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { ActivatedRoute } from '@angular/router';

import { OffenceProsecutionsTabContentComponent } from './offence-prosecutions-tab-content.component';
import { Project } from '@models/project';
import { CourtConviction } from '@models/court-conviction';
import { Subscription } from 'rxjs';

describe('OffenceProsecutionsTabContentComponent', () => {
  let component: OffenceProsecutionsTabContentComponent;
  let fixture: ComponentFixture<OffenceProsecutionsTabContentComponent>;
  let ActivatedRouteStub;

  beforeEach(waitForAsync(() => {
    // stub activated route
    ActivatedRouteStub = {
      parent: {
        data: {
          subscribe: (next: (value) => void) => {
            next({ data: { projects: [Project], actions: [CourtConviction] } });
            const sub = new Subscription();
            sub.unsubscribe = jest.fn();
            return sub;
          }
        }
      }
    };

    TestBed.configureTestingModule({
      providers: [{ provide: ActivatedRoute, useValue: ActivatedRouteStub }],
      declarations: [OffenceProsecutionsTabContentComponent],
      imports: [RouterTestingModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OffenceProsecutionsTabContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
