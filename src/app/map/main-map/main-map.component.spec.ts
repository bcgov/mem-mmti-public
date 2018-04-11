import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { WidgetBuilder } from '../widgets/widget-builder';

import { EsriLoaderModule, EsriLoaderService } from 'angular-esri-loader';
import { MapLoaderService } from '../map-loader.service';
import { MainMapComponent } from './main-map.component';
import { MapConfigService } from '../config/map-config.service';
import { GeocoderSettings } from '../widgets/support/geocoder';
import { EsriMapComponent } from '../esri-map/esri-map.component';

describe('MainMapComponent', () => {
  let component: MainMapComponent;
  let fixture: ComponentFixture<MainMapComponent>;

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

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        MapLoaderService,
        WidgetBuilder,
        { provide: MapConfigService, useValue: MockMapConfigService }
      ],
      declarations: [
        MainMapComponent,
        EsriMapComponent
      ],
      imports: [
        RouterTestingModule,
        EsriLoaderModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
