import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { ActivatedRoute } from '@angular/router';

import { AdministrativePenaltiesTabContentComponent } from './administrative-penalties-tab-content.component';
import { Project } from '@models/project';
import { AdministrativePentalty } from '@models/administrative-penalty';

describe('AdministrativePenaltiesTabContentComponent', () => {
  let component: AdministrativePenaltiesTabContentComponent;
  let fixture: ComponentFixture<AdministrativePenaltiesTabContentComponent>;
  let ActivatedRouteStub;

  beforeEach(waitForAsync(() => {
    // stub activated route
    ActivatedRouteStub = {
      parent: {
        data: {
          subscribe: (next: (value) => void) => {
            next({ data: { projects: [Project], actions: [AdministrativePentalty] } });
            return jasmine.createSpyObj('Subscription', ['unsubscribe']);
          }
        }
      }
    };

    TestBed.configureTestingModule({
      providers: [{ provide: ActivatedRoute, useValue: ActivatedRouteStub }],
      declarations: [AdministrativePenaltiesTabContentComponent],
      imports: [RouterTestingModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministrativePenaltiesTabContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
