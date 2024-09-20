import 'leaflet';
import { tileLayer } from 'leaflet';

declare module 'leaflet' {
  export interface FeatureGroup {
    projectId: number;
  }
  export interface Marker{
    projectId: number;
  }
}

export interface BuildNature {
  build: string;
  nature: string;
}

export class LeafletMapUtils {
  public static readonly BASEMAPS = {
    ESRI_OCEAN: tileLayer('https://server.arcgisonline.com/arcgis/rest/services/Ocean/World_Ocean_Base/MapServer/tile/{z}/{y}/{x}', {
      attribution: 'Tiles &copy; Esri &mdash; Sources: GEBCO, NOAA, CHS, OSU, UNH, CSUMB, National Geographic, DeLorme, NAVTEQ, and Esri',
      maxZoom: 13,
      noWrap: true
    }),
    ESRI_NATGEO: tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}', {
      attribution: 'Tiles &copy; Esri &mdash; National Geographic, Esri, DeLorme, NAVTEQ, UNEP-WCMC, USGS, NASA, ESA, METI, NRCAN, GEBCO, NOAA, iPC',
      maxZoom: 16,
      noWrap: true
    }),
    ESRI_TOPO: tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', {
      attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community',
      maxZoom: 16,
      noWrap: true
    }),
    ERI_IMAGERY: tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
      attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
      maxZoom: 17,
      noWrap: true
    })
  };

  public static readonly LAYERS = {
    VERIFIED_MINES_URL: 'https://openmaps.gov.bc.ca/geo/pub/WHSE_MINERAL_TENURE.HSP_MJR_MINES_PERMTTD_AREAS_SP/ows',
    VERIFIED_MINES_LAYER: 'pub:WHSE_MINERAL_TENURE.HSP_MJR_MINES_PERMTTD_AREAS_SP',
    VERIFIED_MINES: tileLayer.wms('https://openmaps.gov.bc.ca/geo/pub/WHSE_MINERAL_TENURE.HSP_MJR_MINES_PERMTTD_AREAS_SP/ows', {
      layers: 'pub:WHSE_MINERAL_TENURE.HSP_MJR_MINES_PERMTTD_AREAS_SP',
      styles: '7738_7739',
      transparent: true,
      format: 'image/png'
    })
  };
}
