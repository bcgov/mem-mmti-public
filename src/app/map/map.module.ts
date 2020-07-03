import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LeafletMapComponent } from 'app/map/leaflet-map/leaflet-map.component';
import { MainMapComponent } from 'app/map/main-map/main-map.component';
import { ProjectPopupComponent } from 'app/map/leaflet-map/project-popup/project-popup.component';
import { MajorMinesPopupComponent } from 'app/map/leaflet-map/major-mines-popup/major-mines-popup.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [
    MainMapComponent,
    LeafletMapComponent,
    ProjectPopupComponent,
    MajorMinesPopupComponent
  ],
  exports: [
    MainMapComponent,
    LeafletMapComponent
  ],
  entryComponents: [
    ProjectPopupComponent,
    MajorMinesPopupComponent
  ],
  providers: [
  ]
})
export class MapModule { }
