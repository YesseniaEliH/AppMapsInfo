import { Component, ElementRef, ViewChild } from '@angular/core';
import { Marker } from 'mapbox-gl';
import { Map, LngLat } from 'mapbox-gl'

interface MarkerAndColor {
    color: string;
    marker: Marker;
}

interface PlainMarker{
    color: string;
    lngLat: number[];
}

@Component({
    selector: 'markers-page',
    templateUrl: './markers-page.component.html',
    styleUrl: './markers-page.component.css',
})
export class MarkersPageComponent {

    @ViewChild('map') 
    
    public divMap?: ElementRef;
    public map?:Map;
    public currentLngLat:LngLat = new LngLat(-77.4427, -8.0481);
    public markers: MarkerAndColor[] = [];

    ngAfterViewInit(): void {
        console.log(this.divMap);
        if ( !this.divMap )  throw 'El elemento HTML no fue encontrado';
        
        this.map = new Map({
            container: this.divMap?.nativeElement, // container ID
            style: 'mapbox://styles/mapbox/satellite-v9', // style URL
            center: this.currentLngLat, // starting position [lng, lat]
            zoom: 15, // starting zoom
            minZoom: 3, // min zoom
            antialias: true,
            maxTileCacheSize: 3000,
        });  
        
        this.readFromLocalStorage();
        // const markerHtml = document.createElement('div');
        // markerHtml.innerHTML = 'Yessy'

        // const marker = new Marker({
        //     color: 'green',
        //     element: markerHtml
        // })
        // .setLngLat( this.currentLngLat )
        // .addTo( this.map );

    }

    createMarker(){
        if( !this.map ) return
        const color = '#xxxxxx'.replace(/x/g, y=>(Math.random()*16|0).toString(16));
        const lngLat = this.map.getCenter();

        this.addMarker(lngLat, color);
    }


    addMarker( lngLat: LngLat, color: string){
        if( !this.map ) return

        const marker = new Marker({
            color: color,
            draggable: true,
        })
        .setLngLat( lngLat )
        .addTo( this.map );
        this.markers.push( {
            color,  //color: color x ecma 6
            marker, //marker: marker
        } );
        this.saveToLocalStorage()

        marker.on('dragend', () => {
            this.saveToLocalStorage();
        })
    }


    deleteMarker( index: number ) {
        this.markers[ index ].marker.remove();
        this.markers.splice( index, 1)
    }


    flyTo( marker: Marker ) {
        this.map?.flyTo({
            zoom:14,
            center:marker.getLngLat()
        })
    }

    saveToLocalStorage(){
        const plainMarkers: PlainMarker[] = this.markers.map( ({ color, marker}) => {
            return { 
                color: color,
                lngLat: marker.getLngLat().toArray()
            }
        });
        localStorage.setItem('plainMarkers', JSON.stringify( plainMarkers ));
    }

    readFromLocalStorage(){
        const plainMarkersString = localStorage.getItem('plainMarkers') ?? '[]';
        const plainMarkers: PlainMarker[] = JSON.parse(plainMarkersString);

        plainMarkers.forEach( ({ color, lngLat }) => {
            const [lng, lat] = lngLat;
            const coords = new LngLat(lng, lat); 
            this.addMarker(coords, color)
        })
    }
 }
