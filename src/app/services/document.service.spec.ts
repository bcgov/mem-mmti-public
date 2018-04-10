import { TestBed, inject } from '@angular/core/testing';
import { Api } from './api';
import { Http, HttpModule } from '@angular/http';

import { DocumentService } from './document.service';

describe('DocumentService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        DocumentService,
        Api
      ],
      declarations: [],
      imports: [
        HttpModule
      ]
    });
  });

  it('should be created', inject([DocumentService], (service: DocumentService) => {
    expect(service).toBeTruthy();
  }));
});
