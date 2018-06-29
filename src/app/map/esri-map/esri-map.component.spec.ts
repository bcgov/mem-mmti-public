import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MapLoaderService } from '../core/map-loader.service';
import { EsriMapComponent } from './esri-map.component';
import { ElementRef } from '@angular/core';


describe('EsriMapComponent', () => {
  let component: EsriMapComponent;
  let fixture: ComponentFixture<EsriMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: MapLoaderService, useValue: jasmine.createSpyObj('MapLoaderService', ['load']) }
      ],
      declarations: [
        EsriMapComponent
      ],
      imports: [
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EsriMapComponent);
    component = fixture.componentInstance;
    component.mapProperties = {};
    component.webMapProperties = {};
    component.mapViewProperties = {};
    component.mapEl = new ElementRef('div');
  });

  it('should be created', () => {
    const mapLoaderService = TestBed.get(MapLoaderService);
    mapLoaderService.load.and.returnValue({ then: () => Promise.resolve({}) });
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
