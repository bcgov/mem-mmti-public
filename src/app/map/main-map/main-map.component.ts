import { Component, Inject, Input, HostBinding, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { EsriLoaderService } from 'angular-esri-loader';

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
  search: __esri.Search;
  zoom: __esri.Zoom;

  @Input() animate = true;

  @HostBinding('class.full-screen') fullScreen = true;

  // private fields
  private selectedId: string;

  constructor(
    @Inject(MAP_CONFIG_TOKEN) private config: MapConfig,
    private route: ActivatedRoute,
    private esriLoader: EsriLoaderService
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
        const { mapView } = obj;
        return this.createZoomWidget(mapView)
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
        const { mapView, featureLayer } = obj;
        return this.createSearchWidget(mapView, featureLayer)
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

  private createSearchWidget(view: __esri.MapView, featureLayer: __esri.FeatureLayer): Promise<__esri.Search> {
    return this.esriLoader.loadModules(['esri/widgets/Search']).then(([Search]: [__esri.SearchConstructor]) => {
      const search = new Search({
        view: view,
        sources: [
          {
            featureLayer: featureLayer,
            displayField: 'name',
            searchFields: ['name', 'description'],  // the names of fields in the feature layer to search
            outFields: ['*'],
            autoNavigate: true,
            resultGraphicEnabled: false,  // whether to show a graphic on the map for the selected source using the `resultSymbol`
            withinViewEnabled: false,  // whether to constrain the search results to the view's extent
            zoomScale: 500000,
            suggestionsEnabled: true,
            minSuggestCharacters: 1,  // minimum number of characters required before querying for a suggestion
            maxSuggestions: 6,
            placeholder: 'Find Mines in BC'
          }
        ]
      });
      return search;
    });
  }

  private createZoomWidget(view: __esri.MapView): Promise<__esri.Zoom> {
    return this.esriLoader.loadModules(['esri/widgets/Zoom'])
      .then(([Zoom]: [__esri.ZoomConstructor]) => new Zoom({ view: view }));
  }
}
