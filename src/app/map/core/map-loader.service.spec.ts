import { TestBed, inject } from '@angular/core/testing';
import { EsriModuleProvider } from './esri-module-provider';

import { MapLoaderService } from './map-loader.service';
import { MapConfigService } from './map-config.service';
import { Api } from 'app/services/api';

import { HttpModule } from '@angular/http';

describe('MapLoaderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        Api,
        MapLoaderService,
        MapConfigService,
        EsriModuleProvider
    ],
      declarations: [],
      imports: [
        HttpModule
      ]
    });
  });

  it('should be created', inject([MapLoaderService], (service: MapLoaderService) => {
    expect(service).toBeTruthy();
  }));
});
