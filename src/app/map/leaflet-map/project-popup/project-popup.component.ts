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
    this.parentMap.setView(new LatLng(this.project.latitude, this.project.longitude), 10);
  }

  ngOnInit() {
  }

  ngOnDestroy() {
  }
}
