import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { WidgetBuilder } from 'app/map/widgets/widget-builder';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CookieService } from 'ngx-cookie-service';
import { EsriModuleProvider } from 'app/map/core/esri-module-provider';
import { MapLoaderService } from 'app/map/core/map-loader.service';
import { MainMapComponent } from 'app/map/main-map/main-map.component';
import { MapConfigService } from 'app/map/core/map-config.service';
import { EsriMapComponent } from 'app/map/esri-map/esri-map.component';

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
        NgbModule,
        MapLoaderService,
        WidgetBuilder,
        EsriModuleProvider,
        { provide: MapConfigService, useValue: MockMapConfigService }
      ],
      declarations: [
        MainMapComponent,
        EsriMapComponent
      ],
      imports: [
        NgbModule,
        RouterTestingModule
      ]
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
      expect(JSON.stringify(component.webMapProperties)).toBe(JSON.stringify(MockMapConfigService.get().mainMap.webmap));
    });
    it('should set mapViewProperties', () => {
      expect(JSON.stringify(component.mapViewProperties)).toBe(JSON.stringify(MockMapConfigService.get().mainMap.mapView));
    });
    it('should set popupProperties', () => {
      expect(JSON.stringify(component.popupProperties)).toBe(JSON.stringify(MockMapConfigService.get().mainMap.popup));
    });
    it('should set geocoderProperties', () => {
      expect(JSON.stringify(component.geocoderProperties)).toBe(JSON.stringify(MockMapConfigService.get().mainMap.geocoder));
    });
  });
});
