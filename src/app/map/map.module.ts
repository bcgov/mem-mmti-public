import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { EsriMapComponent } from './esri-map/esri-map.component';
import { MainMapComponent } from './main-map/main-map.component';
import { ProjectMapComponent } from './project-map/project-map.component';
import { WidgetBuilder } from './widgets/widget-builder';
import { MapLoaderService, MapConfigService, EsriModuleProvider } from './core';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
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
    WidgetBuilder,
    EsriModuleProvider
  ]
})
export class MapModule { }
