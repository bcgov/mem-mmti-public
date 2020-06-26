import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LeafletMapComponent } from 'app/map/leaflet-map/leaflet-map.component';
import { MainMapComponent } from 'app/map/main-map/main-map.component';
import { ProjectPopupComponent } from 'app/map/leaflet-map/project-popup/project-popup.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [
    MainMapComponent,
    LeafletMapComponent,
    ProjectPopupComponent
  ],
  exports: [
    MainMapComponent,
    LeafletMapComponent
  ],
  entryComponents: [
    ProjectPopupComponent
  ],
  providers: [
  ]
})
export class MapModule { }
