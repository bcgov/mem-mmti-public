import { Injectable } from '@angular/core';

import { EsriModuleProvider } from 'app/map/core';
import { createGeocoder, singleLineFieldName } from 'app/map/widgets/support/geocoder';

export interface ZoomWidgetProperties {
  view: __esri.MapViewProperties;
}

export interface SearchWidgetProperties {
  view: __esri.MapViewProperties;
  featureLayer: __esri.FeatureLayer;
  geocoder?: any;
}

/**
 * Creates map widgets from a user-specified configuration
 *
 * @export
 * @class WidgetBuilder
 */
@Injectable()
export class WidgetBuilder {

  constructor(
    private moduleProvider: EsriModuleProvider
  ) { }

  // TODO Add more overloads as more widgets are implemented - i.e. layer list, legend, etc
  createWidget(type: 'zoom', props?: ZoomWidgetProperties): Promise<__esri.Zoom>;
  createWidget(type: 'search', props?: SearchWidgetProperties): Promise<__esri.Search>;
  createWidget(type: string, props?: any): Promise<any> {
    switch (type) {
      case 'zoom':
        return this.createZoom(props);
      case 'search':
        return this.createSearch(props);
      default:
        return Promise.reject('Invalid type');
    }
  }

  private createZoom(props: ZoomWidgetProperties): Promise<__esri.Zoom> {
    return this.moduleProvider.require(['esri/widgets/Zoom'])
      .then(([Zoom]: [__esri.ZoomConstructor]) =>  new Zoom({ view: props ? props.view : null }));
  }

  private createSearch(props: SearchWidgetProperties): Promise<__esri.Search> {
    const { view, featureLayer, geocoder } = props;
    const addressFieldName = singleLineFieldName(geocoder);
    let geoService: __esri.Locator;

    // Get config settings for Location search (i.e. search for 'Fernie, BC') and layer search (i.e. search by mine name/description)
    const locatorSource = this.getLocationSearchProps();
    const layerSource = this.getLayerSearchProps();

    return createGeocoder(this.moduleProvider, geocoder)
      .then(g => geoService = g)
      .then(() => this.moduleProvider.require(['esri/widgets/Search']))
      .then(([Search]: [__esri.SearchConstructor]) => {
        // the locator task used to search. This is *required*
        locatorSource.locator = geoService;
        // the field name of the Single Line Address Field
        locatorSource.singleLineFieldName = addressFieldName;

        // the feature layer queried in the search. This is *required*
        layerSource.featureLayer = featureLayer;

        // Create map search widget
        return new Search({
          view: view,
          allPlaceholder: 'Mine name or location',
          searchAllEnabled: true,
          sources: [locatorSource, layerSource]
        });
      });
  }

  // https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Search.html#LocatorSource
  private getLocationSearchProps(): __esri.LocatorSource {
    return <__esri.LocatorSource>{
      name: 'Locations',
      placeholder: 'Find location',
      // Constricts search results to a specified country code. For example, `CA` for Canada
      countryCode: 'CA',
      maxResults: 3,
      maxSuggestions: 6,
      // whether to display suggestions as the user enters input text in the widget.
      suggestionsEnabled: true,
      // minimum number of characters required before querying for a suggestion
      minSuggestCharacters: 1,
      // whether to automatically navigate to the selected result once selected.
      autoNavigate: true,
      // the set zoom scale for the resulting search result. This scale is automatically honored.
      zoomScale: 500000,
      // whether to show a graphic on the map for the selected source using the `resultSymbol`
      resultGraphicEnabled: false,
      // whether to constrain the search results to the view's extent
      withinViewEnabled: false,
    };
  }

  // https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Search.html#FeatureLayerSource
  private getLayerSearchProps(): __esri.FeatureLayerSource {
    return <__esri.FeatureLayerSource>{
      name: 'Major Mines',
      placeholder: 'Find Mines in BC',
      // results are displayed using this field. Defaults to the layer's `displayField` or the first string field.
      displayField: 'name',
      // specifies the fields in the feature layer to search
      searchFields: ['name', 'description'],
      // specifies the fields returned with the search results.
      outFields: ['*'],
      maxResults: 6,
      maxSuggestions: 6,
      // whether to display suggestions as the user enters input text in the widget.
      suggestionsEnabled: true,
      // minimum number of characters required before querying for a suggestion
      minSuggestCharacters: 1,
      // whether to automatically navigate to the selected result once selected.
      autoNavigate: true,
      // the set zoom scale for the resulting search result. This scale is automatically honored.
      zoomScale: 500000,
      // whether to show a graphic on the map for the selected source using the `resultSymbol`
      resultGraphicEnabled: false,
      // whether to constrain the search results to the view's extent
      withinViewEnabled: false,
    };
  }
}
