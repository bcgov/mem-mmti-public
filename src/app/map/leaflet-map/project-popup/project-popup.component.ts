import { Component, OnInit, OnDestroy } from '@angular/core';
import { Project } from 'app/models/project';
import { LatLng } from 'leaflet';


@Component({
  selector: 'project-popup',
  templateUrl: './project-popup.component.html',
  styleUrls: ['./project-popup.component.scss']
})

export class ProjectPopupComponent implements OnInit, OnDestroy {
  public project: Project = null;
  public parentMap: L.Map;

  constructor(
  ) { }

  zoomToProject() {
    if (this.project.location) {
      this.parentMap.setView(new LatLng(this.project.location['coordinates'][1], this.project.location['coordinates'][0]), 10);
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
