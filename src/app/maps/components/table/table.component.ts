import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output,  } from '@angular/core';
import { CdkDrag } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CdkDrag],
  templateUrl:'./table.component.html',
  styleUrl: './table.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent {
  @ Input() showBoxTable!:boolean;
  @ Output() clickButtonX:EventEmitter <boolean> = new EventEmitter();

  closeTable(){
    this.clickButtonX.emit(this.showBoxTable);
    console.log('click en boton x desde tabla');

  }
}

