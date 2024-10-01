import { TestBed, inject } from '@angular/core/testing';
import { Api } from '@services/api';
import { HttpClientModule } from '@angular/common/http';

import { DocumentService } from '@services/document.service';
import { ConfigService } from '@services/config.service';
import { ContentService } from './content-service';
import { Apollo } from 'apollo-angular';

describe('DocumentService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        DocumentService,
        ConfigService,
        ContentService,
        Apollo,
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
