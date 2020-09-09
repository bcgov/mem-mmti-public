import { TestBed, inject } from '@angular/core/testing';
import { Api } from 'app/services/api';
import { HttpClientModule } from '@angular/common/http';

import { DocumentService } from 'app/services/document.service';
import { ConfigService } from 'app/services/config.service';

describe('DocumentService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        DocumentService,
        ConfigService,
        Api
      ],
      declarations: [],
      imports: [
        HttpClientModule
      ]
    });
  });

  it('should be created', inject([DocumentService], (service: DocumentService) => {
    expect(service).toBeTruthy();
  }));
});
