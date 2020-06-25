import { Component, AfterViewInit, OnDestroy, Input, OnInit, HostListener, ApplicationRef, Injector, ComponentFactoryResolver } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LeafletMapUtils } from './leaflet-map.utils';
import { Project } from 'app/models/project';
import { ProjectService } from 'app/services/project.service';
import { ProjectPopupComponent } from 'app/map/leaflet-map/project-popup/project-popup.component';

import 'leaflet.markercluster';
import * as L from 'leaflet';

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

export class LeafletMapComponent implements OnInit, AfterViewInit, OnDestroy {

  @Input() project: Project;
  @Input() zoom = 6;
  @Input() thumbnail = false;

  public loading = false;
  readonly defaultBounds = L.latLngBounds([48, -139], [60, -114]); // all of BC
  readonly maxBounds = L.latLngBounds([40, -150], [70, -110]); // all of BC
  public projects: Array<Project> = [];
  public selectedProject: Project = null;
  private map: L.Map = null;
  private markerList: Array<L.Marker> = [];
  private markerClusterGroup = L.markerClusterGroup({
    showCoverageOnHover: false,
    maxClusterRadius: 40, // 0 disables
  });

  constructor(
    private projectService: ProjectService,
    private router: ActivatedRoute,
    private appRef: ApplicationRef,
    private injector: Injector,
    private resolver: ComponentFactoryResolver
  ) { }

  ngOnInit() {
    // Load the projects. If this is a thumbnail with a project set, ignore
    if (!this.thumbnail) {

      let routerProjId = this.router.snapshot.paramMap.get('project');

      this.projectService.getAll().subscribe(results => {
        if (results && results.length > 0) {
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

              // did we navigate to the map with a poject defined?
              // if so, zoom to the icon and open the popup
              if (routerProjId && routerProjId === proj._id) {
                this.selectedProject = proj;
                this.map.setView(new L.LatLng(proj.latitude, proj.longitude), 10);

                setTimeout(() => {
                  this.createMarkerPopup(proj, marker);
                }, 1000);
              }
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
  }

  @HostListener('unloaded')
  ngOnDestroy(): void {
    this.map.remove();
  }

  ngAfterViewInit() {
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

      // set the default basemap
      LeafletMapUtils.BASEMAPS.ESRI_TOPO.addTo(this.map);

      this.fitBounds();
    } else {
      // zoom to the project bounds
      this.map.setView(new L.LatLng(this.project.latitude, this.project.longitude), 10);
    }

    // set the default basemap, turn on the marker layer
    LeafletMapUtils.BASEMAPS.ESRI_TOPO.addTo(this.map);
    this.markerClusterGroup.addTo(this.map);

    setTimeout(() => {
      this.map.invalidateSize();
    }, 100);
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
