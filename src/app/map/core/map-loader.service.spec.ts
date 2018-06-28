import { TestBed, inject } from '@angular/core/testing';
import { EsriModuleProvider } from './esri-module-provider';

import { MapLoaderService } from './map-loader.service';

describe('MapLoaderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MapLoaderService,
        EsriModuleProvider
    ],
      declarations: [],
      imports: []
    });
  });

  it('should be created', inject([MapLoaderService], (service: MapLoaderService) => {
    expect(service).toBeTruthy();
  }));
});
