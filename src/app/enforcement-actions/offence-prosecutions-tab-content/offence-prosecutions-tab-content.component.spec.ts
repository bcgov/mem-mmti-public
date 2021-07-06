import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { ActivatedRoute } from '@angular/router';

import { OffenceProsecutionsTabContentComponent } from './offence-prosecutions-tab-content.component';
import { Project } from 'app/models/project';
import { CourtConviction } from 'app/models/court-conviction';

describe('OffenceProsecutionsTabContentComponent', () => {
  let component: OffenceProsecutionsTabContentComponent;
  let fixture: ComponentFixture<OffenceProsecutionsTabContentComponent>;
  let ActivatedRouteStub;

  beforeEach(async(() => {
    // stub activated route
    ActivatedRouteStub = {
      parent: {
        data: {
          subscribe: (next: (value) => void) => {
            next({ data: { projects: [Project], actions: [CourtConviction] } });
            return jasmine.createSpyObj('Subscription', ['unsubscribe']);
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

  fit('should create', () => {
    expect(component).toBeTruthy();
  });
});
