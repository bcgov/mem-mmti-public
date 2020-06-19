import 'leaflet';
import { Project } from 'app/models/project';

declare module 'leaflet' {
  export interface FeatureGroup<P = any> {
    projectId: number;
  }
  export interface Marker<P = any> {
    projectId: number;
  }
}

const L = window['L'];

export interface BuildNature {
  build: string;
  nature: string;
}

export class LeafletMapUtils {
  public static readonly BASEMAPS = {
    ESRI_OCEAN: L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Ocean_Basemap/MapServer/tile/{z}/{y}/{x}', {
      attribution: 'Tiles &copy; Esri &mdash; Sources: GEBCO, NOAA, CHS, OSU, UNH, CSUMB, National Geographic, DeLorme, NAVTEQ, and Esri',
      maxZoom: 13,
      noWrap: true
    }),
    ESRI_NATGEO: L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}', {
      attribution: 'Tiles &copy; Esri &mdash; National Geographic, Esri, DeLorme, NAVTEQ, UNEP-WCMC, USGS, NASA, ESA, METI, NRCAN, GEBCO, NOAA, iPC',
      maxZoom: 16,
      noWrap: true
    }),
    ESRI_TOPO: L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', {
      attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community',
      maxZoom: 16,
      noWrap: true
    }),
    ERI_IMAGERY: L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
      attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
      maxZoom: 17,
      noWrap: true
    })
  };

  public static readonly LAYERS = {
    VERIFIED_MINES: L.tileLayer.wms('https://openmaps.gov.bc.ca/geo/pub/WHSE_MINERAL_TENURE.HSP_MJR_MINES_PERMTTD_AREAS_SP/ows', {
      layers: 'pub:WHSE_MINERAL_TENURE.HSP_MJR_MINES_PERMTTD_AREAS_SP',
      styles: '7738_7739',
      transparent: true,
      format: 'image/png'
    })
  };

  public static generateProjectPopup(project: Project) {
    let content = `<div class="popup-container">
                     <header class="popup-header">
                       <h5>${project.name}</h5>
                     </header>
                     <article class="popup-content">
                       <div class="map-popup-content">
                         <ul class="map-popup-meta">
                           <li>
                             <span class="meta-name">Type:</span>
                             <span class="meta-value">${project.type}</span>
                           </li>
                         </ul>
                         <div class="map-popup-desc">${project.description}</div>
                         <div class="map-popup-btns">
                           <a class="btn btn-sm slide-r-btn" title="View additional information about ${project.name}" href="/p/${project.code}">
                             <span>Go to Project Details</span><i class="material-icons">arrow_forward</i>
                           </a>
                           <div>
                           <div class="map-popup-disc">The Province has reviewed the geospatial information but makes
                                                       no guarantee or warranties whatsoever, either expressed or implied, with
                                                       respect to the accuracy or quality of information, content, or materials,
                                                       and disclaims all responsibility for the accuracy or completeness contained herein.
                           </div>
                         </div>
                        </div>
                      </article>
                    </div>`;

    return content;
  }
}
