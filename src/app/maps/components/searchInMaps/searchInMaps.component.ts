import { CdkDrag } from '@angular/cdk/drag-drop';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { TableComponent } from '../table/table.component';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CdkDrag,TableComponent],
  templateUrl:'./searchInMaps.component.html',
  styleUrl: './searchInMaps.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchInMapsComponent {

  @ Input() hiddenBoxSearch!:boolean;
  @ Output() clickButtonX:EventEmitter <boolean> = new EventEmitter();

  showSearch:boolean=false;
  showTable:boolean=false;

  fnClose(){
    this.clickButtonX.emit(this.showSearch);
    console.log('cerrrado desde hijo');
  }

  fnInputsClean(){
    let input = document.querySelector('code') as HTMLInputElement;
    console.log('ev = ',input);
  }

  fnOpenTableComponent(){
    this.showTable=true;
    console.log('tabla component abierta');
  }
  fnCloseTableComponent(){
    this.showTable=false;
  }
}
