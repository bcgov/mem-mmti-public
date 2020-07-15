import { Component, OnDestroy, Input, HostListener, ApplicationRef, Injector, ComponentFactoryResolver, SimpleChanges, Output, EventEmitter, OnChanges, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LeafletMapUtils } from './leaflet-map.utils';
import { Project } from 'app/models/project';
import { ProjectPopupComponent } from 'app/map/leaflet-map/project-popup/project-popup.component';
import { MajorMinesPopupComponent } from 'app/map/leaflet-map/major-mines-popup/major-mines-popup.component';
import { HttpClient } from '@angular/common/http';
import 'leaflet.markercluster';
import * as L from 'leaflet';
import * as _ from 'lodash';

declare module 'leaflet' {
  export interface FeatureGroup<P = any> {
    projectId: number;
  }
  export interface Marker<P = any> {
    projectId: number;
  }
}

const markerIconYellow = L.icon({
  iconUrl: 'assets/images/marker-icon-yellow.svg',
  // Retina Icon is not needed here considering we're using an SVG. Enable if you want to change to a raster asset.
  // iconRetinaUrl: 'assets/images/marker-icon-2x-yellow.svg',
  iconSize: [36, 36],
  iconAnchor: [18, 36],
  tooltipAnchor: [16, -28]
});

@Component({
  selector: 'leaflet-map',
  templateUrl: './leaflet-map.component.html',
  styleUrls: ['./leaflet-map.component.scss']
})

export class LeafletMapComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy {

  @Input() project: Project;
  @Input() projects: Array<Project> = []; // from main map component
  @Input() mapApps; // from main map component
  @Input() filterApps; // from main map component
  @Input() zoom = 6;
  @Input() thumbnail = false;
  @Output() updateVisible = new EventEmitter(); // to projects component


  public loading = false;
  readonly defaultCenter = new L.LatLng(53.7267, -127.6476 );
  readonly defaultBounds = L.latLngBounds([48, -139], [60, -114]); // all of BC
  readonly maxBounds = L.latLngBounds([40, -150], [70, -110]); // all of BC
  public selectedProject: Project = null;
  private map: L.Map = null;
  private markers: Map<String, L.Marker> = new Map();
  private markerClusterGroup = L.markerClusterGroup({
    showCoverageOnHover: false,
    maxClusterRadius: 40, // 0 disables
  });
  private   markerPlaces = L.markerClusterGroup({
    showCoverageOnHover: false,
    maxClusterRadius: 40, // 0 disables
  });
  private baseLayers;
  private overlays;
  constructor(
    private router: ActivatedRoute,
    private appRef: ApplicationRef,
    private injector: Injector,
    private resolver: ComponentFactoryResolver,
    private http: HttpClient
  ) { }

  ngOnInit() {
    if (!this.thumbnail) {
      let routerProjId = this.router.snapshot.paramMap.get('project');
      this.projects.forEach((proj, index) => {
        if (proj.location && proj.location['coordinates'][1] && proj.location['coordinates'][0]) {
          const title = `Project: ${proj.name}`;
          const marker = L.marker(L.latLng(proj.location['coordinates'][1], proj.location['coordinates'][0]), { title: title })
          .setIcon(markerIconYellow)
          .on('click', L.Util.bind(this.onMarkerClick, this, proj));

          marker.projectId = index;
          this.markers.set(proj._id, marker); // save to map obj with id as key
          this.markerClusterGroup.addLayer(marker); // save to marker clusters group

          // did we navigate to the map with a poject defined?
          // if so, zoom to the icon and open the popup
          if (routerProjId && routerProjId === proj._id) {
            this.selectedProject = proj;

            setTimeout(() => {
              this.createMarkerPopup(proj, marker, 10);
            }, 500);
          }
        }
      });
    } else {
      if (this.project.location && this.project.location['coordinates'][1] && this.project.location['coordinates'][0]) {
        const title = `Project: ${this.project.name}`;
        const marker = L.marker(L.latLng(this.project.location['coordinates'][1], this.project.location['coordinates'][0]), { title: title }).setIcon(markerIconYellow);
        marker.projectId = 0;
        this.markers.set(this.project._id, marker); // save to map obj with id as key
        this.markerClusterGroup.addLayer(marker); // save to marker clusters group
      }
    }
  }

  onMarkerClick(...args: any[]) {
    const proj = args[0] as Project;
    const marker = args[1].target as L.Marker;

    this.createMarkerPopup(proj, marker, this.map.getZoom());
  }

  /**
   * Creates a Leaflet popup
   * proj: Project associated with the popup's marker
   * marker: Leaflet Marker (has minimal project data associated with it due to limitations on marker properties)
   * zoom: the zoom level the map should be set to when the popup opens scales from 0 (global) - 18 (local)
   */
  createMarkerPopup(proj: Project, marker: L.Marker, zoom: number) {
    // if there's already a popup, delete it
    let popup = marker.getPopup();

    if (popup) {
      popup.remove();
      marker.unbindPopup();
    }

    let popupOptions = {};
    // Fix for different viewports on scrolling for map display
    if (this.map.getSize().y < 800) {
      popupOptions = {
        className: 'map-popup-content',
        autoPanPaddingTopLeft: L.point(2, 100),
        autoPanPaddingBottomRight: L.point(2, 30)
      };
    } else {
      popupOptions = {
        className: 'map-popup-content',
        autoPanPaddingTopLeft: L.point(80, 200),
        autoPanPaddingBottomRight: L.point(80, 30)
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

    popup = L.popup(popupOptions)
             .setLatLng(marker.getLatLng())
             .setContent(div);

    // bind popup to marker so it automatically closes when marker is removed
    marker.bindPopup(popup).openPopup();

    setTimeout(() => {
      this.map.setView(marker.getLatLng(), zoom);
    }, 100);
  }

  @HostListener('unloaded')
  ngOnDestroy(): void {
    this.map.remove();
  }


  // called when apps list changes
  ngOnChanges(changes: SimpleChanges) {
    if (changes.projects && !changes.projects.firstChange && changes.projects.currentValue && changes.projects.previousValue) {

      const deletedApps = changes.projects.previousValue.filter(x => !changes.projects.currentValue.includes(x)) as Array<Project>;
      const addedApps = changes.projects.currentValue.filter(x => !changes.projects.previousValue.includes(x)) as Array<Project>;

      // (re)draw the matching apps
      this.drawMap(deletedApps, addedApps);
    }
  }

  ngAfterViewInit() {
    let mapOptions = {
      maxZoom: 17,
      zoomControl: false, // will be added manually below
      zoom: this.zoom,
      center: this.defaultCenter,
      maxBounds: this.maxBounds,
      zoomSnap: 0.1, // for greater granularity when fitting bounds
      attributionControl: false,
      maxBoundsViscosity: 0.9,
      crs: L.CRS.EPSG3857
    };

    if (this.thumbnail) {
      mapOptions['dragging'] = false;
    }

    this.map = L.map('map', mapOptions);

    // add base maps layers control
    this.baseLayers = {
      'Ocean Base': LeafletMapUtils.BASEMAPS.ESRI_OCEAN,
      'Nat Geo World Map': LeafletMapUtils.BASEMAPS.ESRI_NATGEO,
      'World Topographic': LeafletMapUtils.BASEMAPS.ESRI_TOPO,
      'World Imagery': LeafletMapUtils.BASEMAPS.ERI_IMAGERY
    };

    this.overlays = {
      'Projects': this.markerClusterGroup,
      'Major Mine Permitted Areas': LeafletMapUtils.LAYERS.VERIFIED_MINES
    };

    // layer control
    if (!this.thumbnail) {
      L.control.layers(this.baseLayers, this.overlays, { position: 'topright' }).addTo(this.map);
      // map attribution
      L.control.attribution({position: 'bottomright'}).addTo(this.map);
      // add scale control
      L.control.scale({ position: 'bottomleft' }).addTo(this.map);
      // add zoom control
      L.control.zoom({ position: 'bottomright' }).addTo(this.map);

      // set the default basemap
      LeafletMapUtils.BASEMAPS.ESRI_TOPO.addTo(this.map);

      this.fitBounds();
    } else {
      // activate major mines layer
      LeafletMapUtils.LAYERS.VERIFIED_MINES.addTo(this.map);
      // zoom to the project bounds
      if (this.project.location) {
        this.map.setView(new L.LatLng(this.project.location['coordinates'][1], this.project.location['coordinates'][0]), 10);
      }
    }

    // set the default basemap, turn on the marker layer
    LeafletMapUtils.BASEMAPS.ESRI_TOPO.addTo(this.map);
    this.markerClusterGroup.addTo(this.map);

    // Creating map onClick listener for identifying WMS layers
    this.map.addEventListener('click', L.Util.bind(this.identifyWmsLayers, this));

    setTimeout(() => {
      this.map.invalidateSize();
    }, 100);
  }

  identifyWmsLayers(e) {
    if (this.map.hasLayer(this.overlays['Major Mine Permitted Areas'])) {
      let bbox   = e.sourceTarget.getBounds().toBBoxString();
      let width  = e.sourceTarget.getSize().x;
      let height = e.sourceTarget.getSize().y;
      let x      = Math.floor(e.sourceTarget.layerPointToContainerPoint(e.layerPoint).x);
      let y      = Math.floor(e.sourceTarget.layerPointToContainerPoint(e.layerPoint).y);

      let wmsGetInfoUrl = `${LeafletMapUtils.LAYERS.VERIFIED_MINES_URL}?service=WMS&version=1.1.1&request=GetFeatureInfo&query_layers=${LeafletMapUtils.LAYERS.VERIFIED_MINES_LAYER}&layers=${LeafletMapUtils.LAYERS.VERIFIED_MINES_LAYER}&bbox=${bbox}&feature_count=1&height=${height}&width=${width}&info_format=application%2Fjson&srs=EPSG%3A4326&x=${x}&y=${y}`;

      this.http.get(wmsGetInfoUrl)
      .subscribe(data => {

        if (data && data['features'] && data['features'].length === 1) {
          let minesFeature = data['features'][0];

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
              autoPanPaddingTopLeft: L.point(2, 100),
              autoPanPaddingBottomRight: L.point(2, 30)
            };
          } else {
            popupOptions = {
              className: 'map-popup-content',
              autoPanPaddingTopLeft: L.point(80, 200),
              autoPanPaddingBottomRight: L.point(80, 30)
            };
          }

          let popup = L.popup(popupOptions)
                       .setLatLng(e.latlng)
                       .setContent(div);

          this.map.openPopup(popup);

          setTimeout(() => {
            this.map.setView(e.latlng, this.map.getZoom());
          }, 100);
        }
      });
    }
  }

  public resetMap() {
    this.map.closePopup();
    this.fitBounds(); // use default bounds
  }

  public onLoadStart() { this.loading = true; }

  public onLoadEnd() { this.loading = false; }

  public drawPlace(places) {
    if (places) {
      places.array.forEach(place => {
        const title = `Place: ${place.fullAddress}`;
        const marker = L.marker(L.latLng(place.geometry['coordinates'][1], place.geometry['coordinates'][0]), { title: title })
        .setIcon(markerIconYellow)
        .on('click', L.Util.bind(this.onMarkerClick, this, place));
        this.markerPlaces.addLayer(marker);
      });
      this.markerPlaces.addTo(this.map);
    }
  }


  /**
  * Removes deleted / draws added projects.
  */
  private drawMap(deletedApps: Project[], addedApps: Project[]) {
    let routerProjId = this.router.snapshot.paramMap.get('project');

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
        const marker = L.marker(L.latLng(proj.location['coordinates'][1], proj.location['coordinates'][0]), { title: title })
        .setIcon(markerIconYellow)
        .on('click', L.Util.bind(this.onMarkerClick, this, proj));

        this.markers.set(proj._id, marker); // save ref to marker
        this.markerClusterGroup.addLayer(marker); // save to marker clusters group

        // did we navigate to the map with a poject defined?
        // if so, zoom to the icon and open the popup
        if (routerProjId && routerProjId === proj._id) {
          this.selectedProject = proj;

          setTimeout(() => {
            // popup requires: projectData, marker object, map zoom level
            this.createMarkerPopup(proj, marker, 10);
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
  // tslint:disable-next-line:member-ordering
  private openPopupDebounced = _.debounce(this.openPopup, 250);

  private openPopup() {
    this.markers.forEach((marker, key) => {
      const app = this.projects.filter(proj => proj._id === key);
      if (app[0]) {
        // If there is only one result from the filter
        // force the popup to auto-display
        if (this.markers.size === 1) {
          this.map.panTo(marker.getLatLng());
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

  private fitBounds(bounds: L.LatLngBounds = null) {
    setTimeout(() => {
      if (bounds && bounds.isValid()) {
        this.map.fitBounds(bounds);
      } else {
        this.map.fitBounds(this.defaultBounds);
      }

      this.map.invalidateSize();
    }, 500);
  }
}
