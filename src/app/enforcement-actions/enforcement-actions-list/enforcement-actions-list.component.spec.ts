import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnforcementActionsListComponent } from './enforcement-actions-list.component';

describe('EnforcementActionsListComponent', () => {
  let component: EnforcementActionsListComponent;
  let fixture: ComponentFixture<EnforcementActionsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnforcementActionsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnforcementActionsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
