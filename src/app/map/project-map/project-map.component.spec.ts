import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { ProjectMapComponent } from './project-map.component';

import { EsriLoaderModule } from 'angular-esri-loader';
import { MapLoaderService } from '../map-loader.service';
import { MapConfigService } from '../config/map-config.service';
import { GeocoderSettings } from '../widgets/support/geocoder';
import { EsriMapComponent } from '../esri-map/esri-map.component';
import { Project } from '../../models/project';

describe('ProjectMapComponent', () => {
  let component: ProjectMapComponent;
  let fixture: ComponentFixture<ProjectMapComponent>;

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
        { provide: MapConfigService, useValue: MockMapConfigService }
      ],
      declarations: [
        ProjectMapComponent,
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
    fixture = TestBed.createComponent(ProjectMapComponent);
    component = fixture.componentInstance;
    component.project = new Project();
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
