import { Component, OnInit, OnDestroy } from '@angular/core';
import { LatLng } from 'leaflet';


@Component({
  selector: 'geocode-popup',
  templateUrl: './geocode-popup.component.html',
  styleUrls: ['./geocode-popup.component.scss']
})

export class GeoCodePopupComponent implements OnInit, OnDestroy {
  public parentMap: L.Map;
  public layer: L.Layer;

  constructor(
  ) { }

  zoomToProject() {
    if (this.layer) {
      this.parentMap.setView(new LatLng(this.layer['geometry']['coordinates'][1], this.layer['geometry']['coordinates'][0]), 10);
    }
  }

  closePopups() {
    this.parentMap.closePopup();
  }

  ngOnInit() {
  }

  ngOnDestroy() {
  }
}
