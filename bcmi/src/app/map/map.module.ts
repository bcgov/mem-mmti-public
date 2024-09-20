import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LeafletMapComponent } from '../map/leaflet-map/leaflet-map.component';
import { MainMapComponent } from '../map/main-map/main-map.component';
import { ProjectPopupComponent } from '../map/leaflet-map/project-popup/project-popup.component';
import { MajorMinesPopupComponent } from '../map/leaflet-map/major-mines-popup/major-mines-popup.component';
import { SearchComponent } from './search/search.component';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatRadioModule } from '@angular/material/radio';
import { GeocoderService } from '@services/geocoder.service';
import { GeoCodePopupComponent } from './leaflet-map/geocode-popup/geocode-popup.component';
import { LeafletModule } from '@bluehalo/ngx-leaflet';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    NgbModule,
    MatRadioModule,
    LeafletModule
  ],
  declarations: [
    MainMapComponent,
    LeafletMapComponent,
    ProjectPopupComponent,
    MajorMinesPopupComponent,
    GeoCodePopupComponent,
    SearchComponent,
    ProjectPopupComponent,
    MajorMinesPopupComponent,
    GeoCodePopupComponent
  ],
  exports: [
    MainMapComponent,
    LeafletMapComponent
  ],
  providers: [
    GeocoderService
  ]
})
export class MapModule { }
