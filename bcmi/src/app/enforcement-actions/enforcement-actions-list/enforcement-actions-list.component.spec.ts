import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { HttpClientModule } from '@angular/common/http';

import { EnforcementActionsListComponent } from './enforcement-actions-list.component';
import { ConfigService } from 'app/services/config.service';

describe('EnforcementActionsListComponent', () => {
  let component: EnforcementActionsListComponent;
  let fixture: ComponentFixture<EnforcementActionsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [ConfigService],
      declarations: [EnforcementActionsListComponent],
      imports: [HttpClientModule, RouterTestingModule]
    }).compileComponents();
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
