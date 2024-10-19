import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { LngLat, Map } from 'mapbox-gl'

@Component({
    templateUrl: './zoom-range-page.component.html',
    styleUrl: './zoom-range-page.component.css',
})
export class ZoomRangePageComponent implements AfterViewInit, OnDestroy {
   
    @ViewChild('map') 
    public divMap?: ElementRef;
    public map?:Map;
    public currentLngLat:LngLat = new LngLat(-77.4427, -8.0481);
    public zoom:number = 10;

    ngAfterViewInit(): void {
        console.log(this.divMap);
        if ( !this.divMap )  throw 'El elemento HTML no fue encontrado';
        
        this.map = new Map({
            container: this.divMap?.nativeElement, // container ID
            style: 'mapbox://styles/mapbox/satellite-v9', // style URL
            center: this.currentLngLat, // starting position [lng, lat]
            zoom: this.zoom, // starting zoom
            minZoom: 3, // min zoom
            antialias: true,
            maxTileCacheSize: 3000,
        });  
        
        this.mapListeners();
    }

    ngOnDestroy(): void {
        // limpieza de listeners
        this.map?.remove();
    }

    mapListeners() {
        if(!this.map) throw 'Mapa no inicializado'
        
        this.map.on('zoom', (event) =>{
            console.log(event);
            this.zoom = this.map!.getZoom();
        }),

        this.map.on('zoomend', (event) =>{
            if (this.map!.getZoom() < 18) return
            this.map!.zoomTo(18)
        });

        this.map.on('move', () =>{
            this.currentLngLat = this.map!.getCenter();
            const { lng,lat } = this.currentLngLat
            console.log(lng,lat);
        });
    }

    zoomIn(){
        this.map?.zoomIn();
    }

    zoomOut(){
        this.map?.zoomOut();
    }

    zoomChanged(value: string){
        this.zoom = Number(value);
        this.map?.zoomTo(this.zoom);

    }
 }
