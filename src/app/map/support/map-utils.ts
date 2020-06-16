import { WidgetBuilder } from 'app/map/widgets/widget-builder';

type OnFulfilled = (value?: any) => any;
type OnRejected = (reason?: any) => void;

const done: OnFulfilled = () => null;
const fail: OnRejected = err => { throw err; };

/** Returns a Promise that resolves when all layers have been loaded into the map and are ready to use */
export function whenLayersReady(layers: __esri.Layer[] = []): Promise<void> {
  const promises = layers.map(lyr => lyr.when());
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
  const popupPromise = featureLayer.when(() => {
    featureLayer.popupTemplate.title = popupTemplate.title;
    featureLayer.popupTemplate.content = popupTemplate.content;
  });
  return toNativePromise(popupPromise);
}

/**
 * Resets the popup template for the layer whenever the user clicks a pin.
 * We need to do this because we are alternating between real click popups
 * and fake popups we use to simulate mouseover tooltips.  We need to switch
 * the skins so that it appears seamless to the user.
 */
export function onClickHandler(featureLayer: __esri.FeatureLayer, mapView: __esri.MapView,
  popupTemplate: __esri.PopupTemplateProperties) {
  return function () {
    resetToPopupStyle(featureLayer, mapView, popupTemplate);
  };
}

/**
 * Resets the popup template for the layer.
 * We need to do this because we are alternating between real click popups
 * and fake popups we use to simulate mouseover tooltips.  We need to switch
 * the skins so that it appears seamless to the user.
 */
export function resetToPopupStyle(featureLayer: __esri.FeatureLayer, mapView: __esri.MapView,
  popupTemplate: __esri.PopupTemplateProperties) {
  if (null !== mapView.popup.title) {
    const currentPopupTitle = String(mapView.popup.title.toString());

    if (currentPopupTitle.includes('moTitle') || 0 === currentPopupTitle.length) {
      mapView.popup.close();
    }
  }
  if (popupTemplate) {
    featureLayer.popupTemplate.title = popupTemplate.title;
    featureLayer.popupTemplate.content = popupTemplate.content;
  }
  mapView.popup.dockOptions = {
    buttonEnabled: true
  };
}

/**
 * Event handler for mouseovers on the map pins.
 * Sets the correct popup style, making a quasi tooltip out of the esri popups.
 * Displays the pin name in the popup title and hides the popup content.
 */
export function onMouseoverHandler(featureLayer: __esri.FeatureLayer, mapView: __esri.MapView,
  popupTemplate: __esri.PopupTemplateProperties) {
  return function (args) {
    resetToPopupStyle(featureLayer, mapView, popupTemplate);

    // only proceed if we're over the pin on the map
    mapView.hitTest(args).then(function (evt) {
      // get the topmost graphic from the Major Mines (point) layer, while ignoring other layers (e.g. shapefiles)
      // resolves EM-1132 bug
      const mapPins = (evt.results || []).filter(x => x.graphic.layer === featureLayer);
      if (mapPins.length > 0) {
        const topmostGraphic = mapPins[0].graphic;
        const topmostLocation = mapPins[0].mapPoint;

        if (null !== topmostGraphic) {
          // if there is an open popup, do nothing unless it's closed
          if ((null !== mapView.popup.visible) && (mapView.popup.visible)) {
            if (null !== mapView.popup.title) {
              const currentPopupTitle = String(mapView.popup.title.toString());
              if (!currentPopupTitle.includes('moTitle')) {
                if (0 === mapView.popup.title.length) {
                  mapView.popup.close();
                }
                return;
              }
            }
          }
          mapView.popup.dockOptions = {
            // Disable dock button
            buttonEnabled: false
          };
          mapView.popup.open({
            location: topmostLocation,
            title: '<div id="moTitle">' + topmostGraphic.attributes.name + '</div>'
          });
        }
      }
    });
  };
}

export function setLayerFilter(featureLayer: __esri.FeatureLayer, projectId: string): Promise<void> {
  // set the definition expression directly on layer instance to only display a single project
  const filterPromise = featureLayer.when(() => {
    featureLayer.definitionExpression = `code = '${projectId}'`;
  });
  return toNativePromise(filterPromise);
}

interface WidgetProperties {
  search?: {
    featureLayer: __esri.FeatureLayer;
    geocoder: any;
  };
}

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
// function whenReady(esriLoadable: IPromise<any>): IPromise<any> {
//   return esriLoadable.then(done, fail);
// }

// Esri promise implementation is not compatible with native JS promises
// This is a wrapper to create proper native promises
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
