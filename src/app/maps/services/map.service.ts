import { Injectable } from '@angular/core';
import mapboxgl, {Map, LngLat} from 'mapbox-gl';
import { environment } from './../../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  map!: Map;
  mapStyle:string = 'mapbox://styles/mapbox/satellite-v9';
  lat: number = -8.062239991124962;
  lng:number = -77.4454932358746;
  zoom:number = 3
  public currentLngLat:LngLat | undefined;

  constructor(){
    mapboxgl.accessToken = environment.mapbox_key;
  }

  toLoadMap() {
    this.map = new Map({
      container: 'map',
      style: this.mapStyle,
      zoom: this.zoom,
      minZoom:3,
      center: [this.lng, this.lat],
      antialias: true,
      maxTileCacheSize: 3000,
    })
    // this.map.addControl(new mapboxgl.NavigationControl());
  }
  editMap(zoom?:number,long?:any,lat?:any){
    // this.currentLngLat = (!lat&&!long)?new LngLat(this.lng, this.lat):new LngLat(long,lat);

    this.map = new mapboxgl.Map({
      container: 'map',
      style: this.mapStyle,
      zoom: !zoom ? this.zoom : zoom,
      minZoom:3,
      center:this.currentLngLat,
      antialias: true,
      maxTileCacheSize: 3000,
    });

  }

  zoomIn(){
    this.map?.zoomIn();
    console.log('zi= ',this.map.zoomIn());
  }
  zoomOut(){
    this.map.zoomOut();
  }

}
