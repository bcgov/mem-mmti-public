import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LeafletMapComponent } from 'app/map/leaflet-map/leaflet-map.component';
import { MainMapComponent } from 'app/map/main-map/main-map.component';
import { ProjectPopupComponent } from 'app/map/leaflet-map/project-popup/project-popup.component';
import { MajorMinesPopupComponent } from 'app/map/leaflet-map/major-mines-popup/major-mines-popup.component';
import { SearchComponent } from './search/search.component';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatRadioModule } from '@angular/material/radio';
import { GeocoderService } from 'app/services/geocoder.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    NgbModule,
    MatRadioModule
  ],
  declarations: [
    MainMapComponent,
    LeafletMapComponent,
    ProjectPopupComponent,
    MajorMinesPopupComponent,
    SearchComponent
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
    GeocoderService
  ]
})
export class MapModule { }
