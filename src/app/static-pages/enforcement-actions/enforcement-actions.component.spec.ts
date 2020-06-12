import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnforcementActionsComponent } from './enforcement-actions.component';

describe('EmprEaComponent', () => {
  let component: EnforcementActionsComponent;
  let fixture: ComponentFixture<EnforcementActionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnforcementActionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnforcementActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
