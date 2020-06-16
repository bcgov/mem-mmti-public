import { TestBed, inject } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { WidgetBuilder } from 'app/map/widgets/widget-builder';
import { MapConfigService } from 'app/map/core';
import { Api } from 'app/services/api';
import { MapModule } from 'app/map/map.module';

describe('MapWidgetFactoryService', () => {

  function createProps(view, featureLayer, geocoder) {
    return {
      view: view,
      featureLayer: featureLayer,
      geocoder: geocoder
    };
  }
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        MapModule
      ],
      providers: [
        WidgetBuilder,
        MapConfigService,
        Api
      ]
    });
  });

  describe('createWidget(type)', () => {
    describe('type = zoom', () => {
      it('should return a value', inject([WidgetBuilder], (service: WidgetBuilder) => {
        expect(service.createWidget('zoom')).toBeTruthy();
      }));
    });
    describe('type = search', () => {
      it('should return a value', inject([WidgetBuilder], (service: WidgetBuilder) => {
        const props = createProps('', '', '');
        expect(service.createWidget('search', props)).toBeTruthy();
      }));
    });
    describe('type = null', () => {
      it('should return a value', inject([WidgetBuilder], (service: WidgetBuilder) => {
        expect(service.createWidget(null)).toBeTruthy();
      }));
    });
  });
});
