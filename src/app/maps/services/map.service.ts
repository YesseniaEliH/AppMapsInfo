import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LngLat, Map } from 'mapbox-gl';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  private map : Map | undefined;
  
  constructor(private readonly http: HttpClient) {}
  

  
  toLoadMap(referencia:any, capaBase:string='mapbox://styles/mapbox/satellite-v9', latitudLongitud:LngLat, zoom:number=3) {
   if ( !referencia )  throw new Error('El elemento HTML no fue encontrado');
   this.map = new Map({
     container: referencia,
     style: capaBase,
     center: latitudLongitud,
     zoom:zoom,
     minZoom:3,
     antialias: true,
     maxTileCacheSize: 3000,
   });
  }
}
