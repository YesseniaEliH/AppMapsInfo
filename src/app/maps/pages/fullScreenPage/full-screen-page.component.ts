import { AfterViewInit, Component, ElementRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';

import * as turf from '@turf/turf';
import { Feature, Geometry } from 'geojson';
import { Map, Marker, LngLat, Popup, LngLatLike } from 'mapbox-gl';

import {kml}  from '@tmcw/togeojson';
import JSZip from 'jszip';


@Component({
    selector: 'full-screen-page',
    templateUrl: './full-screen-page.component.html',
    styleUrl: './full-screen-page.component.css',
})
export class FullScreenPageComponent implements AfterViewInit { 
    constructor(private http: HttpClient, private fb: FormBuilder) {
      // Inicializar el formulario
      this.popupForm = this.fb.group({
        nombre: [''],
        descripcion: ['']
      });
    }
    
    @ViewChild('map') 
    
    public divMap?: ElementRef;
    private map:any;
    public archivoCapaCorteColorado: File = new File([], "") || null;
    public currentLngLat:LngLat = new LngLat(-77.44549323587496, -8.062239991124962);
    public lngLatLike:LngLatLike = {lng:0,lat:0}; ;
    public popupForm!: FormGroup;
    public nombreComponenteActual: string = "";

   
    ngAfterViewInit(): void {
        console.log(this.divMap);
        if ( !this.divMap )  throw 'El elemento HTML no fue encontrado';
        
        this.map = new Map({
            container: this.divMap?.nativeElement,
            style: 'mapbox://styles/mapbox/satellite-v9',
            center: this.currentLngLat, 
            zoom: 15,
            minZoom: 3,
            antialias: true,
            maxTileCacheSize: 3000,
        });  
      this.map.on('load', () => {
        this.cargarCapaKmz();
        this.setupPolygonClick()
      });
        
    }


      guardarDatosComponente(): void {
        console.log('Formulario enviado:', this.popupForm.value);
      }

    openPopupOnPolygon(): void {
      this.agregarMarcador(this.lngLatLike)
      const popupContainer = document.getElementById('popup-container') as HTMLDivElement;
      const title = document.getElementById('popup-title') as HTMLHeadingElement;
      
      title.textContent = this.nombreComponenteActual; 
      popupContainer.style.display = 'block';
      const form = document.getElementById('popup-form') as HTMLFormElement;
      form.onsubmit = (event) => {
        
        event.preventDefault();
        this.guardarDatosComponente(); // Tu lógica para guardar los datos
        popupContainer.style.display = 'none'; // Ocultar después de guardar
      };
    }


  private setupPolygonClick(): void {
    this.map.on('click', 'poligonos-layer', (e:any) => {
      const features = this.map.queryRenderedFeatures(e.point, {
        layers: ['poligonos-layer'] // Capa a la que quieres hacer clic
      });

      if (features.length > 0) {
        this.nombreComponenteActual = features[0].properties.name;
        const centroide = turf.centroid(features[0]);
        const coordinates = centroide.geometry.coordinates;
        
        this.lngLatLike = { lng: coordinates[0], lat: coordinates[1] };
        console.log( features[0].geometry.coordinates);
        this.openPopupOnPolygon();
      }
    });

  }

  agregarMarcador(lngLatLike: LngLatLike){
    console.log(lngLatLike)
    const markerSeleccionado = new Marker()
        .setLngLat(lngLatLike)
        .addTo(this.map);
        this.flyTo(markerSeleccionado)
      }
  flyTo( marker: Marker ) {
        this.map?.flyTo({
            zoom:15,
            center:marker.getLngLat()
        })
    }
    // Método para agregar el archivo KML al mapa
    private agregarKmlGeojsonMapa(kmlContent: string): void {
      const kmlDoc = new DOMParser().parseFromString(kmlContent, 'text/xml');
      const geoJson = kml(kmlDoc);
          console.log('geoJson: ', geoJson);
          this.map.addSource('poligonos', {
              type: 'geojson',
              data: geoJson
          });
  
          this.map.addLayer({
              id: 'poligonos-layer',
              type: 'fill',
              source: 'poligonos',
              layout: {},
              paint: {
                  'fill-color': '#fefec0',
                  'fill-opacity': 0.6
              }
          });

          // Cambiar el cursor al pasar sobre un polígono
          this.map.on('mousemove', 'poligonos-layer', (e:any) => {
            const features = this.map.queryRenderedFeatures(e.point, {
              layers: ['poligonos-layer']
            });
          
            // Si hay características en el punto, cambia el cursor a pointer
            if (features.length > 0) {
              this.map.getCanvas().style.cursor = 'pointer';
            } else {
              this.map.getCanvas().style.cursor = '';
            }
          });
          // Restaurar el cursor cuando no esté sobre la capa
          this.map.on('mouseleave', 'poligonos-layer', () => {
            this.map.getCanvas().style.cursor = '';
          });

          const geojsonData = this.map.getSource('poligonos')._data;
          console.log('geojsonData', geojsonData);
          (geojsonData as any).features.forEach((feature: Feature<Geometry>) => {
            const centroide = turf.centroid(feature);
            const coordinates = centroide.geometry.coordinates;
        
            this.lngLatLike = { lng: coordinates[0], lat: coordinates[1] };
            
          });

  }
  

  async descomprimirKmzFile(file: File) {
    const zip = new JSZip();
    const content = await zip.loadAsync(file);
    const kmlFile = Object.keys(content.files).find(fileName => fileName.endsWith('.kml'));
    if (kmlFile) {
      const kmlContent = await content.files[kmlFile].async('string');
      this.agregarKmlGeojsonMapa(kmlContent);
    } else {
      alert('No se encontró un archivo KML dentro del KMZ.');
    }
  }

  private cargarCapaKmz() {
    const ruta = 'assets/archivos_kmz/huellas temporales.kmz';
    this.http.get(ruta, { responseType: 'blob' }).subscribe({
        next: (blob) => {
            const nombreArchivo = 'Corte Colorado - Zona C.kmz';
            const tipoArchivo = 'application/vnd.google-earth.kmz'; // Tipo MIME para archivos KMZ
            this.archivoCapaCorteColorado = new File([blob], nombreArchivo, { type: tipoArchivo });
            this.descomprimirKmzFile(this.archivoCapaCorteColorado);
        },
        error: (error) => {
            console.error('Error al cargar el archivo', error);
        }
    });
  }
}
