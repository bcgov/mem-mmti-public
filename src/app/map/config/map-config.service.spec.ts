import { TestBed, inject } from '@angular/core/testing';
import { Api } from '../../services/api';
import { Http, HttpModule } from '@angular/http';

import { MapConfigService } from './map-config.service';

describe('MapConfigService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MapConfigService,
        Api
      ],
      declarations: [],
      imports: [
        HttpModule
      ]
    });
  });

  it('should be created', inject([MapConfigService], (service: MapConfigService) => {
    expect(service).toBeTruthy();
  }));
});
