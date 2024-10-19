import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Map, Marker } from 'mapbox-gl'

@Component({
  selector: 'maps-mini-map',
  templateUrl: './mini-map.component.html',
  styleUrl: './mini-map.component.css'
})
export class MiniMapComponent {
  @Input() lngLat?: [number, number];
  @ViewChild('map') divMap?:ElementRef;

  ngAfterViewInit() {
    if( !this.divMap?.nativeElement ) throw "Map div not found";
    if( !this.lngLat ) throw "LngLat can`t be null";

    const map = new Map({
      container: this.divMap?.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/satellite-v9', // style URL
      center: this.lngLat, // starting position [lng, lat]
      zoom: 15, // starting zoom
      minZoom: 3, // min zoom
      antialias: true,
      maxTileCacheSize: 3000,
      interactive:false, 
    });

    new Marker()
    .setLngLat( this.lngLat )
    .addTo(map);
  }

}
