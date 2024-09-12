import { Component} from '@angular/core';
import { VerifiedMinesFeature } from '@app/models/geolocation/verified-mines-feature';
import { LatLng } from 'leaflet';


@Component({
  selector: 'app-major-mines-popup',
  templateUrl: './major-mines-popup.component.html',
  styleUrls: ['./major-mines-popup.component.scss']
})

export class MajorMinesPopupComponent {
  public mine: VerifiedMinesFeature["properties"] = null;
  public mineLocation: LatLng = null;
  public parentMap: L.Map;

  zoomToProject() {
    this.parentMap.setView(this.mineLocation, 10);
  }

  closePopups() {
    this.parentMap.closePopup();
  }

}
