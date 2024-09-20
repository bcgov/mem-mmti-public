import { Component, Input, ApplicationRef, Injector, ComponentFactoryResolver, SimpleChanges, Output, EventEmitter, OnChanges, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LeafletMapUtils } from './leaflet-map.utils';
import { Project } from '@models/project';
import { ProjectPopupComponent } from './project-popup/project-popup.component';
import { MajorMinesPopupComponent } from './major-mines-popup/major-mines-popup.component';
import { HttpClient } from '@angular/common/http';
import 'leaflet.markercluster';
import * as _ from 'lodash';
import { GeoCodePopupComponent } from './geocode-popup/geocode-popup.component';
import { marker, latLng, Map as LeafletMap, control, popup, markerClusterGroup, Util, Marker, latLngBounds, icon, point, CRS, geoJSON, MapOptions, LatLng, LatLngBounds, LayersObject } from 'leaflet';

declare module 'leaflet' {
  export interface FeatureGroup {
    projectId: number;
  }
  export interface Marker {
    projectId: number;
  }

  export interface Layer {
    getLayers();
  }

  type LayersObject = Record<string,Layer>;

}

const markerIconYellow = icon({
  iconUrl: 'assets/images/marker-icon-yellow.svg',
  // Retina Icon is not needed here considering we're using an SVG. Enable if you want to change to a raster asset.
  // iconRetinaUrl: 'assets/images/marker-icon-2x-yellow.svg',
  iconSize: [36, 36],
  iconAnchor: [18, 36],
  tooltipAnchor: [16, -28]
});

const markerGeocode = icon({
  iconUrl: 'assets/images/marker-icon-blue.svg',
  iconSize: [36, 36],
  iconAnchor: [18, 36],
  tooltipAnchor: [16, -28]
});

Marker.prototype.options.icon = markerGeocode;

@Component({
  selector: 'app-leaflet-map',
  templateUrl: './leaflet-map.component.html',
  styleUrls: ['./leaflet-map.component.scss']
})

export class LeafletMapComponent implements OnInit, OnChanges {
  @Input() project: Project;
  @Input() projects: Project[] = []; // from main map component
  @Input() mapApps: Project[] = [] // from main map component
  @Input() filterApps: Project[] = []; // from main map component
  @Input() zoom = 6;
  @Input() thumbnail = false;
  @Output() updateVisible = new EventEmitter(); // to projects component

  public loading = false;
  readonly defaultCenter = latLng(53.7267, -127.6476 );
  readonly defaultBounds = latLngBounds([48, -139], [60, -114]); // all of BC
  readonly maxBounds = latLngBounds([40, -150], [70, -110]); // all of BC
  public selectedProject: Project = null;
  private markers = new Map<string, L.Marker>();
  private markerClusterGroup = markerClusterGroup({
    showCoverageOnHover: false,
    maxClusterRadius: 40, // 0 disables
  });
  private placeLayer = null;
  private markerPlaces = markerClusterGroup({
    showCoverageOnHover: false,
    maxClusterRadius: 40, // 0 disables
  });
  constructor(
    private router: ActivatedRoute,
    private appRef: ApplicationRef,
    private injector: Injector,
    private resolver: ComponentFactoryResolver,
    private http: HttpClient
  ) { }

  public fitBounds: LatLngBounds;
  public baseLayers: LayersObject;
  private overlays: LayersObject;
  public center: LatLng;
  public options: MapOptions;
  private map: LeafletMap;

  ngOnInit() {
    this.baseLayers = {
      'Ocean Base': LeafletMapUtils.BASEMAPS.ESRI_OCEAN,
      'Nat Geo World Map': LeafletMapUtils.BASEMAPS.ESRI_NATGEO,
      'World Topographic': LeafletMapUtils.BASEMAPS.ESRI_TOPO,
      'World Imagery': LeafletMapUtils.BASEMAPS.ERI_IMAGERY
    };

    this.overlays = {
      'Projects': this.markerClusterGroup,
      'Major Mine Permitted Areas': LeafletMapUtils.LAYERS.VERIFIED_MINES,
      'Places': this.markerPlaces
    };

    this.options = {
      layers: [LeafletMapUtils.BASEMAPS.ESRI_TOPO],
      maxZoom: 17,
      attributionControl: false,
      maxBounds: this.maxBounds,
      zoomSnap: 0.1,
      zoom: this.zoom,
      zoomControl: false,
      center: this.defaultCenter,
      maxBoundsViscosity: 0.9,
      crs: CRS.EPSG3857, //Co-ordinate system
      dragging: this.thumbnail? false : true
    }
  }

  onMarkerClick(...args: any[]) {
    const proj = args[0] as Project;
    const marker = args[1].target as Marker;
    this.createMarkerPopup(proj, marker, this.zoom);
  }

  /**
   * Creates a Leaflet popup
   * proj: Project associated with the popup's marker
   * marker: Leaflet Marker (has minimal project data associated with it due to limitations on marker properties)
   * zoom: the zoom level the map should be set to when the popup opens scales from 0 (global) - 18 (local)
   */
  createMarkerPopup(proj: Project, m: Marker, zoom: number) {
    // if there's already a popup, delete it
    let pop = m.getPopup();

    if (pop) {
      pop.remove();
      m.unbindPopup();
    }

    let popupOptions = {
      className: 'map-popup-content',
      autoPanPaddingTopLeft: point(2, 100),
      autoPanPaddingBottomRight: point(2, 30)
    };
    // Fix for different viewports on scrolling for map display
    if (this.map.getSize().y > 800) {
      popupOptions = {
        className: 'map-popup-content',
        autoPanPaddingTopLeft: point(80, 200),
        autoPanPaddingBottomRight: point(80, 30)
      };
    } 

    // compile marker popup component
    const compFactory = this.resolver.resolveComponentFactory(ProjectPopupComponent);
    const compRef = compFactory.create(this.injector);
    compRef.instance.project = proj;
    compRef.instance.parentMap = this.map;
    this.appRef.attachView(compRef.hostView);
    compRef.onDestroy(() => this.appRef.detachView(compRef.hostView));
    const div = document.createElement('div').appendChild(compRef.location.nativeElement);

    pop = popup(popupOptions)
      .setLatLng(m.getLatLng())
      .setContent(div);

    // bind popup to marker so it automatically closes when marker is removed
    m.bindPopup(pop).openPopup();

    this.map.setView(m.getLatLng(), zoom);
    
  }
    
  // called when apps list changes
  ngOnChanges(changes: SimpleChanges) {
    if (changes['projects'] && !changes['projects'].firstChange && changes['projects'].currentValue && changes['projects'].previousValue) {

      const deletedApps = changes['projects'].previousValue.filter(x => !changes['projects'].currentValue.includes(x)) as Project[];
      const addedApps = changes['projects'].currentValue.filter(x => !changes['projects'].previousValue.includes(x)) as Project[];

      // (re)draw the matching apps
      if(this.map != null){
        this.drawMap(deletedApps, addedApps);
      } 
    }
  }

  onMapReady(map: LeafletMap) {
    this.map = map;

    if (!this.thumbnail) {
      map.addControl(control.attribution({position: 'bottomright'}));
      map.addControl(control.zoom({position: 'bottomright'}));
      map.addControl(control.scale({position: 'bottomleft'}));
      map.addControl(control.layers(this.baseLayers,this.overlays));

      const routerProjId = this.router.snapshot.paramMap.get('project');

      this.projects.forEach((proj, index) => {
        if (proj.hasCoordinates()) {
          const title = `Project: ${proj.name}`;
          const m = marker(proj.getCoordinates(), { title: title })
          .setIcon(markerIconYellow)
          .on('click', Util.bind(this.onMarkerClick, this, proj, map));
          m.projectId = index;
          this.markers.set(proj._id, m); // save to map obj with id as key
          this.markerClusterGroup.addLayer(m); // save to marker clusters group

          // did we navigate to the map with a poject defined?
          // if so, zoom to the icon and open the popup
          if (routerProjId && routerProjId === proj._id) {
            this.selectedProject = proj;
            this.createMarkerPopup(proj, m, 10);
          }
        }
      });
      this.map.addEventListener('click', Util.bind(this.identifyWmsLayers, this));
      this.checkBounds();
    } else {
      if (this.project.hasCoordinates()) {
        const title = `Project: ${this.project.name}`;
        const m = marker(this.project.getCoordinates(), { title: title }).setIcon(markerIconYellow);
        this.map.setView(m.getLatLng(),9);   
        m.projectId = 0;
        this.markers.set(this.project._id, m); // save to map obj with id as key
        this.markerClusterGroup.addLayer(m); // save to marker clusters group
      }
    }

    this.markerClusterGroup.addTo(this.map);
    this.markerPlaces.addTo(this.map);
    //this.overlays['Major Mine Permitted Areas'].addTo(this.map)
  }

  
  identifyWmsLayers(e) {
    if (this.map.hasLayer(this.overlays['Major Mine Permitted Areas'])) {
      const bbox   = e.sourceTarget.getBounds().toBBoxString();
      const width  = e.sourceTarget.getSize().x;
      const height = e.sourceTarget.getSize().y;
      const x = Math.floor(e.sourceTarget.layerPointToContainerPoint(e.layerPoint).x);
      const y = Math.floor(e.sourceTarget.layerPointToContainerPoint(e.layerPoint).y);

      const wmsGetInfoUrl = `${LeafletMapUtils.LAYERS.VERIFIED_MINES_URL}?service=WMS&version=1.1.1&request=GetFeatureInfo&query_layers=${LeafletMapUtils.LAYERS.VERIFIED_MINES_LAYER}&layers=${LeafletMapUtils.LAYERS.VERIFIED_MINES_LAYER}&bbox=${bbox}&feature_count=1&height=${height}&width=${width}&info_format=application%2Fjson&srs=EPSG%3A4326&x=${x}&y=${y}`;

      this.http.get(wmsGetInfoUrl)
      .subscribe(data => {

        if (data && data['features'] && data['features'].length === 1) {
          const minesFeature = data['features'][0];

          const compFactory = this.resolver.resolveComponentFactory(MajorMinesPopupComponent);
          const compRef = compFactory.create(this.injector);
          compRef.instance.mine = minesFeature.properties;
          compRef.instance.parentMap = this.map;
          compRef.instance.mineLocation = e.latlng;
          this.appRef.attachView(compRef.hostView);
          compRef.onDestroy(() => this.appRef.detachView(compRef.hostView));
          const div = document.createElement('div').appendChild(compRef.location.nativeElement);

          let popupOptions = {};
          if (this.map.getSize().y < 800) {
            popupOptions = {
              className: 'map-popup-content',
              autoPanPaddingTopLeft: point(2, 100),
              autoPanPaddingBottomRight: point(2, 30)
            };
          } else {
            popupOptions = {
              className: 'map-popup-content',
              autoPanPaddingTopLeft: point(80, 200),
              autoPanPaddingBottomRight: point(80, 30)
            };
          }

          const p = popup(popupOptions)
            .setLatLng(e.latlng)
            .setContent(div);

          this.map.openPopup(p);
          this.map.setView(e.latlng, this.map.getZoom());
        }
      });
    }
  }

   /**
   * Creates a Leaflet popup for places returned by BC Geocoder
   * layer: A GeoJson layer group containing point locations returned by GeoCoder search
   */
  
   createGeocodePopup(layer: L.Layer) {
    // if there's already a popup, delete it
    let pop = layer.getPopup();

    if (pop) {
      pop.remove();
      layer.unbindPopup();
    }

    let popupOptions = {};
    // Fix for different viewports on scrolling for map display
    if (this.map.getSize().y < 800) {
      popupOptions = {
        className: 'map-popup-content',
        autoPanPaddingTopLeft: point(2, 100),
        autoPanPaddingBottomRight: point(2, 30)
      };
    } else {
      popupOptions = {
        className: 'map-popup-content',
        autoPanPaddingTopLeft: point(80, 200),
        autoPanPaddingBottomRight: point(80, 30)
      };
    }

    const layers = layer.getLayers();
    layers.forEach(lyr => {
      // compile marker popup component
      const compFactory = this.resolver.resolveComponentFactory(GeoCodePopupComponent);
      const compRef = compFactory.create(this.injector);
      compRef.instance.layer = lyr['feature'];
      compRef.instance.parentMap = this.map;
      this.appRef.attachView(compRef.hostView);
      compRef.onDestroy(() => this.appRef.detachView(compRef.hostView));
      const div = document.createElement('div').appendChild(compRef.location.nativeElement);

      pop = popup(popupOptions)
             .setLatLng(lyr.getLatLng())
             .setContent(div);
      // bind popup to marker so it automatically closes when marker is removed
      lyr.bindPopup(pop).openPopup();
      this.markerPlaces.addLayer(lyr);
    });

      // open popup to 1st feature it is always the highest score for search results
      if (layers && layers[0]) {
        // (coords, zoom level)
        this.map.setView(layers[0].getLatLng(), 13);
        layers[0].openPopup();
      } else {
        this.resetMap();
      }
  }

  public resetMap() {
    this.map.closePopup();
    this.checkBounds(); // use default bounds
  }
  
  public onLoadStart() { this.loading = true; }

  public onLoadEnd() { this.loading = false; }

  // draw featurecollection returned by geocoder
  public drawPlace(places) {
    if (this.placeLayer) {
      // remove previous layer
      this.map.removeLayer(this.placeLayer);
      this.markerPlaces.removeLayer(this.placeLayer);
    }
    this.placeLayer = geoJSON(places).addTo(this.map);
    this.createGeocodePopup(this.placeLayer);
  }

  /**
  * Removes deleted / draws added projects.
  */
 
  private drawMap(deletedApps: Project[], addedApps: Project[]) {
    const routerProjId = this.router.snapshot.paramMap.get('project');

    // remove deleted apps from list and map
    deletedApps.forEach(proj => {
      if (this.markers.has(proj._id)) {
        this.markerClusterGroup.removeLayer(this.markers.get(proj._id));
        this.markers.delete(proj._id);
      }
    });

    // draw added apps
    addedApps.forEach((proj) => {
      if (proj.location && proj.location['coordinates'][1] && proj.location['coordinates'][0]) {
        const title = `Project: ${proj.name}`;
        // marker object has limited attributes, cannot bind directly to project
        const m = marker(latLng(proj.location['coordinates'][1], proj.location['coordinates'][0]), { title: title })
        .setIcon(markerIconYellow)
        .on('click', Util.bind(this.onMarkerClick, this, proj));

        this.markers.set(proj._id, m); // save ref to marker
        this.markerClusterGroup.addLayer(m); // save to marker clusters group

        // did we navigate to the map with a poject defined?
        // if so, zoom to the icon and open the popup
        if (routerProjId && routerProjId === proj._id) {
          this.selectedProject = proj;

          setTimeout(() => {
            // popup requires: projectData, marker object, map zoom level
            this.createMarkerPopup(proj, m, 10);
          }, 500);
        }
      }
    });

    // set visible apps
    this.openPopupDebounced();
  }

  /**
   * Sets which apps are currently visible.
   * Actual function executes no more than once every 250ms.
   */
  
   private openPopupDebounced = _.debounce(this.openPopup, 250);

  private openPopup() {
    this.markers.forEach((marker, key) => {
      const app = this.projects.filter(proj => proj._id === key);
      if (app[0]) {
        // If there is only one result from the filter
        // force the popup to auto-display
        if (this.markers.size === 1) {
          //this.map.panTo(marker.getLatLng());
          this.center = marker.getLatLng();
          if (marker.getPopup()) {
            marker.openPopup();
          } else {
            // create the popup, projectData, marker object, map zoom level
            this.createMarkerPopup(app[0], marker, 9);
            marker.openPopup();
          }
        }
      }
    });
  }

  private checkBounds(bounds: LatLngBounds = null) {
      if (bounds && bounds.isValid()) {
        this.fitBounds = bounds;
      } else {
        this.fitBounds = this.defaultBounds;
      }
      this.map.invalidateSize();
  }

}
