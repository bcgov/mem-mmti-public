import { Component, Inject, Input, HostBinding, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { MAP_CONFIG_TOKEN, DEFAULT_MAP_CONFIG, MapConfig } from '../config';

@Component({
  selector: 'app-main-map',
  templateUrl: './main-map.component.html',
  styleUrls: ['./main-map.component.scss'],
  providers: [
    { provide: MAP_CONFIG_TOKEN, useValue: DEFAULT_MAP_CONFIG }
  ]
})
export class MainMapComponent implements OnInit {
  // public properties
  webMapProperties: __esri.WebMapProperties;
  mapViewProperties: __esri.MapViewProperties;
  popupProperties: __esri.PopupProperties;
  map: __esri.Map;
  mapView: __esri.MapView;

  @Input() animate = true;

  @HostBinding('class.full-screen') fullScreen = true;

  // private fields
  private selectedId: string;

  constructor(
    private route: ActivatedRoute,
    @Inject(MAP_CONFIG_TOKEN) private config: MapConfig
  ) { }

  ngOnInit() {
    this.webMapProperties = this.config.mainMap.webmap;
    this.mapViewProperties = this.config.mainMap.mapView;
    this.popupProperties = this.config.mainMap.popup;
  }

  onMapInit(mapInfo: { map: __esri.Map, mapView: __esri.MapView }): void {
    const args = {
      ...mapInfo,
      popupProperties: this.popupProperties,
      featureLayer: <__esri.FeatureLayer>null
    };

    Promise.resolve(args)
      // store local references to map and view
      .then(obj => {
        this.map = obj.map;
        this.mapView = obj.mapView;
        return obj;
      })
      // find the feature layer with `project` data
      .then(obj => {
        const { map } = obj;  // es6 destructuring
        obj.featureLayer = this.findFeatureLayer(map);
        return obj;
      })
      // set map popup to match app styling
      .then(obj => {
        const { featureLayer, popupProperties } = obj;  // es6 destructuring
        return this.setPopupTemplateForLayer(featureLayer, popupProperties)
          .then(() => obj);
      })
      // automatically show project popup on the map when coming from project details page
      .then(obj => {
        this.route.paramMap.subscribe((params: ParamMap) => {
          const { featureLayer, mapView } = obj;  // es6 destructuring
          this.selectedId = params.get('project');
          let results: __esri.FeatureSet;

          if (this.selectedId) {
            this.queryMapLayer(featureLayer, this.selectedId)
              .then(response => results = response)
              .then(() => this.showSingleProject(featureLayer, this.selectedId))
              .then(() => this.zoomToProject(mapView, results, this.animate))
              .then(() => this.showMapPopup(mapView, results));
          }
        });
      });
  }

  private findFeatureLayer(map: __esri.Map): __esri.FeatureLayer {
    return map.layers.find((lyr: __esri.Layer) => lyr.type === 'feature');
  }

  private setPopupTemplateForLayer(featureLayer: __esri.FeatureLayer, popupTemplate: __esri.PopupTemplateProperties): Promise<void> {
    return new Promise((resolve, reject) => {
      // the `esri/layers/FeatureLayer` instance is promise-based...
      // call the .then() method to execute code once the layer is ready
      return featureLayer.then(
        (fl: __esri.FeatureLayer) => {
          if (popupTemplate) {
            fl.popupTemplate.title = <string>popupTemplate.title;
            fl.popupTemplate.content = <string>popupTemplate.content;
          }
        })
        .then(() => resolve())
        .otherwise(reject);
    });
  }

  private queryMapLayer(featureLayer: __esri.FeatureLayer, projectId: string): Promise<__esri.FeatureSet> {
    return new Promise((resolve, reject) => {
      // construct a query object that matches the layer's current configuration
      const query = featureLayer.createQuery();
      query.where = `code = '${projectId}'`;

      // query the layer with the modified params object
      // then set the popup's features which will populate popup content and title
      return featureLayer.queryFeatures(query)
        .then(results => resolve(results))
        .otherwise(reject);
    });
  }

  private showSingleProject(featureLayer: __esri.FeatureLayer, projectId: string): Promise<void> {
    return new Promise((resolve, reject) => {
      // set the definition expression directly on layer instance to only display a single project
      return featureLayer.then(
        (fl: __esri.FeatureLayer) => {
          fl.definitionExpression = `code = '${projectId}'`;
        })
        .then(() => resolve())
        .otherwise(reject);
    });
  }

  private zoomToProject(view: __esri.MapView, featureSet: __esri.FeatureSet, animate: boolean = false): Promise<void> {
    return new Promise((resolve, reject) => {
      const graphics = featureSet.features;
      const result = graphics.length ? graphics[0] : null;
      const opts: __esri.MapViewGoToOptions = {
        animate: animate
      };

      // the `goTo` function returns a promise which resolves as soon as the new view has been set to the target.
      return view.goTo(
        {
          target: result,
          zoom: 9
        }, opts)
        .then(() => resolve())
        .otherwise(reject);
    });
  }

  private showMapPopup(view: __esri.MapView, featureSet: __esri.FeatureSet): void {
    const graphics = featureSet.features;
    const result = graphics.length ? graphics[0] : null;
    view.popup.open({
      features: [result],
      updateLocationEnabled: true  // updates the location of popup based on selected feature's geometry
    });
  }
}
