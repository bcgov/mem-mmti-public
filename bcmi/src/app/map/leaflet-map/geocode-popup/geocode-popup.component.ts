import { Component} from '@angular/core';
import { AddressResponse } from '@app/models/geolocation/address-response';
import { LatLng, Map, Layer } from 'leaflet';
declare module 'leaflet' {
  export interface Layer {
    properties: AddressResponse["properties"];
  }
}
@Component({
  selector: 'app-geocode-popup',
  templateUrl: './geocode-popup.component.html',
  styleUrls: ['./geocode-popup.component.scss']
})

export class GeoCodePopupComponent {
  public parentMap: Map;
  public layer: Layer;

  zoomToProject() {
    if (this.layer) {
      this.parentMap.setView(new LatLng(this.layer['geometry']['coordinates'][1], this.layer['geometry']['coordinates'][0]), 15);
    }
  }

  closePopups() {
    this.parentMap.closePopup();
  }

}
