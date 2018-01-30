import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EsriLoaderModule } from 'angular-esri-loader';

import { EsriMapComponent } from './esri-map/esri-map.component';
import { MainMapComponent } from './main-map/main-map.component';
import { ProjectMapComponent } from './project-map/project-map.component';
import { MapLoaderService } from './map-loader.service';
import { MapConfigService } from './config/map-config.service';
import { WidgetBuilder } from './widgets/widget-builder';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    EsriLoaderModule
  ],
  declarations: [
    EsriMapComponent,
    MainMapComponent,
    ProjectMapComponent
  ],
  exports: [
    EsriMapComponent,
    MainMapComponent,
    ProjectMapComponent
  ],
  providers: [
    MapConfigService,
    MapLoaderService,
    WidgetBuilder
  ]
})
export class MapModule { }
