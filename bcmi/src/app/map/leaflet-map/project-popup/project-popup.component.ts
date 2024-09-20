import { Component} from '@angular/core';
import { Project } from '@models/project';
import { LatLng } from 'leaflet';
import {Map as LeafletMap} from 'leaflet';


@Component({
  selector: 'app-project-popup',
  templateUrl: './project-popup.component.html',
  styleUrls: ['./project-popup.component.scss']
})

export class ProjectPopupComponent {
  public project: Project = null;
  public parentMap: LeafletMap;


  zoomToProject() {
    if (this.project.location) {
      this.parentMap.setView(new LatLng(this.project.location['coordinates'][1], this.project.location['coordinates'][0]), 10);
    }
  }

  closePopups() {
    this.parentMap.closePopup();
  }

}
