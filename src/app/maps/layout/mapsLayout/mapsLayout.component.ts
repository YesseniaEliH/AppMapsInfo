import { Component, OnInit } from '@angular/core';
import { MapService } from '../../services/map.service';

@Component({
    templateUrl: './mapsLayout.component.html',
    styleUrl: './mapsLayout.component.css',
})
export class MapsLayoutComponent implements OnInit {
  constructor(private readonly mapService:MapService){}
  ngOnInit(): void {
    this.mapService.toLoadMap();
  }
}
