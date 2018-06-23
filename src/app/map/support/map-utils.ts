import { WidgetBuilder, ZoomWidgetProperties, SearchWidgetProperties } from '../widgets/widget-builder';

type OnFulfilled = (value?: any) => any;
type OnRejected = (reason?: any) => void;

const done: OnFulfilled = () => null;
const fail: OnRejected = err => { throw err; };

/** Returns a Promise that resolves when all layers have been loaded into the map and are ready to use */
export function whenLayersReady(layers: __esri.Layer[] = []): Promise<void> {
  const promises = layers.map(lyr => whenReady(lyr));
  return Promise.all(promises).then(done);
}

export function findLayerByTitle(map: __esri.Map, layerTitle: string, ignoreCase = false): __esri.Layer {
  return map.layers.find(layer => equals(layer.title, layerTitle, ignoreCase));
}

/** TODO: document this */
export function findPointLayer(map: __esri.Map): __esri.FeatureLayer {
  const pointLayer = map.layers.find(lyr => isPointLayer(lyr));
  return <__esri.FeatureLayer>pointLayer;
}

/** TODO: document this */
export function findAllBoundaryLayers(map: __esri.Map): __esri.FeatureLayer[] {
  const boundaries = map.layers.filter(lyr => isBoundaryLayer(lyr));
  return <__esri.FeatureLayer[]>boundaries.toArray();
}

/** TODO: document this */
export function zoomToLocation(view: __esri.MapView, targetLocation: __esri.Graphic, useAnimation: boolean = false): Promise<void> {
  // The `goTo` function returns a promise which resolves as soon as the new view has been set to the target.
  const zoomPromise = view.goTo({ target: targetLocation, zoom: 9 }, { animate: useAnimation });
  return toNativePromise(zoomPromise);
}

/** TODO: document this */
export function showMapPopup(view: __esri.MapView, targetLocation: __esri.Graphic): void {
  view.popup.open({
    features: [targetLocation],
    updateLocationEnabled: true  // updates the location of popup based on selected feature's geometry
  });
}

/** TODO: document this */
export function findProjectById(pointLayer: __esri.FeatureLayer, projectId: string): Promise<__esri.FeatureSet> {
  const params = pointLayer.createQuery();
  params.where = `code = '${projectId}'`;
  return queryLayer(pointLayer, params);
}

/**
 * Sets the popup template for the layer.
 * When set on the layer, the popupTemplate allows users to access attributes and
 * display their values in the view's popup when a feature is selected on the map.
 */
export function setPopupTemplate(featureLayer: __esri.FeatureLayer, popupTemplate: __esri.PopupTemplateProperties): Promise<void> {
  if (!popupTemplate) {
    return Promise.resolve();
  }

  // `esri/layers/FeatureLayer` classes are promise-based...
  // so we need to wait for it to be "ready" before accessing its configuration
  const popupPromise = whenReady(featureLayer).then(() => {
    featureLayer.popupTemplate.title = popupTemplate.title;
    featureLayer.popupTemplate.content = popupTemplate.content;
  });
  return toNativePromise(popupPromise);
}

export function setLayerFilter(featureLayer: __esri.FeatureLayer, projectId: string): Promise<void> {
  // set the definition expression directly on layer instance to only display a single project
  const filterPromise = whenReady(featureLayer).then(() => {
    featureLayer.definitionExpression = `code = '${projectId}'`;
  });
  return toNativePromise(filterPromise);

}

interface WidgetProperties {
  search?: {
    featureLayer: __esri.FeatureLayer;
    geocoder: any;
  };
};

export function addWidgets(view: __esri.MapView, widgetBuilder: WidgetBuilder, props?: WidgetProperties): Promise<void> {
  // create widgets in parallel
  const p1 = widgetBuilder.createWidget('zoom', { view });
  const p2 = widgetBuilder.createWidget('search', { view, ...props.search });

  // position the widgets on the map view
  return Promise.all([p1, p2])
    .then(([zoom, search]) => {
      view.ui.add(zoom, 'bottom-right');
      view.ui.add(search, 'top-left');
    });
}

function queryLayer(featureLayer: __esri.FeatureLayer, params: __esri.Query): Promise<__esri.FeatureSet> {
  const queryPromise = featureLayer.queryFeatures(params);
  return toNativePromise(queryPromise, results => results);
}

// Warning! Esri promises are not compatible with native JS Promises
// Adding `done` handler avoids infinite loop in the browser...
// (see https://www.esri.com/arcgis-blog/products/js-api-arcgis/mapping/making-better-promises)
function whenReady(esriLoadable: IPromise<any>): IPromise<any> {
  return esriLoadable.then(done, fail);
}

// Esri promise implementation is not compatible with native JS promises
// This is a wrapper to create proper native promises...
function toNativePromise<T>(esriPromise: IPromise<T>, onfulfilled = done, onrejected = fail): Promise<any> {
  return Promise.resolve(esriPromise.then(onfulfilled, onrejected));
}

// string matching helper function
function equals(a: string, b: string, ignoreCase = false): boolean {
  a = a || '';
  b = b || '';

  a = ignoreCase ? a.toLowerCase() : a;
  b = ignoreCase ? b.toLowerCase() : b;

  return a === b;
}

function isPointLayer(lyr: __esri.Layer): boolean {
  return lyr.type === 'feature' && (<__esri.FeatureLayer>lyr).geometryType === 'point';
}

function isBoundaryLayer(lyr: __esri.Layer): boolean {
  return lyr.type === 'feature' && (<__esri.FeatureLayer>lyr).geometryType === 'polygon';
}
