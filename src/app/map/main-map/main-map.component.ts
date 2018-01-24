import { Component, Inject, Input, HostBinding, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { MapConfigService } from '../config/map-config.service';
import { WidgetBuilder, ZoomWidgetProperties, SearchWidgetProperties } from '../widgets/widget-builder';

@Component({
  selector: 'app-main-map',
  templateUrl: './main-map.component.html',
  styleUrls: ['./main-map.component.scss']
})
export class MainMapComponent implements OnInit {
  // public properties
  webMapProperties: __esri.WebMapProperties;
  mapViewProperties: __esri.MapViewProperties;
  popupProperties: __esri.PopupTemplateProperties;
  geocoderProperties: any;
  map: __esri.Map;
  mapView: __esri.MapView;
  search: __esri.Search;
  zoom: __esri.Zoom;

  @Input() animate = true;

  @HostBinding('class.full-screen') fullScreen = true;

  // private fields
  private selectedId: string;

  constructor(
    private config: MapConfigService,
    private route: ActivatedRoute,
    private widgetBuilder: WidgetBuilder
  ) { }

  ngOnInit() {
    const props = this.config.get();
    this.webMapProperties = props.mainMap.webmap;
    this.mapViewProperties = props.mainMap.mapView;
    this.popupProperties = props.mainMap.popup;
    this.geocoderProperties = props.mainMap.geocoder;
  }

  onMapInit(mapInfo: { map: __esri.Map, mapView: __esri.MapView }): void {
    const args = {
      ...mapInfo,
      popupProperties: this.popupProperties,
      featureLayer: <__esri.FeatureLayer>null,
      search: <__esri.Search>null,
      zoom: <__esri.Zoom>null
    };

    Promise.resolve(args)
      // store local references to map and view
      .then(obj => {
        this.map = obj.map;
        this.mapView = obj.mapView;
        return obj;
      })
      // create zoom widget instance
      .then(obj => {
        return this.widgetBuilder.createWidget('zoom', { view: obj.mapView })
          .then(zoom => this.zoom = obj.zoom = zoom)
          .then(() => obj);
      })
      // find the feature layer with `project` data
      .then(obj => {
        const { map, mapView } = obj;  // es6 destructuring
        obj.featureLayer = this.findFeatureLayer(map);
        return obj;
      })
      // set map popup to match app styling
      .then(obj => {
        const { featureLayer, popupProperties } = obj;  // es6 destructuring
        return this.setPopupTemplateForLayer(featureLayer, popupProperties)
          .then(() => obj);
      })
      // create search widget instance, then add it to the map
      .then(obj => {
        const props: SearchWidgetProperties = {
          view: obj.mapView,
          featureLayer: obj.featureLayer,
          geocoder: this.geocoderProperties
        };
        return this.widgetBuilder.createWidget('search', props)
          .then(search => this.search = obj.search = search)
          .then(() => obj);
      })
      // position the interactive widgets (i.e. zoom, search) on the map
      .then(obj => {
        const { mapView, search, zoom } = obj;
        mapView.ui.add(zoom, 'bottom-right');
        mapView.ui.add(search, 'top-left');
        return obj;
      })
      // automatically show project popup on the map when coming from project details page
      .then(obj => {
        this.route.paramMap.subscribe((params: ParamMap) => {
          const { featureLayer, mapView } = obj;  // es6 destructuring
          let targetMine: __esri.Graphic;

          // fetch the project Id from URL/route params (if any)
          this.selectedId = params.get('project');

          if (this.selectedId) {
            this.queryMapLayer(featureLayer, this.selectedId)
              .then((response: __esri.FeatureSet) => {
                targetMine = response && response.features && response.features.length ? response.features[0] : null;
              })
              .then(() => this.zoomToMine(mapView, targetMine, this.animate))
              .then(() => this.showMapPopup(mapView, targetMine));
          }
        });
      });
  }

  private findFeatureLayer(map: __esri.Map): __esri.FeatureLayer {
    // need to cast the layer as FeatureLayer to make TypeScript happy
    return map.layers.find(lyr => lyr.type === 'feature') as __esri.FeatureLayer;
  }

  private setPopupTemplateForLayer(featureLayer: __esri.FeatureLayer, popupTemplate: __esri.PopupTemplateProperties): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      // the `esri/layers/FeatureLayer` instance is promise-based...
      // call the .then() method to execute code once the layer is ready
      return featureLayer.then(
        (fl: __esri.FeatureLayer) => {
          if (popupTemplate) {
            fl.popupTemplate.title = popupTemplate.title;
            fl.popupTemplate.content = popupTemplate.content;
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

  private zoomToMine(view: __esri.MapView, targetMine: __esri.Graphic, animate: boolean = false): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const opts: __esri.MapViewGoToOptions = {
        animate: animate
      };

      // the `goTo` function returns a promise which resolves as soon as the new view has been set to the target.
      return view.goTo(
        {
          target: targetMine,
          zoom: 9
        }, opts)
        .then(() => resolve())
        .otherwise(reject);
    });
  }

  private showMapPopup(view: __esri.MapView, targetMine: __esri.Graphic): void {
    view.popup.open({
      features: [targetMine],
      updateLocationEnabled: true  // updates the location of popup based on selected feature's geometry
    });
  }
}
