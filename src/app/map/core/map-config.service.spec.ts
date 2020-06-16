import { TestBed, inject } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { MapConfigService } from 'app/map/core/map-config.service';
import { Api } from 'app/services/api';

describe('MapConfigService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ],
      providers: [
        MapConfigService,
        Api
      ]
    });
  });

  describe('get()', () => {
    it('should return a value',
      inject([MapConfigService], (service: MapConfigService) => {

      expect(service.get()).toBeTruthy();
    }));
  });

  describe('webmapForEnv(env)', () => {
    it('env = local',
      inject([MapConfigService, Api], (service: MapConfigService, api: Api) => {

      api.env = 'local';
      expect(service.get()).toBeTruthy();
    }));
    it('env = dev',
      inject([MapConfigService, Api], (service: MapConfigService, api: Api) => {

      api.env = 'dev';
      expect(service.get()).toBeTruthy();
    }));
    it('env = test',
      inject([MapConfigService, Api], (service: MapConfigService, api: Api) => {

      api.env = 'test';
      expect(service.get()).toBeTruthy();
    }));
    it('env = prod',
      inject([MapConfigService, Api], (service: MapConfigService, api: Api) => {

      api.env = 'prod';
      expect(service.get()).toBeTruthy();
    }));
  });
});
