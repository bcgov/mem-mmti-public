import { Injectable } from '@angular/core';
import { loadModules, ILoadScriptOptions } from 'esri-loader';
import { MapConfigService } from './map-config.service';

/**
 * `EsriModuleProvider` - a service which abstracts the esri loader service using ArcGIS API for JavaScript v4.6
 *
 * @export
 * @class EsriModuleProvider
 */
@Injectable()
export class EsriModuleProvider {

  arcgisOptions: ILoadScriptOptions;

  constructor(private config: MapConfigService) {
    const props = this.config.get();
    this.arcgisOptions = props.arcgis;
  }

  require(moduleNames: string[], options: ILoadScriptOptions = this.arcgisOptions): Promise<any[]> {
    return loadModules(moduleNames, options)
      .catch(err => {
        // handle any script loading errors
        console.error(err);
        throw err;
      });
  }
}
