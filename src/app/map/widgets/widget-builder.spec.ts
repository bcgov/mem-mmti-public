import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { MapConfigService } from '../config/map-config.service';
import { EsriLoaderModule, EsriLoaderService } from 'angular-esri-loader';

import { ProjectMapComponent } from '../project-map/project-map.component';
import { WidgetBuilder } from './widget-builder';
import { ProjectService } from 'app/services/project.service';

describe('MapWidgetFactoryService', () => {

  const MockMapConfigService = {
    get: () => {
      return {
        mainMap: {
          webmap: {},
          mapView: {},
          popup: {},
          geocoder: {}
        }
      };
    }
  };
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        WidgetBuilder,
        {provide: MapConfigService, useValue: MockMapConfigService},
        EsriLoaderService,
        ProjectService
      ],
      declarations: [],
      imports: []
    });
  });

  it('should be created', inject([WidgetBuilder], (service: WidgetBuilder) => {
    expect(service).toBeTruthy();
  }));
});
