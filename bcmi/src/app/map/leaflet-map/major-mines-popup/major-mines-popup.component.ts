import { Component, OnInit, OnDestroy } from '@angular/core';
import { LatLng } from 'leaflet';


@Component({
  selector: 'major-mines-popup',
  templateUrl: './major-mines-popup.component.html',
  styleUrls: ['./major-mines-popup.component.scss']
})

export class MajorMinesPopupComponent implements OnInit, OnDestroy {
  public mine: any = null;
  public mineLocation: LatLng = null;
  public parentMap: L.Map;

  constructor(
  ) { }

  zoomToProject() {
    this.parentMap.setView(this.mineLocation, 10);
  }

  closePopups() {
    this.parentMap.closePopup();
  }

  ngOnInit() {
  }

  ngOnDestroy() {
  }
}
