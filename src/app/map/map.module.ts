import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { LeafletMapComponent } from 'app/map/leaflet-map/leaflet-map.component';
import { MainMapComponent } from 'app/map/main-map/main-map.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [
    MainMapComponent,
    LeafletMapComponent
  ],
  exports: [
    MainMapComponent,
    LeafletMapComponent
  ],
  providers: [
  ]
})
export class MapModule { }
