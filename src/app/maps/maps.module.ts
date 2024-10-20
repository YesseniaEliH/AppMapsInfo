import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http'

import mapboxgl from 'mapbox-gl';
(mapboxgl as any).accessToken = 'pk.eyJ1IjoieWVzc2VuaWFlbGlhbmEiLCJhIjoiY20xYTJ3OHk4MWpsOTJqb2piNjg5N2JmcyJ9.OMXfS7g_FClsLnUPQbf6Tw';

import { MapsRoutingModule } from './maps-routing.module';
import { MiniMapComponent } from './components/mini-map/mini-map.component';
import { SideMenuComponent } from './components/side-menu/side-menu.component';
import { MapsLayoutComponent } from './layout/mapsLayout/mapsLayout.component';
import { FullScreenPageComponent } from './pages/fullScreenPage/full-screen-page.component';
import { MarkersPageComponent } from './pages/markersPage/markers-page.component';
import { PropertiesPageComponent } from './pages/propertiesPage/properties-page.component';
import { ZoomRangePageComponent } from './pages/zoom-range-page/zoom-range-page.component';




@NgModule({
  declarations: [
    MiniMapComponent,
    SideMenuComponent,
    MapsLayoutComponent,
    FullScreenPageComponent,
    MarkersPageComponent,
    PropertiesPageComponent,
    ZoomRangePageComponent
  ],
  imports: [
    CommonModule,
    MapsRoutingModule,
    HttpClientModule,
  ]
})
export class MapsModule { }
