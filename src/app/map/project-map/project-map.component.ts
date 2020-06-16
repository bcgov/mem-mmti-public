import { Component, Input, OnInit } from '@angular/core';

import { MapInitEvent } from 'app/map/esri-map/esri-map.component';
import { MapConfigService } from 'app/map/core';
import { Project } from 'app/models/project';
import { whenLayersReady, findLayerByTitle, setLayerFilter } from 'app/map/support/map-utils';

@Component({
  selector: 'app-project-map',
  templateUrl: './project-map.component.html',
  styleUrls: ['./project-map.component.scss'],
})
export class ProjectMapComponent implements OnInit {
  // public properties
  webMapProperties: __esri.WebMapProperties;
  mapViewProperties: __esri.MapViewProperties;
  map: __esri.Map;
  mapView: __esri.MapView;

  pointLayerTitle: string;
  pointLayer: __esri.FeatureLayer;

  @Input() project: Project;
  @Input() zoom = 6;

  constructor(private config: MapConfigService) { }

  ngOnInit(): void {
    const props = this.config.get();
    const { latitude, longitude } = this.project;  // ES6 destructuring

    this.pointLayerTitle = props.mainMap.pointLayerTitle;
    this.webMapProperties = props.mainMap.webmap;
    this.mapViewProperties = { ...props.mainMap.mapView, zoom: this.zoom, center: { latitude, longitude } };
  }

  onMapInit(mapInfo: MapInitEvent): void {
    const map = mapInfo.map;
    const view = mapInfo.mapView;
    const projectId = this.project.code;

    // find the feature layer with `project` data
    const layerTitle = this.pointLayerTitle;
    const featureLayer = <__esri.FeatureLayer>findLayerByTitle(map, layerTitle);

    // store local references to map and view
    this.map = map;
    this.mapView = view;
    this.pointLayer = featureLayer;

    // 1- wait for layers to load
    // 2- filter out all projects except the one we want to show
    whenLayersReady([featureLayer])
      .then(() => setLayerFilter(featureLayer, projectId));
  }
}
