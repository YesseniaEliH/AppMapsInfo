import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http'

import mapboxgl from 'mapbox-gl';
(mapboxgl as any).accessToken = 'pk.eyJ1IjoieWVzc2VuaWFlbGlhbmEiLCJhIjoiY20xYTJ3OHk4MWpsOTJqb2piNjg5N2JmcyJ9.OMXfS7g_FClsLnUPQbf6Tw';

import { MapsRoutingModule } from './maps-routing.module';
import { MapsLayoutComponent } from './layout/mapsLayout/mapsLayout.component';

import { CdkDrag} from '@angular/cdk/drag-drop';
import { SearchInMapsComponent } from "./components/searchInMaps/searchInMaps.component";
import { TableComponent } from './components/table/table.component';
import { SideMenuComponent } from './components/side-menu/side-menu.component';
import { FullScreenPageComponent } from './pages/fullScreenPage/full-screen-page.component';
import { MapService } from './services/map.service';

@NgModule({
  declarations: [
    MapsLayoutComponent,
    SideMenuComponent,
    FullScreenPageComponent
  ],
  imports: [
    CommonModule,
    MapsRoutingModule,
    HttpClientModule,
    CdkDrag,
    SearchInMapsComponent,
    TableComponent,
  ],
  providers: [ 
    MapService, 
  ]
})
export class MapsModule { }
