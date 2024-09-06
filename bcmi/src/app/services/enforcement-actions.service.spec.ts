import { TestBed, inject } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { Api } from '@services/api';
import { EnforcementActionsService } from './enforcement-actions.service';
import { ConfigService } from '@services/config.service';

describe('EnforcementActionsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EnforcementActionsService, Api, ConfigService],
      imports: [HttpClientModule]
    });
  });

  it('should be created', inject([EnforcementActionsService], (service: EnforcementActionsService) => {
    expect(service).toBeTruthy();
  }));
});
