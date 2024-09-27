import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { HttpClientModule } from '@angular/common/http';

import { EnforcementActionsListComponent } from './enforcement-actions-list.component';
import { ConfigService } from '@services/config.service';
import { ContentService } from '@app/services/content-service';
import { Apollo } from 'apollo-angular';

describe('EnforcementActionsListComponent', () => {
  let component: EnforcementActionsListComponent;
  let fixture: ComponentFixture<EnforcementActionsListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      providers: [ConfigService,ContentService, Apollo],
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
