import { Component} from '@angular/core';
import { LatLng } from 'leaflet';


@Component({
  selector: 'app-major-mines-popup',
  templateUrl: './major-mines-popup.component.html',
  styleUrls: ['./major-mines-popup.component.scss']
})

export class MajorMinesPopupComponent {
  public mine: any = null;
  public mineLocation: LatLng = null;
  public parentMap: L.Map;

  zoomToProject() {
    this.parentMap.setView(this.mineLocation, 10);
  }

  closePopups() {
    this.parentMap.closePopup();
  }

}
