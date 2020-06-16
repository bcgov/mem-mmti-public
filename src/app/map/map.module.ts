import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { EsriMapComponent } from 'app/map/esri-map/esri-map.component';
import { MainMapComponent } from 'app/map/main-map/main-map.component';
import { ProjectMapComponent } from 'app/map/project-map/project-map.component';
import { WidgetBuilder } from 'app/map/widgets/widget-builder';
import { MapLoaderService, MapConfigService, EsriModuleProvider } from 'app/map/core';

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
