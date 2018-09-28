import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbModalBackdrop } from '@ng-bootstrap/ng-bootstrap/modal/modal-backdrop';
import { NgbModalStack } from '@ng-bootstrap/ng-bootstrap/modal/modal-stack';
import { NgbModalWindow } from '@ng-bootstrap/ng-bootstrap/modal/modal-window';
import { EsriModuleProvider } from '../core/esri-module-provider';
import { MapConfigService } from '../core/map-config.service';
import { MapLoaderService } from '../core/map-loader.service';
import { EsriMapComponent } from '../esri-map/esri-map.component';
import { WidgetBuilder } from '../widgets/widget-builder';
import { MainMapComponent } from './main-map.component';
import { CookieService } from 'ngx-cookie-service';

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
        CookieService,
        EsriModuleProvider,
        MapLoaderService,
        NgbModal,
        NgbModalStack,
        WidgetBuilder,
        { provide: MapConfigService, useValue: MockMapConfigService }
      ],
      declarations: [EsriMapComponent, MainMapComponent, NgbModalBackdrop, NgbModalWindow],
      imports: [RouterTestingModule]
    })
      .overrideModule(BrowserDynamicTestingModule, {
        set: {
          entryComponents: [NgbModalBackdrop, NgbModalWindow]
        }
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  describe('ngOnInit()', () => {
    it('should call config.get()', () => {
      expect(MockMapConfigService.get()).toBeTruthy();
    });
    it('should set webMapProperties', () => {
      expect(JSON.stringify(component.webMapProperties)).toBe(
        JSON.stringify(MockMapConfigService.get().mainMap.webmap)
      );
    });
    it('should set mapViewProperties', () => {
      expect(JSON.stringify(component.mapViewProperties)).toBe(
        JSON.stringify(MockMapConfigService.get().mainMap.mapView)
      );
    });
    it('should set popupProperties', () => {
      expect(JSON.stringify(component.popupProperties)).toBe(JSON.stringify(MockMapConfigService.get().mainMap.popup));
    });
    it('should set geocoderProperties', () => {
      expect(JSON.stringify(component.geocoderProperties)).toBe(
        JSON.stringify(MockMapConfigService.get().mainMap.geocoder)
      );
    });
  });
});
