import { Component, AfterViewInit, OnChanges, OnDestroy, Input, OnInit } from '@angular/core';
import { LeafletMapUtils } from './leaflet-map.utils';
import { Project } from 'app/models/project';
import { ProjectService } from 'app/services/project.service';

import 'leaflet';
import 'leaflet.markercluster';

declare module 'leaflet' {
  export interface FeatureGroup<P = any> {
    projectId: number;
  }
  export interface Marker<P = any> {
    projectId: number;
  }
}

const L = window['L'];

const markerIconYellow = L.icon({
  iconUrl: 'assets/images/marker-icon-yellow.svg',
  // Retina Icon is not needed here considering we're using an SVG. Enable if you want to change to a raster asset.
  // iconRetinaUrl: 'assets/images/marker-icon-2x-yellow.svg',
  iconSize: [36, 36],
  iconAnchor: [18, 36],
  tooltipAnchor: [16, -28]
});

/*const markerIconYellowLg = L.icon({
  iconUrl: 'assets/images/marker-icon-yellow-lg.svg',
  // Retina Icon is not needed here considering we're using an SVG. Enable if you want to change to a raster asset.
  // iconRetinaUrl: 'assets/images/marker-icon-yellow-lg.svg',
  iconSize: [48, 48],
  iconAnchor: [24, 48],
  // popupAnchor: [1, -34], // TODO: update, if needed
  // tooltipAnchor: [16, -28] // TODO: update, if needed
}); */

@Component({
  selector: 'leaflet-map',
  templateUrl: './leaflet-map.component.html',
  styleUrls: ['./leaflet-map.component.scss']
})

export class LeafletMapComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy {

  @Input() project: Project;
  @Input() zoom = 6;
  @Input() thumbnail = false;

  public loading = false;
  readonly defaultBounds = L.latLngBounds([48, -139], [60, -114]); // all of BC
  readonly maxBounds = L.latLngBounds([40, -150], [70, -110]); // all of BC
  public baseLayerName = 'World Topographic';
  public projects: Array<Project> = [];
  private map: L.Map = null;
  private markerList: Array<L.Marker> = [];
  private markerClusterGroup = L.markerClusterGroup({
    showCoverageOnHover: false,
    maxClusterRadius: 40, // 0 disables
  });

  constructor(private projectService: ProjectService
  ) { }

  ngOnInit() {
    // Load the projects. If this is a thumbnail with a project set, ignore
    if (!this.thumbnail) {
      this.projectService.getAll().subscribe(results => {
        if (results) {
          this.projects = results;

          // add data to projects layer
          this.projects.forEach((proj, index) => {
            if (proj.latitude && proj.longitude) {
              const title = `Project: ${proj.name}`;
              const marker = L.marker(L.latLng(proj.latitude, proj.longitude), { title: title })
              .setIcon(markerIconYellow)
              .on('click', L.Util.bind(this.onMarkerClick, this, proj));

              marker.projectId = index;
              this.markerList.push(marker); // save to list
              this.markerClusterGroup.addLayer(marker); // save to marker clusters group
            }
          });
        }
      });
    } else {
      if (this.project.latitude && this.project.longitude) {
        const title = `Project: ${this.project.name}`;
        const marker = L.marker(L.latLng(this.project.latitude, this.project.longitude), { title: title }).setIcon(markerIconYellow);
        marker.projectId = 0;
        this.markerList.push(marker); // save to list
        this.markerClusterGroup.addLayer(marker); // save to marker clusters group
      }
    }
  }

  onMarkerClick(...args: any[]) {
    const proj = args[0] as Project;
    const marker = args[1].target as L.Marker;

    this.createMarkerPopup(proj, marker);
  }

  createMarkerPopup(proj: Project, marker: L.Marker) {
    // this.applist.toggleCurrentApp(app); // update selected item in app list

    // if there's already a popup, delete it
    let popup = marker.getPopup();
    if (popup) {
      const wasOpen = popup.isOpen();
      popup.remove();
      marker.unbindPopup();
      if (wasOpen) { return; }
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

    popup = L.popup(popupOptions)
      .setLatLng(marker.getLatLng())
      .setContent(`<h1>I am a popup for ${proj.name}</h1>`);

    // bind popup to marker so it automatically closes when marker is removed
    marker.bindPopup(popup).openPopup();
  }

  ngOnDestroy(): void {
  }

  ngOnChanges(): void {
  }

  ngAfterViewInit() {
    const self = this; // for closure function below

    // custom control to reset map view
    const resetViewControl = L.Control.extend({
      options: {
        position: 'bottomright'
      },
      onAdd: function () {
        const element = L.DomUtil.create('button');

        element.title = 'Reset view';
        element.innerText = 'refresh'; // material icon name
        element.onclick = () => self.fitBounds();
        element.className = 'material-icons map-reset-control';

        // prevent underlying map actions for these events
        L.DomEvent.disableClickPropagation(element); // includes double-click
        L.DomEvent.disableScrollPropagation(element);

        return element;
      },
    });

    let mapOptions = {
      maxZoom: 17,
      zoomControl: false, // will be added manually below
      maxBounds: this.maxBounds,
      zoomSnap: 0.1, // for greater granularity when fitting bounds
      attributionControl: false,
      maxBoundsViscosity: 0.9,
      crs: L.CRS.EPSG3857
    };

    if (this.thumbnail) {
      mapOptions['dragging'] = false;
      mapOptions['zoom'] = false;
    }

    this.map = L.map('map', mapOptions);

    // add base maps layers control
    const baseLayers = {
      'Ocean Base': LeafletMapUtils.BASEMAPS.ESRI_OCEAN,
      'Nat Geo World Map': LeafletMapUtils.BASEMAPS.ESRI_NATGEO,
      'World Topographic': LeafletMapUtils.BASEMAPS.ESRI_TOPO,
      'World Imagery': LeafletMapUtils.BASEMAPS.ERI_IMAGERY
    };

    const overlays = {
      'Projects': this.markerClusterGroup,
      'Verified Mines': LeafletMapUtils.LAYERS.VERIFIED_MINES
    };

    // layer control
    if (!this.thumbnail) {
      L.control.layers(baseLayers, overlays, { position: 'topright' }).addTo(this.map);
      // map attribution
      L.control.attribution({position: 'bottomright'}).addTo(this.map);
      // add scale control
      L.control.scale({ position: 'bottomleft' }).addTo(this.map);
      // add zoom control
      L.control.zoom({ position: 'bottomright' }).addTo(this.map);
      // add reset view control
      this.map.addControl(new resetViewControl());

      this.markerClusterGroup.addTo(this.map);
      LeafletMapUtils.BASEMAPS.ESRI_TOPO.addTo(this.map);

    } else {
      LeafletMapUtils.BASEMAPS.ESRI_TOPO.addTo(this.map);
    }

    // load base layer
    for (const key of Object.keys(baseLayers)) {
      if (key === this.baseLayerName) {
        this.map.addLayer(baseLayers[key]);
        break;
      }
    }

    // save any future base layer changes
    this.map.on('baselayerchange', function (e: L.LayersControlEvent) {
       this.baseLayerName = e.name;
    }, this);

    this.fitBounds();
    this.map.invalidateSize();
  }

  private fitBounds(bounds: L.LatLngBounds = null) {
    if (bounds && bounds.isValid()) {
      this.map.fitBounds(bounds);
    } else {
      this.map.fitBounds(this.defaultBounds);
    }
  }
}
