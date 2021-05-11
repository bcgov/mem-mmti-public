import { HttpClient, HttpHandler } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfigService } from 'app/services/config.service';

import { EnforcementActionsComponent } from 'app/static-pages/enforcement-actions/enforcement-actions.component';

describe('EnforcementActionsComponent', () => {
  let component: EnforcementActionsComponent;
  let fixture: ComponentFixture<EnforcementActionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EnforcementActionsComponent],
      providers: [ConfigService, HttpClient, HttpHandler]
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
