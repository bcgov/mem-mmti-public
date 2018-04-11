import { TestBed, inject } from '@angular/core/testing';
import { EsriLoaderModule, EsriLoaderService } from 'angular-esri-loader';

import { MapLoaderService } from './map-loader.service';

describe('MapLoaderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MapLoaderService,
        EsriLoaderService
    ],
      declarations: [],
      imports: []
    });
  });

  it('should be created', inject([MapLoaderService], (service: MapLoaderService) => {
    expect(service).toBeTruthy();
  }));
});
