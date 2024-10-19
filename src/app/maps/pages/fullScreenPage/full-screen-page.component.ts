import { AfterViewInit, Component, ElementRef, ViewChild, ViewEncapsulation } from '@angular/core';

import { Map } from 'mapbox-gl';

import {kml}  from '@tmcw/togeojson';
import JSZip from 'jszip';


@Component({
    selector: 'full-screen-page',
    templateUrl: './full-screen-page.component.html',
    styleUrl: './full-screen-page.component.css',
})
export class FullScreenPageComponent implements AfterViewInit { 
    @ViewChild('map') 
    public divMap?: ElementRef;
    private map:any;
   
    ngAfterViewInit(): void {
        console.log(this.divMap);
        if ( !this.divMap )  throw 'El elemento HTML no fue encontrado';
        
        this.map = new Map({
            container: this.divMap?.nativeElement, // container ID
            style: 'mapbox://styles/mapbox/satellite-v9', // style URL
            center: [-77.4427, -8.0481], // starting position [lng, lat]
            zoom: 15, // starting zoom
            minZoom: 3, // min zoom
            antialias: true,
            maxTileCacheSize: 3000,
        });  
        
    }
    // Método para agregar el archivo KML al mapa
    private addKmlToGeoJsonToMap(kmlContent: string): void {
        const kmlDoc = new DOMParser().parseFromString(kmlContent, 'text/xml');

        const geoJjson = kml(kmlDoc);
            this.map.addSource('poligonos', {
              type: 'geojson',
              data: geoJjson
            });
            this.map.addLayer({
              id: 'poligonos-layer',
              type: 'fill',
              source: 'poligonos',
              layout: {},
              paint: {
                'fill-color': '#888888',
                'fill-opacity': 0.4
              }
            });
    }
  
  
  // Manejo del archivo KMZ
  handleFileInput(event: Event):void {
    const input = event.target as HTMLInputElement | null;
   // Verifica si el input y los archivos existen
   if (input && input.files && input.files.length > 0) {
    const file = input.files[0];
  
    if (file && file.name.endsWith('.kmz')) {
      this.processKmzFile(file); // Procesa el archivo si es KMZ
    } else {
      alert('Por favor, selecciona un archivo KMZ.');
    }
  } else {
    alert('No se seleccionó ningún archivo.');
  }
  }
  
  // Descomprimir KMZ y obtener el archivo KML
  async processKmzFile(file: File) {
    const zip = new JSZip();  // Aquí ahora funciona correctamente
    const content = await zip.loadAsync(file);
    const kmlFile = Object.keys(content.files).find(fileName => fileName.endsWith('.kml'));
    if (kmlFile) {
      const kmlContent = await content.files[kmlFile].async('string');
    //   console.log('contenido kml',kmlContent);
  
      this.addKmlToGeoJsonToMap(kmlContent);
    } else {
      alert('No se encontró un archivo KML dentro del KMZ.');
    }
  }
}
