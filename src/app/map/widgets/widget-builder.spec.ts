import { TestBed, inject } from '@angular/core/testing';
import { HttpModule, Http, Response, ResponseOptions, BaseRequestOptions, XHRBackend } from '@angular/http';

import { WidgetBuilder } from './widget-builder';
import { MapConfigService } from '../core';
import { Api } from '../../services/api';
import { MapModule } from '../map.module';

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
        HttpModule,
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
