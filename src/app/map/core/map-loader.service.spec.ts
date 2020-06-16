import { TestBed, inject } from '@angular/core/testing';
import { EsriModuleProvider } from 'app/map/core/esri-module-provider';

import { MapLoaderService } from 'app/map/core/map-loader.service';
import { MapConfigService } from 'app/map/core/map-config.service';
import { Api } from 'app/services/api';

import { HttpClientModule } from '@angular/common/http';

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
        HttpClientModule
      ]
    });
  });

  it('should be created', inject([MapLoaderService], (service: MapLoaderService) => {
    expect(service).toBeTruthy();
  }));
});
