import { Component} from '@angular/core';
import { LatLng } from 'leaflet';

declare module 'leaflet' {
  export interface Layer {
    properties: any;
  }
}


@Component({
  selector: 'app-geocode-popup',
  templateUrl: './geocode-popup.component.html',
  styleUrls: ['./geocode-popup.component.scss']
})

export class GeoCodePopupComponent {
  public parentMap: L.Map;
  public layer: L.Layer;

  zoomToProject() {
    if (this.layer) {
      this.parentMap.setView(new LatLng(this.layer['geometry']['coordinates'][1], this.layer['geometry']['coordinates'][0]), 15);
    }
  }

  closePopups() {
    this.parentMap.closePopup();
  }

}
